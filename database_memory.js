import { randomUUID } from "node:crypto"

export class DataBaseMemory {
    #cadastros = new Map ()

    list () {
        return Array.from(this.#cadastros.entries()).map ((cadastro_array) =>{
            const id = cadastro_array[0]
            const data = cadastro_array[1]

            return {
                id,
                data,
            }
        })
    }

    create (cadastro) {
        const cadastroId = randomUUID()

        this.#cadastros.set(cadastroId, cadastro)  
    }

    update(id, cadastro){
        this.#cadastros.set(id, cadastro)
    }

    delete (id){
        this.#cadastros.delete(id)
    }
}

//Criando um banco de dados em memória 