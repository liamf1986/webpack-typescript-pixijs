import {Player} from './player';
import {Enemy} from './enemy'
import {Arena} from './arena'
import {Cursor} from './cursor'
import {Bullet} from './bullet'
import {UI} from './ui'
import { Keyboard } from './keyboard';

export class Game {
    private app: PIXI.Application;
    private player: Player;
    private cursor: Cursor;
    private mouseIsClicked: boolean = false;

    public gameDifficulty:number = .01;

    private enemys: Enemy[];
    private timerSpawnEnemy:number;
    private delaySpawnEnemy:number = 10/this.gameDifficulty;

    private bullets: Bullet[];

    private movementKeys:Keyboard;

    private arena:Arena;
    private ui:UI;

    //private enemy: Enemy []:

    //create game Object with reference to Application
    constructor(app:PIXI.Application){
        this.app=app;
        this.app.stage.interactive = true;
        this.app.stage.buttonMode = true;

        this.bullets = [];
        this.mouseIsClicked = false;

        this.enemys = [];
        this.timerSpawnEnemy = Math.floor(Math.random()*this.delaySpawnEnemy);

        this.movementKeys = new Keyboard(["w","s","a","d"])
    }

    load(loader: PIXI.loaders.Loader) : void {
    //    loader.add('logo', 'assets/logo.png');
    }
    
    //attaching children and listeners to the game object
    setup() : void {
        this.arena= new Arena(this.app,[0,0]);
        this.app.stage.addChild(this.arena);

        this.player = new Player(
            [this.arena.size[1]/2,this.arena.size[0]/2],
            [this.arena.width,this.arena.height]
        );
        this.app.stage.addChild(this.player);

        this.ui = new UI(this.app);
        this.app.stage.addChild(this.ui);

        this.cursor = new Cursor([500,500]);
        this.app.stage.addChild(this.cursor);
        
        //listener for fire event from the arena
        this.arena.on("ClickDown", () => {this.mouseIsClicked=true;});
        this.arena.on("ClickUp", () => {this.mouseIsClicked=false;});
    }

    //movePlayer(direction:boolean, axis:boolean){
     //   this.player.move(direction,axis);
    //}

    fireBullet(){

        for(let i=0; i<this.player.currentWeapon.bullets;i++){
            let newBullet = new Bullet([this.player.x,this.player.y],this.player.rotation,this.player.currentWeapon.damage,this.player.currentWeapon.inaccuracy);
            this.arena.addChild(newBullet);
            this.bullets.push(newBullet);
        }
        this.ui.updateAmmo(this.player.useAmmo());
    }

    damagePlayer(damage:number){
        this.ui.updateHealth(this.player.takeDamage(damage));;
    }

    spawnEnemy(){
        let randomX = Math.random() < .5 ? 1 : -1;
        let randomY = Math.random() < .5 ? 1 : -1;

        var tempEn = new Enemy([
            (this.arena.size[0]+10)*randomX,
            (this.arena.size[1]+10)*randomY
        ])

        tempEn.on("touchedPlayer", () => {this.damagePlayer(tempEn.attackDamage);});
        this.arena.addChild(tempEn);
        this.enemys.push(tempEn);
    }

    eventHandle(delta:number){
        
        
        this.movementKeys.poll()
        let moveVector:number[] = [0,0]

        if(this.movementKeys.areEvents){
            let pressed = this.movementKeys.pressedKeys;
            if(pressed.includes("d")){moveVector[0]+=1}
            if(pressed.includes("a")){moveVector[0]-=1}
            if(pressed.includes("s")){moveVector[1]+=1}
            if(pressed.includes("w")){moveVector[1]-=1}

            this.player.movementMove(Math.atan2(moveVector[1],moveVector[0]))
        }




        this.player.aim(this.arena.mousePos);



        //sending mouse position data to the cursor to update for next frame
        this.cursor.setPos(this.arena.mousePos);

        //the bullet firing timer
        //will fire if the mouse is held and the timer is 0 or less
        if(!this.mouseIsClicked){
            this.player.attackResetTimer();
        }
        else{
            this.player.bulletTimer-=1;
        }
        if(this.player.canFire && this.mouseIsClicked){
            this.fireBullet();
            this.player.attackResetTimer();
        }
    }

    update(){
        this.player.update(this.arena);    
        this.enemys.forEach(enemy => {
            enemy.update([this.player.position.x,this.player.position.y])
        });

        this.bullets.forEach((bullet,index) => {
            bullet.update(this.arena.size);
            if (bullet.cull){
                this.arena.removeChild(bullet);
                this.bullets.splice(index,1);
            }
        });

        this.enemys.forEach((enemy,index) => {
            if (enemy.cull){
                this.arena.removeChild(enemy);
                this.enemys.splice(index,1);
            }
        });
        //decrement the spawn enemy timer and check if it has run down
        this.timerSpawnEnemy-=1;
        if (this.timerSpawnEnemy<=1){
            this.timerSpawnEnemy=Math.floor(Math.random()*this.delaySpawnEnemy)
            this.spawnEnemy();

        }
    }

    detectCollisions(){

        //check each bullet to see if it has hit an enemy
        
        this.bullets.forEach((bullet,bulletindex) => {
            this.enemys.forEach((enemy,enemyindex) => {
                
                var dist_X = enemy.position.x - bullet.x;
                var dist_Y = enemy.position.y - bullet.y;

                if (!(dist_Y > enemy.size/2|| dist_Y < -enemy.size/2) && !(dist_X > enemy.size/2 || dist_X < -enemy.size/2)){
                    enemy.takeDamage(bullet.attackDamage);
                                
                    if (enemy.health<=0){
                        this.player.giveAmmo(enemy.killReward);
                        enemy.cull=true;
                    }
                    bullet.cull=true;
                }
            });
        });
    }

    main(delta: number) : void {
        this.eventHandle(delta);
        this.detectCollisions();
        this.update();
    }

}