export class Bicicleta
{
    disponibilidade: boolean = true
    preco: number
    index: number

    constructor(preco:number, index: number)
    {
        this.preco = preco
        this.index = index
    }
}
