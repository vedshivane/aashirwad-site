"use client";

/**
 * MarbleBackground
 *
 * A GPU-accelerated, interactive marble texture rendered as a full-viewport
 * WebGL canvas that sits behind all page content.
 *
 * Features:
 * - Organic veins via Fractional Brownian Motion (FBM) noise in GLSL
 * - Warm marble colour palette matching the site design tokens
 * - Infinite, looping time-based animation (slow drift)
 * - Subtle mouse/touch parallax warp on desktop
 * - pointer-events: none so it never interferes with UI interactions
 * - Mounted once in app/layout.tsx to avoid flicker on route changes
 */

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// GLSL Shaders
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Marble fragment shader.
 *
 * Technique:
 *  1. Build a multi-octave value-noise FBM field (warp-on-warp gives
 *     organic swirling veins).
 *  2. Feed the warped UV into a turbulence function to produce vein edges.
 *  3. Combine with a secondary low-frequency warp driven by mouse position
 *     for the interactive parallax feel.
 *  4. Mix warm marble colours (cream, warm white, veined stone).
 *  5. Add specular highlight bands for a polished 3-D look.
 */
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;       // normalised screen coords [-0.5, 0.5]
  uniform vec2  uResolution;  // viewport size in px (for aspect ratio)

  varying vec2 vUv;

  // ---- Noise primitives -----------------------------------------------
  // Smooth value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = fract(sin(dot(i + vec2(0.0,0.0), vec2(127.1,311.7))) * 43758.5453);
    float b = fract(sin(dot(i + vec2(1.0,0.0), vec2(127.1,311.7))) * 43758.5453);
    float c = fract(sin(dot(i + vec2(0.0,1.0), vec2(127.1,311.7))) * 43758.5453);
    float d = fract(sin(dot(i + vec2(1.0,1.0), vec2(127.1,311.7))) * 43758.5453);

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Fractional Brownian Motion - layered noise octaves
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 6; i++) {
      v   += amp * noise(p);
      p    = rot * p * 2.0 + shift;
      amp *= 0.5;
    }
    return v;
  }

  // ---- Marble colours (warm cream / stone palette) ----------------------
  // These values echo the site design tokens converted to linear RGB.
  vec3 marbleColor(float t) {
    vec3 col0 = vec3(0.982, 0.963, 0.942);   // warm white cream
    vec3 col1 = vec3(0.916, 0.882, 0.845);   // warm stone / sandal
    vec3 col2 = vec3(0.780, 0.720, 0.645);   // soft warm taupe / umber
    vec3 col3 = vec3(0.830, 0.730, 0.650);   // subtle russet clay accent

    float s  = smoothstep(0.0,  0.45, t);
    float s2 = smoothstep(0.45, 0.80, t);
    float s3 = smoothstep(0.80, 1.0,  t);

    vec3 c = mix(col0, col1, s);
    c = mix(c, col2, s2 * 0.7);
    c = mix(c, col3, s3 * 0.35);
    return c;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float t = uTime * 0.042;

    vec2 uv = vUv * aspect;

    // Domain warp pass 1 (large-scale swirl)
    vec2 q;
    q.x = fbm(uv + t);
    q.y = fbm(uv + vec2(1.0) + t * 0.9);

    // Domain warp pass 2 (medium vein structure)
    vec2 r;
    r.x = fbm(uv + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t);
    r.y = fbm(uv + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t);

    // Mouse interactive warp (subtle, desktop only)
    r += uMouse * 0.18;

    // Turbulence / vein function
    float f = fbm(uv + 3.6 * r);

    float marble = sin(uv.x * 3.8 + 6.0 * f) * 0.5 + 0.5;
    marble = mix(marble, sin(uv.x * 2.2 + 5.0 * f + t * 0.3) * 0.5 + 0.5, 0.38);
    marble = pow(marble, 1.4);

    vec3 col = marbleColor(marble);

    // Specular highlight bands (polished surface)
    float spec = smoothstep(0.60, 0.66, marble) * 0.22
               + smoothstep(0.35, 0.38, marble) * 0.10;
    col += spec * vec3(1.0, 0.99, 0.97);

    // Subtle vignette
    vec2 vig = vUv - 0.5;
    col *= 1.0 - dot(vig, vig) * 0.38;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ---------------------------------------------------------------------------
// Shader plane – uses declarative <shaderMaterial> with imperative ref updates
// ---------------------------------------------------------------------------

function MarblePlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  // Sync viewport size into the shader uniform (runs after render)
  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.uniforms["uResolution"].value.set(size.width, size.height);
  }, [size]);

  // Advance time uniform each frame (runs outside render)
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms["uTime"].value = clock.elapsedTime;
  });

  // Mouse/touch tracking for interactive parallax warp (runs after render)
  useEffect(() => {
    let isTouch = false;
    const onTouchStart = () => { isTouch = true; };
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch || !matRef.current) return;
      matRef.current.uniforms["uMouse"].value.set(
        e.clientX / window.innerWidth - 0.5,
        -(e.clientY / window.innerHeight - 0.5),
      );
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <mesh>
      {/* Plane that exactly covers the viewport */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:       { value: 0 },
          uMouse:      { value: new THREE.Vector2(0, 0) },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
        }}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

/**
 * MarbleBackground
 *
 * Drop this once in app/layout.tsx (inside <body>, before other children).
 * It renders a fixed, full-viewport WebGL canvas that simulates polished
 * marble with animated veins and mouse-driven parallax.
 */
export function MarbleBackground() {
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: -10,
    pointerEvents: "none",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle} aria-hidden="true">
      <Canvas
        gl={{
          antialias: false,          // saves GPU; marble is smooth by nature
          alpha: false,
          powerPreference: "default",
        }}
        orthographic
        camera={{ zoom: 1, near: 0.1, far: 10, position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      >
        <MarblePlane />
      </Canvas>
    </div>
  );
}
