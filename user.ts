import { Hash } from "crypto";
import  bcrypt  from "bcrypt";


export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id?: string
    ) {
        this.password = this.crypting()
    }

    crypting(){
        const hash:string = bcrypt.hashSync(this.password, 12)
        return hash;
    }
}
