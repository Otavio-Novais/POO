import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Crypt } from "./crypt";
import { Location } from "./location";
import crypto from 'crypto'


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt()


    findUser(email: string): User {
      return this.users.find(user => user.email === email)
  }


    findUserIndex(email: string): number
   {return this.users.findIndex(user => user.email === email)}

   
    removeUser(email: string): void
    {this.users.splice(this.findUserIndex(email),1)}

    async registerUser(user: User): Promise<string> {
      for (const rUser of this.users) {
          if (rUser.email === user.email) {
              throw new Error('Duplicate user.')
          }
      }
      const newId = crypto.randomUUID()
      user.id = newId
      const encryptedPassword = await this.crypt.encrypt(user.password)
      user.password = encryptedPassword
      this.users.push(user)
      return newId
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

    rentBike(bikeId: string, userEmail: string): void {
      const bike = this.bikes.find(bike => bike.id === bikeId)
      if (!bike) {
          throw new Error('Bike not found.')
      }
      if (!bike.available) {
          throw new Error('Unavailable bike.')
      }
      const user = this.findUser(userEmail)
      bike.available = false
      const newRent = new Rent(bike, user, new Date())
      this.rents.push(newRent)
  }


    returnBike(id_bike: string, userEmail: string): number
    {
      const now = new Date()
      const rent = this.rents.find(rent =>
          rent.bike.id === id_bike &&
          rent.user.email === userEmail &&
          !rent.end
      )
      if (!rent) throw new Error('Rent not found.')
      rent.end = now
      rent.bike.available = true
      const hours = diffHours(rent.end, rent.start)
      return hours * rent.bike.rate
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

    async authenticateUser(userEmail: string, userPassword:string): Promise<boolean>{
      const specificUser = this.users.find(user => user.email == userEmail)
      if(!specificUser){
        throw new Error ("User not finded")
      }
      return await this.crypt.compare(userPassword, specificUser.password)
    }

    moveBikeTo(bikeId: string, location: Location) {
      const bike = this.bikes.find(bike => bike.id === bikeId)
      if(!bike) return Error 
      bike.location.latitude = location.latitude
      bike.location.longitude = location.longitude
  }



}

function diffHours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}
