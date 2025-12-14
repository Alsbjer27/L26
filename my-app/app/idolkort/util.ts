import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const BentPlaneMaterial = shaderMaterial(
  {
    time: 0,
    zoom: 1,
    map: null,
  },
  /* vertex shader */
  `
    varying vec2 vUv;
    uniform float zoom;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(uv.x * 3.1415) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* fragment shader */
  `
    varying vec2 vUv;
    uniform sampler2D map;

    void main() {
      gl_FragColor = texture2D(map, vUv);
    }
  `
);

extend({ BentPlaneMaterial });
