'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import { ShaderMaterial, Vector2 } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 vUv;
  
  vec2 random2(vec2 st) {
    st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  
  float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 6; ++i) {
      v += a * noise(st);
      st = st * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }
  
  void main() {
    vec2 uv = vUv; // Use full UV range
    vec2 mouse = u_mouse / u_resolution; // Normalized mouse position
    vec2 scaleFactor = u_resolution / min(u_resolution.x, u_resolution.y);
    vec2 scaledUv = uv * scaleFactor;
    vec2 scaledMouse = mouse * scaleFactor;
    
    // Layered noise for depth across full screen
    float n1 = fbm(scaledUv * 2.0 + u_time * 0.1);
    float n2 = fbm(scaledUv * 1.5 - u_time * 0.05);
    float n3 = fbm(scaledUv * 3.0 + u_time * 0.03);
    
    // Color palette
    vec3 color1 = vec3(0.01, 0.02, 0.03);
    vec3 color2 = vec3(0.05, 0.01, 0.1);
    vec3 accent = vec3(0.0, 0.8, 0.7);
    
    // Mix colors with noise
    vec3 color = mix(color1, color2, n1);
    color += n2 * 0.2;
    
    // Precise cursor tracking blue effect
    vec2 mouseOffset = scaledUv - scaledMouse; // Offset from mouse position in scaled space
    float dist = length(mouseOffset); // Distance from cursor
    float mouseInfluence = smoothstep(0.3, 0.0, dist * 1.5); // Smaller, precise radius
    color += accent * mouseInfluence * 0.15; // Reduced intensity for subtlety
    
    // Full-screen glowing spots
    float spots = smoothstep(0.2, 0.7, n3);
    color += accent * spots * 0.15;
    
    // Full-screen vignette
    float vignette = smoothstep(1.0, 0.3, length(uv - 0.5));
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Scene() {
  const materialRef = useRef<ShaderMaterial>(null!);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [resolution, setResolution] = useState({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_mouse: { value: new Vector2(0, 0) },
      u_resolution: { value: new Vector2(0, 0) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: window.innerHeight - event.clientY, // Flip Y for WebGL
      });
    };

    const handleResize = () => {
      setResolution({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.u_mouse.value.set(mouse.x, mouse.y);
      materialRef.current.uniforms.u_resolution.value.set(resolution.x, resolution.y);
    }
  });

  if (resolution.x === 0 || resolution.y === 0) {
    return null; // Prevent rendering until resolution is set
  }

  // Extend plane width slightly to cover right side
  const aspect = resolution.x / resolution.y;
  const planeWidth = 2.2 * aspect; // Increased for right coverage
  const planeHeight = 2.0;

  return (
    <mesh>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // Initial fallback values

  useEffect(() => {
    // Set initial dimensions on mount
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null; // Prevent rendering until dimensions are set
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        camera={{ position: [0, 0, 1], fov: 45, aspect: dimensions.width / dimensions.height }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}