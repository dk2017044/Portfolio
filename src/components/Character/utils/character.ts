import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve) => {
      loader.load(
        "/models/white_mesh.glb",
        async (gltf) => {
          const character = gltf.scene;

          // Compute bounds and auto-scale model to fit camera viewport
          const box = new THREE.Box3().setFromObject(character);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          // Target height of ~5.2 units fits nicely in the camera's ~5.7 vertical view
          const targetHeight = 5.2;
          const scale = targetHeight / (size.y || 1);
          character.scale.set(scale, scale, scale);

          // Center the model in X & Z and position at Y = 13.0 (camera is at Y=13.1, Z=24.7)
          character.position.x = -center.x * scale;
          character.position.y = 13.0 - center.y * scale;
          character.position.z = -center.z * scale;

          // Apply clean premium materials and compute normals for lighting
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = false;

              if (mesh.geometry) {
                mesh.geometry.computeVertexNormals();
              }

              mesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color("#dbe4f0"),
                roughness: 0.35,
                metalness: 0.2,
                side: THREE.DoubleSide,
              });
            }
          });

          await renderer.compileAsync(character, camera, scene);
          resolve(gltf);

          setCharTimeline(character, camera);
          setAllTimeline();

          const footR = character.getObjectByName("footR");
          if (footR) footR.position.y = 3.36;
          const footL = character.getObjectByName("footL");
          if (footL) footL.position.y = 3.36;

          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.warn("Could not load GLTF model:", error);
          resolve(null);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
