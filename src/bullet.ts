export class Bullet extends PIXI.Graphics{

    private size:number = 10;
    private inaccuracy:number = .1;    
    private speed:number = 15;
    private velocity:number [];
    public outofbounds: boolean = false;

    public attackRange:number = 30;
    public attackDamage:number = 1;



    constructor(position: number [], angle:number){
        super();
        //creating player body
        this.beginFill(0xc4f0c2);
        this.drawRect(0, 0, this.size, this.size);
        this.endFill();

        //giving the bullet speed based on the input and applying some random forces
        this.velocity = [
            Math.cos(angle+(Math.random()-.5)*this.inaccuracy)*this.speed,
            Math.sin(angle+(Math.random()-.5)*this.inaccuracy)*this.speed
        ];

        //setting the angle of the bullet to the given value
        this.rotation = angle;

        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.size*.5)
    }

    update(container:number[]){
        //remove self if out of bounds
        if(this.position.x>container[0] || this.position.x<0 || this.position.y > container[1] || this.position.y < 0){
            this.remove();
        }

        this.x += this.velocity[0];
        this.y += this.velocity[1];
    }

    remove(){
        this.outofbounds = true;
    }

    // a function to gind the corners of the square of the player
    getCorners(){
        let corners:number[][] = [
            [   this.x-this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation)),
                this.y-this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation))
            ],
            [   this.x+this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation)),
                this.y-this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation))
            ],
            [   this.x+this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation)),
                this.y+this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation))
            ],
            [   this.x-this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation)),
                this.y+this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation))
            ]
        ]
        return corners;

        //"Raw math" from stackexchange
        //(ℎ−12𝐿(sin𝜃+cos𝜃),
        // 𝑘−12𝐿(sin𝜃−cos𝜃),

        //(ℎ+12𝐿(sin𝜃−cos𝜃),
        // 𝑘−12𝐿(sin𝜃+cos𝜃),

        //(ℎ+12𝐿(sin𝜃+cos𝜃),
        // 𝑘+12𝐿(sin𝜃−cos𝜃),

        //(ℎ−12𝐿(sin𝜃−cos𝜃),
        // 𝑘+12𝐿(sin𝜃+cos𝜃)
    }
}