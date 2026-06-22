import { useState } from 'react';
import { useNavigation } from './hooks/useNavigation';
import type { ObjectInfo } from './data/world';
import { Scene } from './components/Scene';
import { BackButton } from './components/BackButton';
import { Drawer } from './components/Drawer';

function App() {
  const { currentArea, enter, back, canGoBack } = useNavigation();
  const [selectedObject, setSelectedObject] = useState<ObjectInfo | null>(null);

  const handleEnterHouse = () => {
    enter('house');
  };

  const handleEnterKitchen = () => {
    enter('kitchen');
  };

  const handleRefrigeratorClick = () => {
    const refrigerator = currentArea.objects?.find(obj => obj.id === 'refrigerator');
    if (refrigerator) {
      setSelectedObject(refrigerator);
    }
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
        currentArea={currentArea.id}
        onEnterHouse={handleEnterHouse}
        onEnterKitchen={handleEnterKitchen}
        onRefrigeratorClick={handleRefrigeratorClick}
      />

      <Drawer object={selectedObject} onClose={handleDrawerClose} />
    </div>
  );
}

export default App;
