const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')


module.exports = {
    async listar(request, response) {
        const res = await connection('ongs').select('*')

        response.json(res)
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body

        const id =  generateUniqueId()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        response.json({ id })
    }


}

