export class Bullet extends PIXI.Graphics{

    private size:number = 10;
    private inaccuracy:number;    
    private speed:number = 15;
    private velocity:number [];
    public cull: boolean = false;
    public attackDamage:number;

    constructor(position: number [], angle:number, damage:number, inaccuracy:number){
        super();
        //creating player body
        this.beginFill(0xf1bf59 );
        this.drawRect(0, 0, this.size*.5, this.size*.5);
        this.endFill();

        this.attackDamage=damage;

        this.velocity=[]

        let randomDir = Math.random() * (inaccuracy - -inaccuracy) + -inaccuracy;

        

        this.velocity[0]=(Math.cos(angle+randomDir)*this.speed);
        this.velocity[1]=(Math.sin(angle+randomDir)*this.speed);

        //setting the angle of the bullet to the given value
        this.rotation = angle;



        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.size*.25)
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
        this.cull = true;
    }
}

export class Fire extends PIXI.Graphics{

    private size:number = 10;
    private inaccuracy:number;    
    private speed:number = 15;
    private velocity:number [];
    public cull: boolean = false;
    public attackDamage:number;



    constructor(position: number [], angle:number, damage:number, inaccuracy:number){
        super();
        //creating player body
        this.beginFill(0xc4f0c2);
        this.drawRect(0, 0, this.size*.5, this.size*.5);
        this.endFill();

        this.attackDamage=damage;
        this.inaccuracy=inaccuracy;

        //giving the bullet speed based on the input and applying some random forces
        this.velocity = [
            Math.cos(angle+(Math.random()-.5)*this.inaccuracy)*this.speed,
            Math.sin(angle+(Math.random()-.5)*this.inaccuracy)*this.speed
        ];

        //setting the angle of the bullet to the given value
        this.rotation = angle;

        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.size*.25)

        this.x += this.velocity[0]*.4;
        this.y += this.velocity[1]*.4;
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
        this.cull = true;
    }
}