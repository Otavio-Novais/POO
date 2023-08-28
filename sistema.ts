import { Aluguel } from "./aluguel"
import { Bicicleta } from "./bicicleta"
import { Cliente } from "./cliente"
// ALUGUEL --> bike: Bicicleta, cliente: Cliente, tempo:number
// CLIENTE --> nome:string, telefone:string
// BICICLETA --> preco:number

export class Sistema
{
    alugueis: Aluguel[] = []
    bikes: Bicicleta[] = []
    clientes: Cliente[] = []
    private idx = -1
    private idx_bike = -1
    private idx_cliente = -1

    constructor()
    {}

    // Realizando um aluguel no sistema
    alugar(bike_alv: Bicicleta,cliente_alv: Cliente, tempo: number ): void
    {
        this.idx += 1
        var temp = new Aluguel(bike_alv, cliente_alv,tempo, this.idx)
        this.alugueis.push(temp)
    }

    // Validando se está dentro da validade
    validar(index_pessoa: number)
    {
        var data_atual =  new Date()
        if (data_atual == this.alugueis[index_pessoa].data_final || data_atual > this.alugueis[index_pessoa].data_final)
        {
            this.alugueis.splice(index_pessoa,1)
            this.alugueis[index_pessoa].bike.disponibilidade = true
        }
    }

    // Fazendo uma reserva dentro do sistema
    reservar(bike_alv: Bicicleta,cliente_alv: Cliente, tempo: number,dia: number, mes: number){
        var auxiliar: Date = new Date()

        if (auxiliar.getMonth() < mes)
        {
            bike_alv.disponibilidade = true
            var temp = new Aluguel(bike_alv, cliente_alv,tempo, this.idx)
            temp.reservar(dia, mes)
            this.idx += 1
            this.alugueis.push(temp)
        }
    }

    // Registrando no sistema um novo cliente
    registrar_cliente(nome: string, telefone:string)
    {
        this.idx_cliente += 1 
        this.clientes.push(new Cliente(nome, telefone, this.idx_cliente))
    }
    
    // Registrando no sistema uma nova bicicletra
    registrar_bicicleta(preco: number){
        this.idx_bike += 1
       this.bikes.push(new Bicicleta(preco, this.idx_bike)) 
    }

    
    // Imprimindo clientes
    print_clientes(){
        console.log(this.clientes)
    }

    // Imprimindo bicicletas
    print_bikes(){
        console.log(this.bikes)
    }
    
    
    // Imprimindo alugueis
    print_alugueis(){
        console.log(this.alugueis)
    }

}

// Criando nosso sistema como um objeto
const sist = new Sistema()

// Testing 'registrar_bicicleta' and 'registrar_cliente'
sist.registrar_bicicleta(1500)
sist.registrar_cliente('Otavio', '1799283123')

sist.registrar_bicicleta(1800)
sist.registrar_cliente('Gabi', '149124453')

sist.registrar_bicicleta(3000)
sist.registrar_cliente('Devair', '17998234231')
// End test


// Testing 'alugar'
sist.alugar(sist.bikes[0], sist.clientes[0], 20) //Bike, Cliente, Tempo
sist.alugar(sist.bikes[1], sist.clientes[1], 13)
// End test

// Testing 'print_...'
sist.print_bikes()
sist.print_clientes()
sist.print_alugueis()
// End test


// Testing 'reservar'
sist.reservar(sist.bikes[2], sist.clientes[2], 30, 10, 11) //Bike, Cliente, Tempo, Dia e mês inicial 
console.log(sist.alugueis[2])
// End test
