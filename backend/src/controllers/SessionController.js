const connection = require('../database/connection')

module.exports = {
    async create(request,response) {
        const { id } = request.body

        const res = await connection('ongs').select('name').where('id',id).first()

        if(!res) {
            return response.status(400).json({error: 'No ONG found with this ID'})
        }

        response.json(res)
    }
}