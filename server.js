import {fastify} from 'fastify'
import pkg from 'pg'
import {randomUUID} from 'node:crypto'

const { Pool } = pkg
const server = fastify()

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'project_uni9',
    password: 'admin',
    port: 5432,
})

//POST - Criando um usuário
server.post('/criar_usuarios', async (request, reply) => {      /*Post https://localhost3000/criar_usuarios vou estar criando uma conta nova no sistema*/
    const {title, description, username, password} = request.body
    const id = randomUUID()

    await pool.query(
        'INSERT INTO usuarios (id, title, description, username, password) VALUES ($1, $2, $3, $4, $5)',
        [id, title, description, username, password]
    )
    return reply.status(201).send()                   
})

//GEt - Listando o usuário(s) que foram criados
server.get('/criar_usuarios', async () => {       /*GET http://localhost3000/criar_usuarios vou estar puxando um usuário*/
    const result = await pool.query('SELECT * FROM usuarios') 

    return result.rows
})

//PUT - Buscar po usuário específico para atualizações
server.put('/criar_usuarios/:cadastroId', async (request, reply) => {       /*PUT http://localhost3000/criar_usuarios vou estar atualizando meu "criar usarios"*/
    const cadastroId = request.params.cadastroId
    const {title, description, username, password} = request.body

    await pool.query(
        'UPDATE usuarios SET title = $1, description = $2, username = $3, password = $4 WHERE id = $5',
        [title, description, username, password, cadastroId]
    )

    return reply.status(204).send()
})

//DELETE - Apagar usuário específico
server.delete('/criar_usuarios/:id', async (request, reply) => {
    const cadastroId = request.params.id

    await pool.query('DELETE FROM usuarios WHERE id= $1', [cadastroId])

    return reply.status(204).send()
})

//POST - Efetuar login
server.post('/login', async (request, reply) => {
    const {username, password} = request.body

    const result = await pool.query(
        'SELECT * FROM usuarios WHERE username = $1 AND password = $2',
        [username, password]
    )

    const user = result.rows[0]

    if(!user){
        return reply.status(401).send ({ message: 'Usuário ou senha inválidos'})
    }

    return reply.send({menssage: 'Login bem-sucedido', user})
})

server.listen({
    port: 3000,
})