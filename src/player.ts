import { IWeapon, weaponsList } from './weapons';

export class Player extends PIXI.Graphics {

    public movementspeed:number = 1.5;
    public movementFriction: number = .8;

    public bulletTimer:number = 6;
    public delayBulletTimer:number = 1;

    //square size
    private size:number = 50;

    //position and movement data
    public movementVelocity:number [] = [0,0];
    public maxPosition:number[]

    public ammo:number;
    public health:number;

    public hasAmmo:boolean;
    public canFire:boolean = true;

    public currentWeapon: IWeapon = weaponsList.shotgun;

    constructor(position:number[],maxPosition:number[]){
        super();
        //storing maximum position to stay in set area
        this.maxPosition=maxPosition;
        this.health=10;
        this.ammo=200;
        this.hasAmmo=false;

        //creating player body
        this.beginFill(0x2d1b00);
        this.drawRect(0, 0, this.size, this.size);

        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.width*.5)

        //adding detail
        this.beginFill(0xc4f0c2);
        this.drawRect(35, 5, 10, 40);
        this.endFill();
    }


    

    fireReset(){
        this.bulletTimer=this.delayBulletTimer;
    }

    attackResetTimer(){
        this.bulletTimer=this.delayBulletTimer;
    }

    giveAmmo(amount:number){
        this.ammo+=amount;
    }

    takeDamage(damage:number){
        this.health-=damage;
        return this.health;
    }

    useAmmo():number{
        this.ammo-=1;
        if(this.ammo===0){
            this.hasAmmo=false;
        }
        return this.ammo
    }
    
    // a function to gind the corners of the square of the player
    // getCorners(){
    //     let corners:number[][] = [
    //         [   this.x-this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation)),
    //             this.y-this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation))
    //         ],
    //         [   this.x+this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation)),
    //             this.y-this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation))
    //         ],
    //         [   this.x+this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation)),
    //             this.y+this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation))
    //         ],
    //         [   this.x-this.size*.5*(Math.sin(this.rotation)-Math.cos(this.rotation)),
    //             this.y+this.size*.5*(Math.sin(this.rotation)+Math.cos(this.rotation))
    //         ]
    //     ]

    //     return corners;

        //"Raw math" from stackexchange
        //(ℎ−12𝐿(sin𝜃+cos𝜃),
        // 𝑘−12𝐿(sin𝜃−cos𝜃),

        //(ℎ+12𝐿(sin𝜃−cos𝜃),
        // 𝑘−12𝐿(sin𝜃+cos𝜃),

        //(ℎ+12𝐿(sin𝜃+cos𝜃),
        // 𝑘+12𝐿(sin𝜃−cos𝜃),

        //(ℎ−12𝐿(sin𝜃−cos𝜃),
        // 𝑘+12𝐿(sin𝜃+cos𝜃)
    //d}

    aim(mousePos: number[]){
        var dist_X = mousePos[0] - this.position.x;
        var dist_Y = mousePos[1] - this.position.y;
        var angle = Math.atan2(dist_Y,dist_X);
        //var degrees = angle * 180/ Math.PI;
        this.rotation = angle;
    }

    move(direction:boolean, axis:boolean){
        if (axis){
            if(direction){
                this.movementVelocity[0]+=this.movementspeed;
            }
            else{
                this.movementVelocity[0]-=this.movementspeed;
            }
        }
        else{
            if(direction){
                this.movementVelocity[1]+=this.movementspeed;
            }
            else{
                this.movementVelocity[1]-=this.movementspeed;
            }
        }
    }

    update(container: PIXI.Container){
        // apply friction and move player with new speed values
        this.movementVelocity[0]*=this.movementFriction;
        this.movementVelocity[1]*=this.movementFriction;

        //keep player in bounds
        if(this.x<0){this.movementVelocity[0]=0, this.x=1}
        if(this.y<0){this.movementVelocity[1]=0, this.y=1}
        if(this.x>this.maxPosition[0]){this.movementVelocity[0]=0, this.x=this.maxPosition[0]-1}
        if(this.y>this.maxPosition[1]){this.movementVelocity[1]=0, this.y=this.maxPosition[1]-1}

        this.x += this.movementVelocity[0];
        this.y += this.movementVelocity[1];

        if (this.ammo>0 && this.bulletTimer<=0){
            this.canFire=true;
        }
        else{
            this.canFire=false;
        }
    }
}