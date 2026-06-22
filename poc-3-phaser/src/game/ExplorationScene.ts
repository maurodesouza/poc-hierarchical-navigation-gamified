import Phaser from 'phaser';
import { eventBus } from './eventBus';
import { world } from '../data/world';
import type { AreaNode, ObjectInfo } from '../data/world';

export class ExplorationScene extends Phaser.Scene {
  private currentArea: AreaNode;
  private navigationStack: AreaNode[] = [];
  private areaObjects: Phaser.GameObjects.Rectangle[] = [];
  private objectSprites: Phaser.GameObjects.Rectangle[] = [];

  constructor() {
    super({ key: 'ExplorationScene' });
    this.currentArea = world;
  }

  create() {
    this.renderArea();
  }

  private renderArea() {
    // Clear existing objects
    this.areaObjects.forEach(obj => obj.destroy());
    this.objectSprites.forEach(obj => obj.destroy());
    this.areaObjects = [];
    this.objectSprites = [];

    // Render title
    const title = this.add.text(
      this.cameras.main.width / 2,
      50,
      this.currentArea.name,
      {
        fontSize: '32px',
        color: '#ffffff',
        fontStyle: 'bold'
      }
    );
    title.setOrigin(0.5);

    // Render child areas
    if (this.currentArea.children) {
      this.currentArea.children.forEach((child, index) => {
        const y = 150 + index * 80;
        const rect = this.add.rectangle(
          this.cameras.main.width / 2,
          y,
          400,
          60,
          0x4a90e2
        );
        rect.setInteractive({ useHandCursor: true });
        
        const text = this.add.text(
          this.cameras.main.width / 2,
          y,
          child.name,
          {
            fontSize: '20px',
            color: '#ffffff'
          }
        );
        text.setOrigin(0.5);

        rect.on('pointerdown', () => {
          this.navigateTo(child);
        });

        this.areaObjects.push(rect);
      });
    }

    // Render objects
    if (this.currentArea.objects) {
      this.currentArea.objects.forEach((obj, index) => {
        const y = 150 + (this.currentArea.children?.length || 0) * 80 + index * 80;
        const rect = this.add.rectangle(
          this.cameras.main.width / 2,
          y,
          400,
          60,
          0x50c878
        );
        rect.setInteractive({ useHandCursor: true });
        
        const text = this.add.text(
          this.cameras.main.width / 2,
          y,
          obj.name,
          {
            fontSize: '20px',
            color: '#ffffff'
          }
        );
        text.setOrigin(0.5);

        rect.on('pointerdown', () => {
          this.selectObject(obj);
        });

        this.objectSprites.push(rect);
      });
    }

    // Add back button if not at root
    if (this.navigationStack.length > 0) {
      const backButton = this.add.rectangle(
        100,
        this.cameras.main.height - 50,
        120,
        40,
        0xe74c3c
      );
      backButton.setInteractive({ useHandCursor: true });
      
      const backText = this.add.text(
        100,
        this.cameras.main.height - 50,
        'Back',
        {
          fontSize: '16px',
          color: '#ffffff'
        }
      );
      backText.setOrigin(0.5);

      backButton.on('pointerdown', () => {
        this.goBack();
      });

      this.areaObjects.push(backButton);
    }
  }

  private navigateTo(area: AreaNode) {
    this.navigationStack.push(this.currentArea);
    this.currentArea = area;
    this.renderArea();
  }

  private goBack() {
    if (this.navigationStack.length > 0) {
      this.currentArea = this.navigationStack.pop()!;
      this.renderArea();
    }
  }

  private selectObject(obj: ObjectInfo) {
    eventBus.emit('select-object', obj);
  }
}
