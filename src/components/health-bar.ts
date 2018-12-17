import { Container, Sprite, loaders, Rectangle, Texture } from 'pixi.js';
import { TweenLite } from 'gsap';

export class HealthBar extends Container {
    private segment: Sprite[] = [];
    private maxHealth: number = 0;
    private currentHealth: number = 0;

    constructor(maxHealth: number = 1) {
        super();

        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    public init(loader: loaders.Loader): void {
        for (let i = 0; i < this.maxHealth; ++i) {
            const texture: Texture = loader.resources['window'].texture;
            const backgroundSprite: Sprite = new Sprite(Texture.from(texture.baseTexture));
            backgroundSprite.texture.frame = new Rectangle(6189, 2354, 825, 192);
            backgroundSprite.x = i * 825;


            this.addChild(backgroundSprite);
            const segment: Sprite = new Sprite(Texture.from(texture.baseTexture));
            segment.texture.frame = new Rectangle(6365, 2554, 615, 110);
            segment.x = 180;
            segment.y = 32;
            
            backgroundSprite.addChild(segment);

            this.segment.push(segment);
        }

        this.scale.set(0.2);
        this.rotation = Math.PI / 2;
        this.x = 50;
        this.y = 10;

        this.interactive = true;
        this.on('pointertap', () => this.health = this.currentHealth - 1);
    }

    public set health(value: number) {
        value = Math.max(0, Math.min(value, this.maxHealth));

        TweenLite.killTweensOf(this);

        const tween = TweenLite.to(this, 0.5, {
            currentHealth: value,
            onUpdate: () => {
                for (let i = 0; i < this.maxHealth; ++i) {
                    if (i < value) {
                        this.segment[i].texture.frame = new Rectangle(6365, 2554, 615, 110);
                    } else if (i > value) {
                        this.segment[i].texture.frame = new Rectangle(6365, 2554, 0, 110);
                    } else {
                        this.segment[i].texture.frame = new Rectangle(6365, 2554, 615 * (1.0 - tween.progress()), 110);
                    }
                }                
            }
        });
    }
}