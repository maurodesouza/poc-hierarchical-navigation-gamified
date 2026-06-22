import { useState } from 'react';
import { useNavigation } from './hooks/useNavigation';
import { ObjectInfo } from './data/world';
import { Scene } from './components/Scene';
import { BackButton } from './components/BackButton';
import { Drawer } from './components/Drawer';

function App() {
  const { currentArea, enter, back, canGoBack } = useNavigation();
  const [selectedObject, setSelectedObject] = useState<ObjectInfo | null>(null);

  const handleAreaClick = (areaId: string) => {
    enter(areaId);
  };

  const handleObjectSelect = (object: ObjectInfo) => {
    setSelectedObject(object);
  };

  const handleDrawerClose = () => {
    setSelectedObject(null);
  };

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

      <Scene
        area={currentArea}
        onAreaClick={handleAreaClick}
        onObjectSelect={handleObjectSelect}
      />

      <Drawer object={selectedObject} onClose={handleDrawerClose} />
    </div>
  );
}

export default App;
