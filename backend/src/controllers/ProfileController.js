const connection = require('../database/connection')

module.exports = {
    async listar(request,response) {
        const ong_id = request.headers.authorization
        
        const res = await connection('incidents').select('*').where('ong_id',ong_id)
        response.json(res)
    }
}