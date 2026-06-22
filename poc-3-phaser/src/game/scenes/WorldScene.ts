import Phaser from 'phaser';

export class WorldScene extends Phaser.Scene {
  private hoverIndicator!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'WorldScene' });
  }

  preload() {
    this.load.svg('world-bg', 'src/assets/scenes/world.svg');
  }

  create() {
    // Add background
    const bg = this.add.image(400, 300, 'world-bg');
    bg.setInteractive();

    // Add clickable house area
    const houseArea = this.add.zone(400, 275, 200, 150);
    houseArea.setInteractive({ useHandCursor: true });
    houseArea.on('pointerdown', () => {
      this.navigateToHouse();
    });

    // Add hover indicator
    this.hoverIndicator = this.add.rectangle(400, 275, 200, 150, 0x4a90e2, 0.3);
    this.hoverIndicator.setVisible(false);

    // Add hover effect
    houseArea.on('pointerover', () => {
      this.hoverIndicator.setVisible(true);
    });
    houseArea.on('pointerout', () => {
      this.hoverIndicator.setVisible(false);
    });

    // Add title
    const title = this.add.text(400, 50, 'World', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    title.setOrigin(0.5);
  }

  private navigateToHouse() {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('HouseScene');
    });
  }
}