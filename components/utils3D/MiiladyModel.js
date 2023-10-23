import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoadingQueue } from '../LoadingQueueContext';


const MiiladyModel = ({ url, position, rotation }) => {
  const { queue, addToQueue, isLoading, setIsLoading } = useLoadingQueue();
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    if (!isLoading && queue.includes(url)) {
      setIsLoading(true);
      const loader = new GLTFLoader();
      loader.load(
        url,
        (loadedGltf) => {
          console.log(`Model loaded successfully from URL: ${url}`);
          setGltf(loadedGltf);
          setIsLoading(false);
        },
        undefined,
        (error) => {
          console.error('An error occurred while loading the model:', error);
          setIsLoading(false);
        }
      );
    }
  }, [url, isLoading, queue]);

  useEffect(() => {
    addToQueue(url);
  }, [url]);

  useEffect(() => {
    return () => {
        if (gltf) {
            gltf.scene.traverse((object) => {
                if (object.isMesh) {
                    object.geometry.dispose();
                    console.log(`Disposed geometry of model from URL: ${url}`);

                    object.material.dispose();
                    console.log(`Disposed material of model from URL: ${url}`);

                    // If the material is a texture, dispose of the texture as well.
                    if (object.material.map) {
                        object.material.map.dispose();
                        console.log(`Disposed texture map of model from URL: ${url}`);
                    }
                }
            });
            console.log(`Model from URL ${url} is being removed/unloaded`);
        }
    };
  }, [url, gltf]);

  return gltf ? <primitive object={gltf.scene} position={position} rotation={rotation} /> : null;
};

export default MiiladyModel;
