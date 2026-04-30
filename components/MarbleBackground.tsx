"use client";

/**
 * MarbleBackground
 *
 * A GPU-accelerated, subtle marble-finish background rendered as a full-viewport
 * WebGL canvas that sits behind all page content.
 *
 * Features:
 * - Smooth, grain-free surface — no veins, no hard lines
 * - Only the faintest tonal variation (polished Calacatta look)
 * - Warm cream palette matching the site design tokens
 * - Infinite, looping time-based animation (very slow drift)
 * - Gentle mouse/touch parallax shift on desktop
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
 * Marble fragment shader — smooth, line-free polished-stone finish.
 *
 * Technique:
 *  1. Low-scale, low-octave FBM produces gentle cloud-like tonal blobs
 *     (no sin() folds so there are zero stripe / arc artefacts).
 *  2. Two FBM fields are smoothly blended for natural variation.
 *  3. Colours are kept extremely close together (< 4 % difference) so the
 *     effect reads as a barely-perceptible tonal shift, not a pattern.
 *  4. A single broad gloss highlight is added (not a sharp band).
 *  5. Mouse position shifts the field very slightly for subtle life.
 */
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;       // normalised screen coords [-0.5, 0.5]
  uniform vec2  uResolution;  // viewport size in px (for aspect ratio)

  varying vec2 vUv;

  // ---- Smooth value noise (quintic falloff) ----------------------------
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    // Quintic interpolation for extra smoothness
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    float a = fract(sin(dot(i + vec2(0.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
    float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
    float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Low-frequency smooth cloud — 4 octaves, gentle rotation, no hard folds
  float softCloud(vec2 p) {
    float v   = 0.0;
    float amp = 0.5;
    mat2  rot = mat2(0.8660, 0.5, -0.5, 0.8660); // 30-degree rotation
    for (int i = 0; i < 4; i++) {
      v   += amp * noise(p);
      p    = rot * p * 1.82;
      amp *= 0.54;
    }
    return v;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    // Very slow drift — imperceptible in a single glance, visible over time
    float t = uTime * 0.016;

    // Scale UV down significantly — creates large, soft blobs, never tight
    // stripe-like patterns
    vec2 uv = vUv * aspect * 0.46;

    // Gentle mouse shift (desktop only; stays near 0 on touch)
    vec2 shift = uMouse * 0.055;

    // Two independent cloud fields blended together
    float n1 = softCloud(uv + shift + t);
    float n2 = softCloud(uv * 1.28 + shift * 0.6 + vec2(4.31, 2.17) + t * 0.74);

    // Smooth blend of the two fields
    float f = mix(n1, n2, 0.44);

    // Soft S-curve compression → removes any remaining sharp edges
    f = smoothstep(0.28, 0.72, f);

    // Tight colour range: near-white cream to soft warm blush (~3% contrast)
    vec3 base = vec3(0.991, 0.982, 0.974); // near-white
    vec3 warm = vec3(0.964, 0.948, 0.932); // warm cream blush

    vec3 col = mix(base, warm, f * 0.72);

    // Single broad soft gloss highlight (no banding)
    float gloss = smoothstep(0.52, 0.78, f);
    col = mix(col, vec3(1.0, 0.999, 0.997), gloss * 0.06);

    // Very gentle vignette to anchor the centre
    vec2 vig = vUv - 0.5;
    col *= 1.0 - dot(vig, vig) * 0.22;

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

  // Mouse/touch tracking for gentle parallax shift (runs after render)
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
 * It renders a fixed, full-viewport WebGL canvas that gives a smooth,
 * line-free polished-marble finish with extremely subtle tonal variation.
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
          antialias: false,
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
