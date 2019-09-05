import { IWeapon, weaponsList } from './weapons';

export class Player extends PIXI.Graphics {

    public movementSpeed:number = 1.5;
    public movementFriction: number = .8

    public bulletTimer:number;
    public delayBulletTimer:number;

    //square size
    public size:number = 30;

    //position and movement data
    public movementVelocity:number [] = [0,0];
    public maxPosition:number[]

    public ammo:number;
    public ammoMax:number=200;
    public hasAmmo:boolean;

    public health:number;
    public healthmax:number = 100;

    public canFire:boolean = true;

    public currentWeapon: IWeapon;

    constructor(position:number[],maxPosition:number[]){
        super();
        //storing maximum position to stay in set area
        this.maxPosition=maxPosition;
        this.health=100;
        this.ammo=200;
        this.hasAmmo=false;

        this.currentWeapon = weaponsList.pistol;

        this.drawBody();
        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.width*.5)
    }

    drawBody(){
        this.clear();
        //creating player body
        this.lineStyle(1,0xf1bf59);
        this.beginFill(0x483861);
        this.drawRect(0, 0, this.size, this.size);

        this.lineStyle(0)
        this.beginFill(0xf1bf59);
        this.drawRect(this.size*.65, this.size*.1, this.size/4, this.size*.8);
        this.endFill();  
    }


    attackResetTimer(){
        this.bulletTimer=this.currentWeapon.fireDelay;
    }

    giveAmmo(amount:number){
        this.ammo+=amount;
        if(this.ammo > this.ammoMax){
            this.ammo=this.ammoMax;
        }
    }

    takeDamage(damage:number){
        this.health-=damage;
        if(this.health < 0){
            this.health=0;
        }
        this.drawBody();
        return this.health;
    }

    useAmmo():number{
        this.ammo-=this.currentWeapon.ammoUse;
        if(this.ammo<=0){
            this.hasAmmo=false;
            this.ammo=0;
        }
        return this.ammo
    }
    
    aim(mousePos: number[]){
        var dist_X = mousePos[0] - this.position.x;
        var dist_Y = mousePos[1] - this.position.y;
        this.rotation = Math.atan2(dist_Y,dist_X);
    }

    movementMove(radian:number){
        this.movementVelocity[0]+=(Math.cos(radian)*this.movementSpeed);
        this.movementVelocity[1]+=(Math.sin(radian)*this.movementSpeed);
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