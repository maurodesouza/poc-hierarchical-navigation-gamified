import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigation } from './hooks/useNavigation';
import type { ObjectInfo } from './data/world';
import { PixiStage } from './pixi/PixiStage';
import { renderScene, animateSceneExit } from './pixi/sceneRenderer';
import { BackButton } from './components/BackButton';
import { Drawer } from './components/Drawer';
import { Application, Container } from 'pixi.js';

function App() {
  const { currentArea, enter, back, canGoBack } = useNavigation();
  const [selectedObject, setSelectedObject] = useState<ObjectInfo | null>(null);
  const appRef = useRef<Application | null>(null);
  const currentContainerRef = useRef<Container | null>(null);

  const handleAreaClick = useCallback((areaId: string) => {
    enter(areaId);
  }, [enter]);

  const handleObjectSelect = useCallback((object: ObjectInfo) => {
    setSelectedObject(object);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setSelectedObject(null);
  }, []);

  const handleBack = useCallback(() => {
    if (currentContainerRef.current && appRef.current) {
      // Animate exit before navigating back
      animateSceneExit(currentContainerRef.current, () => {
        back();
      });
    } else {
      back();
    }
  }, [back]);

  // Re-render scene when currentArea changes
  useEffect(() => {
    if (appRef.current) {
      const container = renderScene(appRef.current, currentArea, {
        onAreaClick: handleAreaClick,
        onObjectSelect: handleObjectSelect,
      });
      currentContainerRef.current = container;
    }
  }, [currentArea, handleAreaClick, handleObjectSelect]);

  const handlePixiInit = useCallback((app: Application) => {
    appRef.current = app;
    const container = renderScene(app, currentArea, {
      onAreaClick: handleAreaClick,
      onObjectSelect: handleObjectSelect,
    });
    currentContainerRef.current = container;
  }, [currentArea, handleAreaClick, handleObjectSelect]);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 100
        }}
      >
        <BackButton onClick={handleBack} disabled={!canGoBack} />
      </div>

      <PixiStage>
        {handlePixiInit}
      </PixiStage>

      <Drawer object={selectedObject} onClose={handleDrawerClose} />
    </div>
  );
}

export default App;
