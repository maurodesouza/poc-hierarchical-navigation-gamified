import { useState, useEffect, useRef } from 'react';
import { useNavigation } from './hooks/useNavigation';
import type { ObjectInfo } from './data/world';
import { PixiStage } from './pixi/PixiStage';
import { renderScene } from './pixi/sceneRenderer';
import { BackButton } from './components/BackButton';
import { Drawer } from './components/Drawer';
import { Application } from 'pixi.js';

function App() {
  const { currentArea, enter, back, canGoBack } = useNavigation();
  const [selectedObject, setSelectedObject] = useState<ObjectInfo | null>(null);
  const appRef = useRef<Application | null>(null);

  const handleAreaClick = (areaId: string) => {
    enter(areaId);
  };

  const handleObjectSelect = (object: ObjectInfo) => {
    setSelectedObject(object);
  };

  const handleDrawerClose = () => {
    setSelectedObject(null);
  };

  // Re-render scene when currentArea changes
  useEffect(() => {
    if (appRef.current) {
      renderScene(appRef.current, currentArea, {
        onAreaClick: handleAreaClick,
        onObjectSelect: handleObjectSelect,
      });
    }
  }, [currentArea]);

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
        <BackButton onClick={back} disabled={!canGoBack} />
      </div>

      <PixiStage>
        {(app) => {
          appRef.current = app;
          renderScene(app, currentArea, {
            onAreaClick: handleAreaClick,
            onObjectSelect: handleObjectSelect,
          });
        }}
      </PixiStage>

      <Drawer object={selectedObject} onClose={handleDrawerClose} />
    </div>
  );
}

export default App;
