export class Entity extends PIXI.Graphics{
    
    public size:number;
    public lifeSpan:number;

    public health:number;
    public maxHealth:number;

    public killReward:number;
    public attackDamage:number;
    public attackRange:number;

    public attackCooldownDelay:number;
    public attackCooldownTimer:number;
    public attackReady:boolean;

    private movementVelocity:number[];
    private movementFriction:number;
    private movementSpeed:number;

    public cull:boolean = false;

    constructor(position?:number[]){
        super()
        this.movementVelocity=[];
    }

    takeDamage(damage:number){
        this.health-=damage;
    }

    attackReset(){
        this.attackCooldownTimer = this.attackCooldownDelay;
    }

    aimAtPoint(pointPos:number[]){
        var dist_X = pointPos[0] - this.position.x;
        var dist_Y = pointPos[1] - this.position.y;
        this.rotation = Math.atan2(dist_Y,dist_X)
    }

    movementAddForce(radian:number[],force:number){
        this.movementVelocity[0]+=(radian[0]*force);
        this.movementVelocity[1]+=(radian[0]*force);
    }

    movementMove(radian:number[],direction:number){
        this.movementVelocity[0]+=((radian[0]*this.movementSpeed)*direction);
        this.movementVelocity[1]+=((radian[0]*this.movementSpeed)*direction);
    }

    movementUpdate(){
        this.movementVelocity[0]*=this.movementFriction;
        this.movementVelocity[1]*=this.movementFriction;
        this.x+=this.movementVelocity[0];
        this.y+=this.movementVelocity[1];
    }


}