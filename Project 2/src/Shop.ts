// import { IItem } from 'types';
// import { TweenLite } from 'gsap';
// import { Game } from './game';
// import {playerInstance} from './player'
// import { ShopItem } from './shopItem'

// export class Shop extends PIXI.Container{
//     public items: ShopItem[];
//     public price: number;
//     private Game: Game;
//    //private playerInstance = playerInstance;

//     constructor(app: PIXI.Application, items: ShopItem[]){
//         super();

//         this.Game = new Game(app)
        
//         this.items = [];
//         items.forEach((item, index) => {
//             this.items.push(item);
//             this.addChild(item);
//             item.x = 250 * (index + 1);
//             item.y = app.screen.height * 0.25;
//             console.log(this.Game.currency)
//             item.on('itemBought', () => {
//                 if(playerInstance.currency >= item.price){
//                     this.emit('itemBought', item.name, item.price);
//                 }
//                 else{
//                     console.log('doihsd')
//                 }
//             });
//         });
//     }
// }