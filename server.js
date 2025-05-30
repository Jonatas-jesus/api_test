import {fastify} from 'fastify'
import pkg, { Pool } from 'pg'
import {randomUUID, randowUUID} from 'node:crypto'
//import { DataBaseMemory } from './database_memory.js'

const { Pool } = pkg
const server = fastify()

//const database = new DataBaseMemory()

const pool = new Pool ({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'project_uni9',
    password: 'sua_senha',
    port: 5432,
})

server.post('/criar_usuarios', async (request, reply) => {      /*Post https://localhost3000/criar_usuarios vou estar criando uma conta nova no sistema*/
    const {title, description, username, password} = request.body
    const id = randomUUID()

    await pool.query(
        'INSERT INTO usuarios (id, title, description, username, password) VALUES ($1, $2, $3, $4, $5)',
        [id, title, description, username, password]
    )
    return reply.status(201).send()                   
})



server.get('/criar_usuarios', () => {       /*GET http://localhost3000/criar_usuarios vou estar puxando um usuário*/
    const criar_usuarios = database.list() 

    console.log(criar_usuarios)

    return criar_usuarios
})

server.put('/criar_usuarios/:cadastroId',  (request, reply) => {       /*PUT http://localhost3000/criar_usuarios vou estar atualizando meu "criar usarios"*/
    const cadastroId = request.params.cadastroId
    const {title, description, username, password} = request.body

    
    database.update(cadastroId, {
        title,
        description,
        username,
        password,
    })

    return reply.status(204).send()
})

server.delete('/criar_usuarios/:id', (request, reply) => {
    const cadastroId = request.params.id

    database.delete(cadastroId)

    return reply.status(204).send()
})

server.post('/login', async (request, reply) => {
    const {username, password} = request.body

    const users = database.list()

    const user = users.find(u => u.username === username && u.password == password)

    if(!user){
        return reply.status(401).send ({ message: 'Usuário ou senha inválidos'})
    }

    return reply.send({menssage: 'Login bem-sucedido', user})
})

server.listen({
    port: 3000,
})

