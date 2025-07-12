import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { RotateCcw, Maximize2, Settings } from 'lucide-react';

// Mock 3D Model Component
const ClothingModel = ({ item, ...props }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <group {...props}>
      {/* Main clothing mesh - simplified representation */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Different geometries based on item category */}
        {item.category === 'Outerwear' && (
          <boxGeometry args={[2, 3, 0.3]} />
        )}
        {item.category === 'Tops' && (
          <boxGeometry args={[1.8, 2, 0.2]} />
        )}
        {item.category === 'Bottoms' && (
          <boxGeometry args={[1.5, 2.5, 0.3]} />
        )}
        {item.category === 'Dresses' && (
          <coneGeometry args={[1.2, 3, 8]} />
        )}
        {item.category === 'Shoes' && (
          <boxGeometry args={[1, 0.5, 2]} />
        )}
        {!['Outerwear', 'Tops', 'Bottoms', 'Dresses', 'Shoes'].includes(item.category) && (
          <boxGeometry args={[1.5, 2, 0.2]} />
        )}
        
        {/* Material based on condition */}
        <meshStandardMaterial
          color={
            item.condition === 'Like New' ? '#10B981' :
            item.condition === 'Excellent' ? '#3B82F6' :
            item.condition === 'Good' ? '#F59E0B' : '#EF4444'
          }
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Size indicators */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        Size: {item.size}
      </Text>

      {/* Condition indicator */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.2}
        color="#6B7280"
        anchorX="center"
        anchorY="middle"
      >
        Condition: {item.condition}
      </Text>
    </group>
  );
};

// 3D Environment Component
const Scene = ({ item }) => {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <ClothingModel item={item} />
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </>
  );
};

// Main 3D Product Viewer Component
const ProductViewer = ({ item, className = "" }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetView = () => {
    // Reset camera position - would need ref to controls
    setAutoRotate(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden ${className}`}
      style={{ height: isFullscreen ? '100vh' : '400px' }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene item={item} />
        </Suspense>
      </Canvas>

      {/* Overlay Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          onClick={toggleFullscreen}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-lg"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={resetView}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setAutoRotate(!autoRotate)}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-lg"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-600">3D Preview</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading 3D model...</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 text-right">
        <p className="text-xs text-gray-500 bg-white/80 rounded px-2 py-1">
          Drag to rotate • Scroll to zoom
        </p>
      </div>
    </motion.div>
  );
};

export default ProductViewer;