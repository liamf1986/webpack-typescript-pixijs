export class KeyHandler{

    public value: any;
    public isDown: boolean;
    public isUp: boolean;

    constructor(value: any){

        this.value = value
        this.isDown = false;
        this.isUp = true;

        window.addEventListener(
            "keydown", this.downhandler.bind(this)
        );
        window.addEventListener(
            "keyup", this.uphandler.bind(this)
        );
    }

    //The Key up handler
    uphandler(event:any){
        if (event.key === this.value){
            if (this.isDown){
                this.isDown = false;
                this.isUp = true;
                event.preventDefault();
            }
        }
    }

    //The key down handler
    downhandler(event:any){
        if (event.key === this.value){
            if (this.isUp){
                this.isDown = true;
                this.isUp = false;
                event.preventDefault();
            }
        }
    }

    destroy(){
        window.removeEventListener("keydown", this.downhandler);
        window.removeEventListener("keyup", this.uphandler);
    }


    

    //uphandler


}

