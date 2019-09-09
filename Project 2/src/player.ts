class playerData{
    public playerHealth: number = 4;
    public swordDamage: number = 1;
    public currency: number = 0;
    public score: number = 0;
    public attackPCT: number = 70;

    constructor(){

    }

    resetStats(){
        this.playerHealth = 4;
        this.swordDamage = 1;
        this.currency = 0;
        this.score = 0;
        this.attackPCT = 70;
    }
}

export const playerInstance = new playerData();