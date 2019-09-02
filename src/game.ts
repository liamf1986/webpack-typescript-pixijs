import {Player} from './player';
import {Enemy} from './enemy'
import {KeyHandler} from './keyboard'
import {Arena} from './arena'
import {Cursor} from './cursor'
import {Bullet} from './bullet'
import {UI} from './ui'

export class Game {
    private app: PIXI.Application;
    private player: Player;
    private cursor: Cursor;
    private mouseIsClicked: boolean = false;

    public gameDifficulty:number = .1;

    private enemys: Enemy[];
    private timerSpawnEnemy:number;
    private delaySpawnEnemy:number = 8/this.gameDifficulty;

    private bullets: Bullet[];

    private moveLeft:KeyHandler;
    private moveRight:KeyHandler;
    private moveUp:KeyHandler;
    private moveDown:KeyHandler;

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

        this.moveLeft = new KeyHandler("a");
        this.moveRight = new KeyHandler('d');
        this.moveUp = new KeyHandler('w');
        this.moveDown = new KeyHandler('s');;
    }

    load(loader: PIXI.loaders.Loader) : void {
    //    loader.add('logo', 'assets/logo.png');
    }
    
    //attaching children and listeners to the game object
    setup() : void {
        this.arena= new Arena(this.app,[0,0]);
        this.app.stage.addChild(this.arena);

        this.player = new Player([500,500],[this.arena.width,this.arena.height]);
        this.app.stage.addChild(this.player);

        this.ui = new UI(this.app);
        this.app.stage.addChild(this.ui);

        this.cursor = new Cursor([500,500]);
        this.app.stage.addChild(this.cursor);
        
        //listener for fire event from the arena
        this.arena.on("ClickDown", () => {this.mouseIsClicked=true;});
        this.arena.on("ClickUp", () => {this.mouseIsClicked=false;});
    }

    movePlayer(direction:boolean, axis:boolean){
        this.player.move(direction,axis);
    }

    fireBullet(){
        let newBullet = new Bullet([this.player.x,this.player.y],this.player.rotation);
        this.arena.addChild(newBullet);
        this.bullets.push(newBullet);
        this.ui.updateAmmo(this.player.useAmmo());
    }

    damagePlayer(){
        this.ui.updateHealth(this.player.takeDamage(1));;
    }

    spawnEnemy(){
        
        let randomX = Math.random() < .5 ? 1 : -1;
        let randomY = Math.random() < .5 ? 1 : -1;

        var tempEn = new Enemy([
            (this.arena.size[0]+10)*randomX,
            (this.arena.size[1]+10)*randomY
        ])

        tempEn.on("touchedPlayer", () => {this.damagePlayer();});
        this.arena.addChild(tempEn);
        this.enemys.push(tempEn);
    }

    eventHandle(delta:number){
        //Player handling
        //Sends keyboard input and mouse posistion to update for next frame
        if (this.moveLeft.isDown){this.movePlayer(false,true);}
        if (this.moveRight.isDown){this.movePlayer(true,true);}
        if (this.moveUp.isDown){this.movePlayer(false,false);}
        if (this.moveDown.isDown){this.movePlayer(true,false);}
        this.player.aim(this.arena.mousePos);

        //sending mouse position data to the cursor to update for next frame
        this.cursor.setPos(this.arena.mousePos);

        //the bullet firing timer
        //will fire if the mouse is held and the timer is 0 or less
        if(!this.mouseIsClicked){
            this.player.fireReset();
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
            enemy.update([this.player.position.x,this.player.position.y],this.bullets)
        });

        this.bullets.forEach((bullet,index) => {
            bullet.update(this.arena.size);
            if (bullet.outofbounds){
                this.arena.removeChild(bullet);
                this.bullets.splice(index,1);
                
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
        this.bullets.forEach(bullet => {
            this.enemys.forEach((enemy,index) => {
                    
                var dist_X = enemy.position.x - bullet.x;
                var dist_Y = enemy.position.y - bullet.y;

                if (!(dist_Y > bullet.attackRange || dist_Y < -bullet.attackRange) && !(dist_X > bullet.attackRange || dist_X < -bullet.attackRange)){
                    enemy.takeDamage(bullet.attackDamage);
                    bullet.remove();
                    if (enemy.health<=0){
                        this.player.giveAmmo(enemy.killReward);
                        this.arena.removeChild(enemy);
                        enemy=null;
                        this.enemys.splice(index,1)   
                    }
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