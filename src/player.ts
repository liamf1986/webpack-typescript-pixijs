import {weaponsList} from './weapons';
import {inventory} from './inventory'


export class Player extends PIXI.Graphics {

    public movementSpeed:number = 1.5;
    public movementFriction: number = .8

    private attackCoolDown:number;

    //square size
    public size:number = 30;

    //position and movement data
    public movementVelocity:number [] = [0,0];
    public maxPosition:number[]
    public startingPosition:number[];

    public ammoMax:number=200;
    public ammo:number=this.ammoMax;

    public healthMax:number = 100;
    public health:number = this.healthMax;

    public canFire:boolean = true;

    constructor(position:number[],maxPosition:number[]){
        super();
        //storing maximum position to stay in set area
        this.maxPosition=maxPosition;
        this.startingPosition=position;
        this.ammo=this.ammoMax; 

        this.drawBody();
        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.width*.5)
        this.updateGun();
    }

    public updateGun(){
        this.attackCoolDown = inventory.selectedWeapon.fireDelay;
    }

    private drawBody(){
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

    giveKit(kitType:"ammo"|"health"){
        if(kitType==="ammo"){
            this.ammo+=10;
            if(this.ammo>this.ammoMax){
                this.ammo=this.ammoMax
            }
        }
        if(kitType==="health"){
            this.health+=10;
            if(this.health>this.healthMax){
                this.health=this.healthMax
            }
        }
    }

    takeDamage(damage:number){
        this.health-=damage;
        if(this.health < 0){
            this.health=0;
            this.emit("dead");
        }
        this.drawBody();
        return this.health;
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

    attack(){
        this.emit("fire");
        this.attackCoolDown=inventory.selectedWeapon.fireDelay;
        this.ammo-=inventory.selectedWeapon.ammoUse;
    }

    update(fire:boolean){

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

        this.attackCoolDown-=1

        if (fire && this.attackCoolDown<=0 && (this.ammo>=inventory.selectedWeapon.ammoUse)){
            this.attack();
        }
    }

    public reset(){
        this.ammo=this.ammoMax;
        this.health=this.healthMax;
        this.position.x = this.startingPosition[0]
        this.position.y = this.startingPosition[1]
    }
}