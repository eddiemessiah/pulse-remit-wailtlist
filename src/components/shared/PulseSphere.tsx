'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        meshRef.current.rotation.x = time * 0.2
        meshRef.current.rotation.y = time * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
                <MeshDistortMaterial
                    color="#00FF88"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    emissive="#0061FF"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    )
}

const ParticleField = () => {
    const count = 1000
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15
        }
        return pos
    }, [])

    const pointsRef = useRef<THREE.Points>(null!)
    useFrame((state) => {
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#ffffff"
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    )
}

export const PulseSphere = () => {
    return (
        <div className="w-full h-full min-h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00FF88" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#0061FF" />
                <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={2} />

                <AnimatedSphere />
                <ParticleField />

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    )
}
