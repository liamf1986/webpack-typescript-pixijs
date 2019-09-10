class Popup extends PIXI.Container{

    private titleStyle:PIXI.TextStyle = new PIXI.TextStyle(
        {
            "fill": [
                "#bbbbbb",
            ],
            "align": "center",
            "fontFamily": "Arial, Helvetica, sans-serif",
            "fontSize": 80,
            "fontVariant": "small-caps",
            "fontWeight": "bold",
            "letterSpacing": 4,
            "strokeThickness": 8,
            "miterLimit": 2
        }
        );
    
    private contentStyle:PIXI.TextStyle = new PIXI.TextStyle(
        {
            "fill": [
                "#bbbbbb",
            ],
            "align": "center",
            "fontFamily": "Arial, Helvetica, sans-serif",
            "fontSize": 40,
            "fontVariant": "small-caps",
            "fontWeight": "bold",
            "letterSpacing": 4,
            "strokeThickness": 8,
            "miterLimit": 2
        }
        );

    private buttonStyle:PIXI.TextStyle = new PIXI.TextStyle(
        {
            "fill": [
                "#bbbbbb",
            ],
            "align": "center",
            "fontFamily": "Arial, Helvetica, sans-serif",
            "fontSize": 40,
            "fontVariant": "small-caps",
            "fontWeight": "bold",
            "letterSpacing": 4,
            "strokeThickness": 8,
            "miterLimit": 2
        }
        );
    private background:PIXI.Graphics;

    private title:PIXI.Text;
    private contents:PIXI.Text;

    private button:PIXI.Graphics;
    private text:PIXI.Text;

    private type:"Gameover"|"Message";

    constructor(title:string, contents:string, type?:"Gameover"|"Message"){
        super()

        this.background = new PIXI.Graphics()
        this.background.beginFill(0x1a212d);
        this.background.drawRect(0,0,700,600);
        this.background.endFill();
        this.addChild(this.background);
        this.pivot.set(this.width*.5)

        let buttonWidth = this.width*.4;
        let buttonHeight = this.width*.1;
        let buttonX = this.width*.5-buttonWidth*.5
        let buttonY = this.height*.8;
        
        this.title = new PIXI.Text(title,this.titleStyle);
        this.title.x = this.width*.5 - this.title.width*.5;
        this.title.y = this.height*.1

        this.contents = new PIXI.Text(contents,this.contentStyle);
        this.contents.x = this.width*.5 - this.contents.width*.5
        this.contents.y = this.height*.3

        this.addChild(this.title);
        this.addChild(this.contents);


        let buttonColor = 0x000000;
        let buttonTXT = "";

        switch (type){
            case "Gameover":
                buttonTXT = "RESET";
                buttonColor = 0x8e243f;
                break;
            case "Message":
                buttonTXT = "CONTINUE";
                buttonColor = 0x45a346;
                break;
        }

        this.button = new PIXI.Graphics()
        this.button.beginFill(buttonColor);
        this.button.drawRect(0,0,buttonWidth,buttonHeight);
        this.button.endFill();
        this.button.x = buttonX 
        this.button.y = buttonY
        //add text to the image
        this.text = new PIXI.Text(buttonTXT,this.buttonStyle)
        this.text.x = this.button.x + this.button.width*.5 - this.text.width*.5;
        this.text.y = this.button.y + this.button.height*.5 - this.text.height*.5;   
        this.addChild(this.button);
        this.addChild(this.text);

        this.button.interactive=true;
        this.button.buttonMode=true;
        this.button.on("pointerdown", () => {
            this.emit("interaction", type);
        });
    }

    setPos(x:number, y:number){
        this.x=x;
        this.y=y;
    }
}

export class Popups extends PIXI.Container{

    gameOver:Popup;
    welcome:Popup;

    constructor(x:number,y:number){
        super()
        //create and configure popups
        this.gameOver = new Popup("GAME OVER!", "YOU DIED!\nPLAY AGAIN?","Gameover")
        this.gameOver.setPos(x,y);
        this.gameOver.on("interaction", () => {
            this.emit("interaction");
            this.hidePopup();
        });


        this.welcome = new Popup("Welcome!", "Shoot squares to earn money!\nLast as long as you can to\nget a high score!","Message")
        this.welcome.setPos(x,y);
        this.welcome.on("interaction", () => {
            this.emit("interaction");
            this.hidePopup();
        });

        this.addChild(this.gameOver);
        this.addChild(this.welcome)
    }

    hidePopup(){
        this.welcome.visible=false;
        this.gameOver.visible=false;
    }

    showGameOver(){
        this.gameOver.visible = true;
    }
}