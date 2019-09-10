export class Level{

    public spawnDelay:number;
    public spawnDelayTimer:number;

    public enemySpawned:number;
    public enemyCap:number;
    public enemyStrength:number;
    public difficulty:number

    public killCount:number;
    
    constructor(difficulty:number){
        this.difficulty=difficulty;

 
        this.enemyStrength=difficulty*.5;
        this.enemySpawned=0
        this.enemyCap=8;
        this.killCount=0;

        this.spawnDelay=1800/this.enemyCap;
        this.spawnDelay=1
        this.spawnDelayTimer=this.spawnDelay;
    }

    public canSpawnEnemy():boolean{
        if(this.enemySpawned<this.enemyCap){
            return true;
        }
        else{
            return false;
        }
    }

    public enemyKilled(){
        this.killCount++;
        if(this.killCount>=this.enemyCap){
            this.newround();
        }
    }

    public newround(){
        this.killCount=0;
        this.enemySpawned=0;

        this.enemyStrength+=.1;
        this.enemyCap = Math.round(this.enemyCap*1.1);

        this.spawnDelay=1800/this.enemyCap;
        this.spawnDelayTimer=this.spawnDelay;
        console.log(this.enemyCap, this.spawnDelay)
    }

    public resetTimer(){
        this.spawnDelayTimer=this.spawnDelay;
    }


}
