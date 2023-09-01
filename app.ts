import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []


    // Register bike (Test Phase)
    // Remove User (Test Phase)
    // Rent Bike (Test Phase)
    // Return Bike 

    findUser(email: string): User | undefined
     {
        return this.users.find(user => user.email === email)
     }

     // Find User Index (Test Phase)
     findUserIndex(email: string): number
     {
        return this.users.findIndex(user => user.email === email)
     }

     // Remove User (Test Phase)
     removeUser(email: string): void
     {
        this.users.splice(this.findUserIndex(email),1)
     }

    registerUser(user: User): void
     {
        for (const rUser of this.users)
         {
            if (rUser.email === user.email)
             {
                throw new Error('Duplicate user.')
             }
         }
         user.id = crypto.randomUUID()
         this.users.push(user)
     }

     // Register Bike (Test Phase)
     registerBike(bike: Bike): string | undefined
     {
        for (const rBike of this.bikes)
         {
            if (rBike.name === bike.name)
             {
                throw new Error('Duplicate user.')
             }
         }
         bike.id = crypto.randomUUID()
         this.bikes.push(bike)
         return bike.id
     }

        // Rent Bike
    RentBike(bike_to_rent: Bike, user_to_rent: User, date_take: Date, date_to_return: Date)
    {
        this.rents.push(Rent.create(this.rents, bike_to_rent, user_to_rent, date_take, date_to_return))
        return bike_to_rent.id
    }


    // Find Rent Index

    // Return Bike (Test Phase)
    returnBike(id_bike: string | undefined, user: User)
    {
      
        var rentTo: Rent[] = []
        
        rentTo = this.rents.filter(rents => rents.bike.id == id_bike)
        rentTo = this.rents.filter(rents => rents.dateFrom <= new Date()) 
        rentTo[rentTo.findIndex(rent => rent.user == user)].dateReturned = new Date()
    }

}