export class Enemy extends PIXI.Graphics {

    public size:number = 50;
    public movementSpeed:number = 3;
    public attackRange:number = 40;
    public targetRange:number = 35;
    public killReward:number = 15;

    public damageCooldown:number;
    public health:number;

    private attackCoolDown:number;

    //position and movement data


    public movementVelocity:number [] = [0,0];

    constructor(position:number[]){
        super();

        this.health = 10;
        this.damageCooldown=0;
        this.attackCoolDown=0;

        //creating player body
        this.beginFill(0x2d1b00);
        this.drawRect(0, 0, this.size, this.size);
        this.beginFill(0x22ff22);
        this.drawRect(35, 5, 10, 4*this.health);
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
            255-(this.health*25/255),
            1+(this.health*25/255),
            10/255
        ]);

        this.beginFill(color);
        this.drawRect(35, 5, 10, 4*this.health);
        this.endFill();
    }

    update(playerPos:number[], bullets:any[]){
        //calculate the distance on X and Y from this to the target
        var dist_X = playerPos[0] - this.position.x;
        var dist_Y = playerPos[1] - this.position.y;
        
        //calculate angle from this to the target
        var angle = Math.atan2(dist_Y,dist_X);
        this.rotation = angle;
        this.movementVelocity = [Math.cos(angle)*this.movementSpeed,Math.sin(angle)*this.movementSpeed];

        //moving this if the target is further than the target position
        //this is to prevent this from oscilating around the player
        if ((dist_X > this.targetRange || dist_X < -this.targetRange)){
            this.x += this.movementVelocity[0];
        }
        if ((dist_Y > this.targetRange || dist_Y < -this.targetRange)){
            this.y += this.movementVelocity[1];
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