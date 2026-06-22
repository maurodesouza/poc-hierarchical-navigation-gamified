import { useState, useEffect } from 'react';
import { PhaserGame } from './game/PhaserGame';
import { Drawer } from './components/Drawer';
import { eventBus } from './game/eventBus';
import type { ObjectInfo } from './data/world';
import './App.css';

function App() {
  const [selectedObject, setSelectedObject] = useState<ObjectInfo | null>(null);

  useEffect(() => {
    const handleObjectSelected = (object: ObjectInfo) => {
      setSelectedObject(object);
    };

    eventBus.on('select-object', handleObjectSelected);

    return () => {
      eventBus.off('select-object', handleObjectSelected);
    };
  }, []);

  const handleCloseDrawer = () => {
    setSelectedObject(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>POC 3 — Visual Navigation with Phaser</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <PhaserGame />
        <Drawer object={selectedObject} onClose={handleCloseDrawer} />
      </div>
    </div>
  );
}

export default App;
