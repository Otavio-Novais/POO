import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import Sinon from "sinon";

async function main(){
        const clock = Sinon.useFakeTimers();
        const app = new App()
        const user1 = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user1)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        console.log('Bike disponível: ', bike.available)
        app.rentBike(bike.id, user1.email)
        console.log('Bike disponível: ', bike.available)
        clock.tick(1000 * 60 * 65)
        console.log(app.returnBike(bike.id, user1.email))
        console.log('Bike disponível: ', bike.available)

/*
/*  Testing encrypiting Function 
console.log(Id)
*/

/*  Testing Listing
//Listing bikes, rents and users
app.printBikes()
app.printRents()
app.printUsers()



//    Testing authenticated Function
// Authenticated user
app.authenticateUser(user1.email, '1234')

//  Unauthenticated user
app.authenticateUser(user1.email, '12345')

// OBS: OBSERVE THAT THIS FUNCTION ('authenticateUser') IS ASYNCHRONOUS. THERE MIGHT BE SOME ERRORS WHEN USING THEM TOGETHER
*/

/*   Testing Locate Function 
// Getting the location of the bike
app.LocateBike(bike) // Localize and store the information in lastLocation

// OBSERVE THAT THIS FUNCTION IS ASYNCHRONOUS. THERE MIGHT BE SOME ERRORS WHEN TRYING TO ACESS THE INFO 'lastLocation'

*/

}

main()

