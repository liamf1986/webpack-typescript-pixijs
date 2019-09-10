import {weaponsList, IWeapon} from './weapons';

class Inventory{

    public ownedWeapons:IWeapon[] = [weaponsList["pistol"]];
    public selectedWeapon:IWeapon = weaponsList["pistol"];
    public money:number = 100;

    giveMoney(amount:number){
        this.money+=amount;
    }

    //query the inventory to check for an item
    checkFor(weapon:IWeapon){
        if(this.ownedWeapons.includes(weapon)){
            return true;
        }
        else{
            return false;
        }
    }

    //attempt to add a new unique weapon to the inventory.
    //returns true if weapon added succesfully
    //return false if weapon already exists in inventory
    buyWeapon(weapon:IWeapon){
        if ((!this.ownedWeapons.includes(weapon)) && (weapon.price<this.money)){
            this.ownedWeapons.push(weapon);
            this.money-=weapon.price;
            return true;
        }
        else{
            console.log("ERROR: Could not afford requested item")
            return false;
        }
    }

    buyKit(price:number){
        if(price<=this.money){
            this.money-=price;
            return true;
        }
        else {return false};
    }
    
    //swaps the equiped weapon to another owned weapon
    //returns true if swapped succesfully
    //returns false if weapon already held or not in inventory
    selectWeapon(weapon:IWeapon){
        if (this.ownedWeapons.includes(weapon)){
            this.selectedWeapon=weapon;
            console.log("Equiped weapon");
            return true;
        }
        else{
            console.log("Error: Attempted to swap to unowned weapon");
            return false;
        }
    }

    reset(){
        this.ownedWeapons= [weaponsList["pistol"]];
        this.selectedWeapon= weaponsList["pistol"];
        this.money= 100;
    }
}

export let inventory = new Inventory();
