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

    constructor(position:number[]){
        super();

        this.size = Math.floor(Math.random() * (100 - 15 + 1)) + 15;

        this.movementSpeed = 120/this.size;
        
        this.attackRange = this.size/1.8;
        this.attackDamage = this.size/20;
        this.killReward = .55*this.size;
        this.maxHealth = .5*this.size;
        this.health =this.maxHealth;  

        this.health = this.maxHealth;
        this.damageCooldown=0;
        this.attackCoolDown=0;

        let color = PIXI.utils.rgb2hex([
            1-this.health/this.maxHealth,
            this.health/this.maxHealth,
            .1
        ]);

        //creating player body
        this.beginFill(0x2d1b00);
        this.drawRect(0, 0, this.size, this.size);
        this.beginFill(color);
        this.drawRect(this.size*.65, this.size*.1, this.size/4, (this.size/this.maxHealth)*.8*this.health);
        this.endFill();


        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.width*.5)

        this.x=position[0];
        this.y=position[1];
    }

    takeDamage(damage:number){
        if(this.damageCooldown<=0){
            this.health-=damage;
            this.damageCooldown=1;
        }
        this.clear();
        //creating player body
        this.beginFill(0x2d1b00);
        this.drawRect(0, 0, this.size, this.size);

        let color = PIXI.utils.rgb2hex([
            1-this.health/this.maxHealth,
            this.health/this.maxHealth,
            .1
        ]);

        this.beginFill(color);
        this.drawRect(this.size*.65, this.size*.1, this.size/4, (this.size/this.maxHealth)*.8*this.health);
        this.endFill();        
    }

    update(playerPos:number[]){
        //calculate the distance on X and Y from this to the target
        var dist_X = playerPos[0] - this.position.x;
        var dist_Y = playerPos[1] - this.position.y;
        
        //calculate angle from this to the target
        var angle = Math.atan2(dist_Y,dist_X);
        this.rotation = angle;
        this.movementVelocity = [Math.cos(angle)*this.movementSpeed,Math.sin(angle)*this.movementSpeed];

        //moving this if the target is further than the target position
        //this is to prevent this from oscilating around the player


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
        if (!(dist_Y > this.attackRange || dist_Y < -this.attackRange) && !(dist_X > this.attackRange || dist_X < -this.attackRange) && this.attackCoolDown<=0){
            this.attackCoolDown=30;
            this.emit("touchedPlayer");
        }

        //decrement damagecooldown
        this.damageCooldown-=1;
    }
}