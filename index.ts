import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])

const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)
const user2 = new User('Maria Clara', 'maria@mail.com', '3123')

const app = new App()
app.registerUser(user)
app.registerBike(bike)
console.log(app.rents) 
//console.log(app.users)
//console.log(app.bikes)

const Id = app.RentBike(bike,user, today, sevenDaysFromToday)
//console.log(Id)
console.log(app.rents)
app.returnBike(Id, user)
console.log(app.rents)

//console.log(app.findUser('maria@mail.com'))
