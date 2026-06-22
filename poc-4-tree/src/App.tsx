import { useNavigation } from './hooks/useNavigation';
import { Breadcrumbs } from './components/Breadcrumbs';
import { AreaList } from './components/AreaList';
import { ObjectItem } from './components/ObjectItem';
import { Drawer } from './components/Drawer';

export default function App() {
  const { path, currentArea, selectedObject, enter, back, selectObject } = useNavigation();

  const hasAreas = (currentArea.children?.length ?? 0) > 0;
  const hasObjects = (currentArea.objects?.length ?? 0) > 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">World Explorer</h1>
        <p className="app-subtitle">Non-visual baseline for comparison</p>
      </header>

      <main className="app-main">
        <Breadcrumbs path={path} onBack={back} />

        <div className="content">
          {hasAreas && (
            <AreaList areas={currentArea.children!} onEnter={enter} />
          )}

          {hasObjects && (
            <section className="object-list-section">
              <h2 className="section-title">Objects</h2>
              <ul className="object-list">
                {currentArea.objects!.map((obj) => (
                  <ObjectItem key={obj.id} object={obj} onSelect={selectObject} />
                ))}
              </ul>
            </section>
          )}

          {!hasAreas && !hasObjects && (
            <p className="empty-message">This area is empty.</p>
          )}
        </div>
      </main>

      <Drawer object={selectedObject} onClose={() => selectObject(null)} />
    </div>
  );
}
