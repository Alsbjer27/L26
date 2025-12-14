"use client";

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeEvent} from '@react-three/fiber'
import { Image, Environment } from '@react-three/drei'
import { easing } from "maath"
import "./utils";

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
        velocity.current = delta * 0.005;
    };

    useFrame((_, delta) => {
        if (!group.current) return;

        group.current.rotation.y += velocity.current;
        velocity.current *=0.95;

        
    })
}