import Phaser from 'phaser';

export class HouseScene extends Phaser.Scene {
  private hoverIndicator!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'HouseScene' });
  }

  preload() {
    this.load.svg('house-bg', 'src/assets/scenes/house.svg');
  }

  create() {
    // Add background
    const bg = this.add.image(400, 300, 'house-bg');
    bg.setInteractive();

    // Add clickable kitchen area
    const kitchenArea = this.add.zone(400, 275, 300, 250);
    kitchenArea.setInteractive({ useHandCursor: true });
    kitchenArea.on('pointerdown', () => {
      this.navigateToKitchen();
    });

    // Add hover indicator
    this.hoverIndicator = this.add.rectangle(400, 275, 300, 250, 0x4a90e2, 0.3);
    this.hoverIndicator.setVisible(false);

    // Add hover effect
    kitchenArea.on('pointerover', () => {
      this.hoverIndicator.setVisible(true);
    });
    kitchenArea.on('pointerout', () => {
      this.hoverIndicator.setVisible(false);
    });

    // Add title
    const title = this.add.text(400, 50, 'House', {
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

  private navigateToKitchen() {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('KitchenScene');
    });
  }

  private goBack() {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('WorldScene');
    });
  }
}