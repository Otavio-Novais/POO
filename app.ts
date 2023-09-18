import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';
import bcrypt, { hash } from "bcrypt";


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []


    findUser(email: string): User | undefined
   {return this.users.find(user => user.email === email)}


    findUserIndex(email: string): number
   {return this.users.findIndex(user => user.email === email)}

   
    removeUser(email: string): void
    {this.users.splice(this.findUserIndex(email),1)}

    registerUser(user: User)
    {
      for (const rUser of this.users)
        {
          if (rUser.email === user.email)
          {throw new Error('Duplicate user.')}
        }

      user.id = crypto.randomUUID()
      this.users.push(user)
      return user.id
    }


    registerBike(bike: Bike): string | undefined
    {
      for (const rBike of this.bikes)
        {
          if (rBike.name === bike.name)
          {throw new Error('Duplicate bike.')}
        }
      bike.id = crypto.randomUUID()
      this.bikes.push(bike)
      return bike.id
    }

    RentBike(bike_to_rent: Bike, user_to_rent: User, date_take: Date, date_to_return: Date)
    {
      this.rents.push(Rent.create(this.rents, bike_to_rent, user_to_rent, date_take, date_to_return))
      return bike_to_rent.id
    }


    returnBike(id_bike: string | undefined, user: User)
    {
      var rentTo: Rent[] = []
        
      rentTo = this.rents.filter(rents => rents.bike.id == id_bike)
      rentTo = this.rents.filter(rents => rents.dateFrom <= new Date()) 
      rentTo[rentTo.findIndex(rent => rent.user == user)].dateReturned = new Date()
    }

    printBikes():void
    {
      console.log("Listing Bikes:")
      var i: number = 0
      for (const element of this.bikes)
      {
        i += 1
        console.log("%d - %o", i, element)
      }
    }
    
    printRents(): void
    {
      console.log("Listing rents:")
      var i: number = 0
      for (const element of this.rents)
      {
        i += 1
        console.log("%d - %o", i, element)
      }
    }

    printUsers(): void
    {
      console.log("Listing Users:")
      var i: number = 0
      for (const element of this.users)
      {
        i += 1
        console.log("%d - %o", i, element)
      }

    }

    async authenticateUser(userId: string, userPassword:string){
      const specificUser = this.users.filter(user => user.id == userId)
      if (await bcrypt.compare(userPassword, specificUser[0].password) == true){
         console.log("Authenticated user!")
         return
      }
      console.log('Unauthenticated user!')
      return
    }

    async LocateBike(bike: Bike){
      bike.lastLocation = await bike.Location()
      console.log(bike.lastLocation)
    }


}
