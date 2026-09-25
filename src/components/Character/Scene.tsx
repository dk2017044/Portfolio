import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Mesh | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let isFinished = false;
      const finishLoading = () => {
        if (isFinished) return;
        isFinished = true;
        progress.loaded().then(() => {
          setTimeout(() => {
            light.turnOnLights();
          }, 2500);
        });
      };

      // Fallback: never let loader remain stuck if network/model loading stalls
      const safetyTimeout = setTimeout(() => {
        finishLoading();
      }, 5000);

      let resizeHandler: (() => void) | null = null;

      loadCharacter()
        .then((gltf) => {
          if (gltf) {
            clearTimeout(safetyTimeout);
            const animations = setAnimations(gltf);
            if (hoverDivRef.current) {
              animations.hover(gltf, hoverDivRef.current);
            }
            mixer = animations.mixer;
            const character = gltf.scene;
            scene.add(character);
            headBone = character.getObjectByName("spine006") || character;
            screenLight = (character.getObjectByName("screenlight") as THREE.Mesh) || null;
            if (!isFinished) {
              isFinished = true;
              progress.loaded().then(() => {
                setTimeout(() => {
                  light.turnOnLights();
                  animations.startIntro();
                }, 2500);
              });
            }
            resizeHandler = () =>
              handleResize(renderer, camera, canvasDiv, character);
            window.addEventListener("resize", resizeHandler);
          } else {
            finishLoading();
          }
        })
        .catch(() => {
          finishLoading();
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: ReturnType<typeof setTimeout> | undefined;
      let touchMoveElement: HTMLElement | null = null;
      const touchMoveHandler = (e: TouchEvent) =>
        handleTouchMove(e, (x, y) => (mouse = { x, y }));

      const onTouchStart = (event: TouchEvent) => {
        touchMoveElement = event.target as HTMLElement;
        debounce = setTimeout(() => {
          touchMoveElement?.addEventListener("touchmove", touchMoveHandler);
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let animFrameId: number;
      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animFrameId);
        clearTimeout(safetyTimeout);
        if (debounce) clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        if (resizeHandler) {
          window.removeEventListener("resize", resizeHandler);
        }
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (touchMoveElement) {
          touchMoveElement.removeEventListener("touchmove", touchMoveHandler);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
