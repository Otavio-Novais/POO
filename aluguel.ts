import { Bicicleta } from "./bicicleta"
import { Cliente } from "./cliente"

export class Aluguel
{
    bike: Bicicleta
    cliente: Cliente
    tempo: number
    data_inicial: Date = new Date()
    //dia = this.data_inicial.getDate()
    //mes = this.data_inicial.getMonth()
    data_final: Date
    index: number = -1


    constructor(bike: Bicicleta, cliente: Cliente, tempo:number, index: number)
    {
        this.tempo = tempo
        this.data_final = new Date(this.data_inicial.getFullYear(), this.data_inicial.getMonth(), (this.data_inicial.getDate()+this.tempo))
        this.bike = bike
        this.bike.disponibilidade = false
        this.cliente = cliente
        this.index = index
    }

   reservar(dia: number,mes: number)
   {
    this.data_inicial.setDate(dia)
    this.data_inicial.setMonth(mes-1)
    this.data_final = new Date(this.data_inicial.getFullYear(), this.data_inicial.getMonth(), (this.data_inicial.getDate()+this.tempo))
   }
    
}
