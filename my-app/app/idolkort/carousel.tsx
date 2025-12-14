"use client";

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeEvent} from '@react-three/fiber'
import { Image, Environment } from '@react-three/drei'
import { easing } from "maath"
import "./util";

export default function CarouselScene(){
    return (
        <Canvas camera ={{ position: [0, 0, 10], fov: 15}}
                gl = {{antialias: true}}
        >
            <fog attach="fog" args={["#000", 8, 14]} />
            <Rig>
                <Carousel />
            </Rig>

            <Environment preset="dawn" />
        </Canvas>
    );
}

function Rig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);
    const dragging = useRef(false);
    const lastX = useRef(0);
    const velocity = useRef(0);

    const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
        dragging.current = true;
        lastX.current = e.clientX;
    };

    const onPointerUp = () => {
        dragging.current = false;
    };

    const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!dragging.current) return;
        const delta = e.clientX - lastX.current;
        lastX.current = e.clientX;
        velocity.current = delta * 0.0005;
    };

    useFrame((_, delta) => {
        if (!group.current) return;

        group.current.rotation.y += velocity.current;
        velocity.current *=0.4;

        easing.damp(group.current.rotation, "y", group.current.rotation.y, 0.3, delta);
    });

    return (
        <group ref={group}>
            <mesh 
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerOut={onPointerUp}
                onPointerMove={onPointerMove}
                position={[0, 0, 0]}
            >
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            {children}
        </group>
    );
}

function Carousel({radius = 2, count = 3}){
    return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <Card
            key={i}
            url={`/img${(i % 10) + 1}_.png`}
            position={[
              Math.sin(angle) * radius,
              0,
              Math.cos(angle) * radius,
            ]}
            rotation={[0, Math.PI + angle, 0]}
          />
        );
      })}
    </>
  );
}

function Card({
  url,
  ...props
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;

    easing.damp3(
      ref.current.scale,
      hovered ? [1.15, 1.15, 1.15] : [1, 1, 1],
      0.2,
      delta
    );

    easing.damp(
      (ref.current.material as any),
      "zoom",
      hovered ? 1 : 1.4,
      0.2,
      delta
    );
  });

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      {...props}
    >
      <planeGeometry args={[1, 1, 20, 20]} />
    </Image>
  );
}