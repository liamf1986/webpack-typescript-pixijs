export class Enemy extends PIXI.Graphics {

    public size:number;

    public movementSpeed:number;
    public attackRange:number;
    public attackDamage:number;
    public killReward:number;
    public health:number;
    public maxHealth:number;

    public cull: boolean = false;

    public damageCooldown:number;
    private attackCoolDown:number;

    public movementVelocity:number [] = [0,0];

    constructor(position:number[], playerSize:number, strength:number){
        super();

        this.size = strength*40 + Math.random()*10

        this.movementSpeed = this.size*.15;
        
        this.attackRange = this.size*.5+playerSize;
        this.attackDamage = this.size*.1;
        this.killReward = Math.round(.9*this.size);
        this.maxHealth = .3*this.size;
        this.health =this.maxHealth;  

        this.health = this.maxHealth;
        this.damageCooldown=0;
        this.attackCoolDown=0;

        this.drawBody();

        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.width*.5)

        this.x=position[0];
        this.y=position[1];
    }

    distanceFrom(target:number[]){
        let a = this.x-target[0]
        let b = this.y-target[1]
        let distance = Math.sqrt( a*a + b*b)
        return distance
    }

    drawBody(){
        this.clear();
        //creating player body
        this.beginFill(0x1a212d);
        this.drawRect(0, 0, this.size, this.size);

        let R:number = 1-this.health/this.maxHealth
        let G:number = this.maxHealth/this.maxHealth
        let B:number = 1

        let FRcolor = PIXI.utils.rgb2hex([
            R*.85,
            G*.6,
            B*.35
        ]);

        let BGcolor = PIXI.utils.rgb2hex([
            R*.425,
            G*.3,
            B*.175
        ]);

        this.beginFill(BGcolor);
        this.drawRect(this.size*.65, this.size*.1, this.size/4, this.size*.8);
        this.beginFill(FRcolor);
        this.drawRect(this.size*.65, this.size*.1, this.size/4, (this.size/this.maxHealth)*.8*this.health);
        this.endFill();  
    }

    takeDamage(damage:number){
        this.health-=damage;
        this.drawBody(); 
    }

    update(playerPos:number[]){
        
        //calculate angle from this to the target
        var angle = Math.atan2(
            (playerPos[1] - this.position.y),
            (playerPos[0] - this.position.x));

        this.rotation = angle;
        this.movementVelocity = [Math.cos(angle)*this.movementSpeed,Math.sin(angle)*this.movementSpeed];

        // calculate distance to player and move if unable to attack
        let a = this.x-playerPos[0]
        let b = this.y-playerPos[1]
        let distance = Math.sqrt( a*a + b*b)

        if (distance>this.attackRange){
            this.x+=this.movementVelocity[0]
            this.y+=this.movementVelocity[1]
        }
    
        //emits a signal that the enemy should be attacked if the player is within attack range
        //resets the cooldown after attack
        this.attackCoolDown-=1;
        if (distance<this.attackRange && this.attackCoolDown<=0){
            this.attackCoolDown=30;
            this.emit("touchedPlayer");
        }
    }
}