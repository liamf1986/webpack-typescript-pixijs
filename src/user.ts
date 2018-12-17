export class User {
    private _username: string;
    private _title: string;
    private _forename: string;
    private _surname: string;

    //private _balancePounds: number;
    private _balancePennies: number;

    private _lastStakeId: number;

    constructor(username: string, title: string, forename: string, surname: string) {
        this._username = username;
        this._title = title;
        this._forename = forename;
        this._surname = surname;

        //this._balancePounds = 0;
        this._balancePennies = 0;

        this._lastStakeId = 0;
    }

    get fullName() : string {
        return this._title + " " + this._forename + " " + this._surname;
    }

    get forename() : string {
        return this._forename;
    }

    get surname() : string {
        return this._surname;
    }

    get username() : string {
        return this._username;
    }

    get balanceString() : string {
        /* let balanceString = '';
        if (this._balancePounds > 0) {
            balanceString += '£' + this._balancePounds;
            if (this._balancePennies > 0) {
                balanceString += '.' + this._balancePennies;
            }
        }
        else {
            balanceString += this._balancePennies + 'p';
        }
        return balanceString; */

        let balanceString = '';

        balanceString = '£' + (this._balancePennies / 100).toFixed(2);

        return balanceString;
    }

    /* get balancePounds() : number {
        return this._balancePounds;
    } */

    get balancePennies() : number {
        return this._balancePennies;
    }

    /* set balancePounds(val : number) {
        this._balancePounds = val;
    } */

    set balancePennies(val : number) {
        this._balancePennies = val;
    }

    get lastStakeId() : number {
        return this._lastStakeId;
    }

    set lastStakeId(id: number) {
        this._lastStakeId = id;
    }
}

// A user account exported for testing
const testUser : User = new User('testUser', 'dr', 'testy', 'testington');
testUser.balancePennies = 3000;
testUser.lastStakeId = 2;
export default testUser;