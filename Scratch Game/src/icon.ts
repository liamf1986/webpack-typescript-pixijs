export class Icons{
    public spriteArray: PIXI.Sprite[] = [];
    private numberArray: number[] = [];
    private winningSymbolCount: number = 0;
    private winningText: PIXI.Text;
    private graphics: PIXI.Graphics;
    private balance: number = 0;

    private style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 100,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });
    constructor(){
        
    }
    updateIcon(app: PIXI.Application, index: number): void {
        console.log(index)
        var randomNumber = Math.floor(Math.random() * 6);
        this.numberArray.push(randomNumber);
        console.log(this.numberArray);
        var sprites = ['bat','bulb',"car","ell",'hopper','monster',];
        this.spriteArray[index].texture = app.loader.resources[sprites[randomNumber]].texture;
        this.spriteArray[index].interactive = false;
        this.spriteArray[index].width = 100;
        this.spriteArray[index].height = 150;
        this.winningText = new PIXI.Text('You Win!', this.style);
        
        if(randomNumber === 2){
            this.winningSymbolCount++;
            if (this.winningSymbolCount >= 3){
                this.spriteArray.forEach(icon => {
                    // this.graphics.lineStyle(10, 0xFFBD01, 1);
                    // this.graphics.beginFill(0xC34288);
                    // this.graphics.drawRect(350, 50, 100, 100);
                    // this.graphics.endFill();
                    // console.log('rgsrg')
                    // app.stage.addChild(this.graphics)
                    this.winningText.anchor.set(0.5);
                    app.stage.addChild(this.winningText);
                    this.winningText.visible = true;
                    this.winningText.x = app.screen.width / 2;
                    this.winningText.y = app.screen.height / 2;
                    this.winningText.visible = true
                    icon.visible = false;
                    this.balance = this.balance++;
                    console.log(this.balance);
                });
                //this.winLogo.visible = true;
            }
        }
    }

    setupGame(app: PIXI.Application) : void {
        // create your assets: Sprites, Sounds, etc...
        // Set any constiant data

        //Set circle Graphics points
        var graphicPoints = [[0.25,0.25],[0.5,0.25],[0.75,0.25],[0.25,0.5],[0.5,0.5],[0.75,0.5],[0.25,0.75],[0.5,0.75],[0.75,0.75]];

        // this.winningText = new PIXI.Text('You Win!',this.style);

        //Create the graphics
        for (let i = 0; i < 9; i++){
            var icon = new PIXI.Sprite(app.loader.resources.faceDown.texture);
            //var icons = new PIXI.Sprite(app.loader.resources[sprites[randomNumber]].texture);
            icon.x = graphicPoints[i][0] * app.screen.width;
            icon.y = graphicPoints[i][1] * app.screen.height;
            this.spriteArray.push(icon);
            icon.anchor.set(0.5);
            icon.width = 170;
            icon.height = 150;
            icon.on('pointerdown', () => {
                this.updateIcon(app, i);
            }, this);
            app.stage.addChild(icon);

        }

        this.spriteArray.forEach(sprite => {
            sprite.interactive = true;
            sprite.buttonMode = true;
        });
    }
}