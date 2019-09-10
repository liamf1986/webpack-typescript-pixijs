import {Player} from './player';
import {Enemy} from './enemy'
import {Arena} from './arena'
import {Cursor} from './cursor'
import {Bullet} from './bullet'
import {UI} from './ui'
import {Keyboard} from './keyboard';
import {Level} from './level';
import {inventory} from './inventory'
import {IWeapon} from './weapons';

import {Popups} from './popups'

export class Game {
    private app: PIXI.Application;

    private gameIsPaused:boolean=true;

    private player: Player;
    private cursor: Cursor;
    private mouseIsClicked: boolean = false;

    private difficulty:number=1;
    private level:Level;

    private enemys: Enemy[];
    private bullets: Bullet[];

    private movementKeys:Keyboard;

    private arena:Arena;
    private ui:UI;

    private popups:Popups;
    //create game Object with reference to Application
    constructor(app:PIXI.Application){
        this.app=app;
        this.level = new Level(this.difficulty);
        this.mouseIsClicked = false;
        this.movementKeys = new Keyboard(["w","s","a","d"]);
        this.enemys = [];
        this.bullets = [];
    }

    load(loader: PIXI.loaders.Loader) : void {
        loader.add('pistol', 'assets/imgPistol.png');
        loader.add('shotgun', 'assets/imgShotgun.png');
        loader.add('machinegun', 'assets/imgMachineGun.png');
        loader.add('sniper', 'assets/imgSniper.png');

        loader.add('ammopack', 'assets/imgAmmo.png');
        loader.add('healthpack', 'assets/imghealth.png');
    }
    
    //attaching children and listeners to the game object
    setup() : void {
        this.arena= new Arena(this.app,[0,0]);
        this.app.stage.addChild(this.arena);

        this.player = new Player( [this.arena.size[0]/2,this.arena.size[1]/2],
                                  [this.arena.width,this.arena.height]
        );
        this.app.stage.addChild(this.player);
        this.player.on("dead", () => this.endGame())

        this.ui = new UI();
        this.app.stage.addChild(this.ui);

        this.ui.shop.on("shopEvent", (event:IWeapon) => {this.shopEquip(event);});

        this.cursor = new Cursor([500,500]);
        this.app.stage.addChild(this.cursor);
        
        //listener for fire event from the arena
        this.arena.on("ClickDown", () => {this.mouseIsClicked=true;});
        this.arena.on("ClickUp", () => {this.mouseIsClicked=false;});

        //listner for player fire events
        this.player.on("fire", () => this.fireBullet())

        //listener for kit purchases in shop interface
        this.ui.shop.on("buykit", (kitType:"ammo"|"health") => {
            this.buyKit(kitType);
        })

        this.popups = new Popups(this.arena.width*.5, this.arena.height*.55);
        this.popups.on("interaction", () => {
            this.newGame();
        })
        this.app.stage.addChild(this.popups);
    }

    clearGame(){
        this.enemys.forEach(enemy => {
            this.arena.removeChild(enemy);
        });

        this.bullets.forEach((bullet) => {
            this.arena.removeChild(bullet);
        });

        this.enemys=[];
        this.bullets=[];

        inventory.reset()
        this.player.reset();
        this.ui.reset();
    }

    newGame(){
        this.clearGame()
        this.gameIsPaused=false;
    }

    endGame(){
        this.popups.showGameOver()
        this.gameIsPaused=true;
    }

    buyKit(kitType:"ammo"|"health"){
        if(inventory.buyKit(50)){
            this.player.giveKit(kitType);
            this.ui.updateAmmo(this.player.ammo);
            this.ui.updateHealth(this.player.health);
            this.ui.shop.updateMoney();
        }
    }

    shopEquip(event:IWeapon){
        inventory.selectWeapon(event);
        this.player.updateGun();
    }

    fireBullet(){
        for(let i=0; i<inventory.selectedWeapon.bullets;i++){
            let newBullet = new Bullet([this.player.x,this.player.y],this.player.rotation,inventory.selectedWeapon.damage,inventory.selectedWeapon.inaccuracy);
            this.arena.addChild(newBullet);
            this.bullets.push(newBullet);
        }
        this.ui.updateAmmo(this.player.ammo);
    }

    damagePlayer(damage:number){
        this.ui.updateHealth(this.player.takeDamage(damage));;
    }

    spawnEnemy(){
        let dist_X = this.arena.size[0]*.5 - Math.floor(Math.random()*this.arena.size[0]);
        let dist_Y = this.arena.size[1]*.5 -  Math.floor(Math.random()*this.arena.size[1]);
        let randomPos = Math.atan2(dist_Y,dist_X);

        let randomX = this.arena.size[0]*.5 + (
            Math.sin(randomPos)*this.arena.size[0]);

        let randomY = this.arena.size[1]*.5 + (
            Math.cos(randomPos)*this.arena.size[1]);

        let tempEn = new Enemy([
            randomX,
            randomY],
            this.player.size*.5,
            this.level.enemyStrength)

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
            this.player.movementMove(Math.atan2(moveVector[1],moveVector[0]));
        }

        this.player.aim(this.arena.mousePos);

        //sending mouse position data to the cursor to update for next frame
        this.cursor.setPos(this.arena.mousePos);
    }

    update(){
        this.player.update(this.mouseIsClicked);    
        
        this.enemys.forEach(enemy => {
            enemy.update([this.player.position.x,this.player.position.y])
        });

        this.bullets.forEach((bullet) => {
            bullet.update(this.arena.size);
        });

        //decrement the spawn enemy timer and check if it has run down

        this.level.spawnDelayTimer--;
        if (this.level.spawnDelayTimer<=1){

            this.level.resetTimer();
            if(this.level.canSpawnEnemy()){
                this.spawnEnemy();
                this.level.enemySpawned++;
            }
        }
    }

    detectCollisions(){

        for (let bulletIndex = this.bullets.length-1; bulletIndex>=0; bulletIndex--){
            let indexedBullet = this.bullets[bulletIndex];

            for (let enemyIndex = this.enemys.length-1; enemyIndex>=0; enemyIndex--){
                let indexedEnemy = this.enemys[enemyIndex];

                 let a = indexedBullet.x-indexedEnemy.x;
                 let b = indexedBullet.y-indexedEnemy.y;
                 let distance = Math.sqrt(a*a + b*b);

                if (distance < indexedEnemy.size*.5){
                    indexedEnemy.takeDamage(indexedBullet.attackDamage);

                    if (indexedEnemy.health<=0){
                        inventory.giveMoney(indexedEnemy.killReward);
                        this.ui.shop.updateMoney();
                        this.level.enemyKilled();
                        this.enemys.splice(enemyIndex,1);
                        this.arena.removeChild(indexedEnemy)
                    }
                    this.bullets.splice(bulletIndex,1);
                    this.arena.removeChild(indexedBullet);
                }
            }
        }
    }

    main(delta: number) : void {
        if(!this.gameIsPaused){
            this.eventHandle(delta);
            this.detectCollisions();
            this.update();
        }
    }

}