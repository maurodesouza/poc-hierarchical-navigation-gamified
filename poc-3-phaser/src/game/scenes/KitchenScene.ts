import Phaser from 'phaser';
import { eventBus } from '../eventBus';
import { world } from '../../data/world';

export class KitchenScene extends Phaser.Scene {
  private refrigeratorSprite!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'KitchenScene' });
  }

  preload() {
    this.load.svg('kitchen-bg', 'src/assets/scenes/kitchen.svg');
    this.load.svg('refrigerator', 'src/assets/objects/refrigerator.svg');
  }

  create() {
    // Add background
    const bg = this.add.image(400, 300, 'kitchen-bg');
    bg.setInteractive();

    // Add refrigerator as interactive object
    this.refrigeratorSprite = this.add.image(560, 440, 'refrigerator');
    this.refrigeratorSprite.setInteractive({ useHandCursor: true });
    
    // Add hover effect for refrigerator
    this.refrigeratorSprite.on('pointerover', () => {
      this.refrigeratorSprite.setTint(0xcccccc);
    });
    this.refrigeratorSprite.on('pointerout', () => {
      this.refrigeratorSprite.clearTint();
    });
    
    // Add click handler for refrigerator
    this.refrigeratorSprite.on('pointerdown', () => {
      this.selectRefrigerator();
    });

    // Add title
    const title = this.add.text(400, 50, 'Kitchen', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    title.setOrigin(0.5);

    // Add back button
    const backButton = this.add.rectangle(100, 550, 120, 40, 0xe74c3c);
    backButton.setInteractive({ useHandCursor: true });
    
    const backText = this.add.text(100, 550, 'Back', {
      fontSize: '16px',
      color: '#ffffff'
    });
    backText.setOrigin(0.5);

    backButton.on('pointerdown', () => {
      this.goBack();
    });

    // Camera fade in
    this.cameras.main.fadeIn(300, 0, 0, 0);
  }

  private selectRefrigerator() {
    const kitchen = world.children![0].children![0];
    const refrigerator = kitchen.objects![0];
    eventBus.emit('select-object', refrigerator);
  }

  private goBack() {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('HouseScene');
    });
  }
}