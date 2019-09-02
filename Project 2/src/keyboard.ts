interface IKeyBoardState {
    [key: string]: boolean;
}

class Keyboard {
    private keys: IKeyBoardState = {};

    constructor() {
        window.onkeyup = (e) => {
            this.keys[e.key] = false;
        }
        window.onkeydown = (e) => { 
            this.keys[e.key] = true;
        }
    }

    public isKeyDown(key: string): boolean {
        if (this.keys[key]) {
            return true;
        }
        return false;
    }
}

export const KeyboardInstance = new Keyboard();