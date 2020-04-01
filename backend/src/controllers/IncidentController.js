const connection = require('../database/connection')

module.exports = {
    async listar(request, response) {
        const { page = 1 } = request.query


        const [count] = await connection('incidents').count()

        const res = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'])



        response.header('X-Total-Count', count['count(*)'])
        response.json(res)
    },
    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id

        })

        response.json({ id })
    },
    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const res = await connection('incidents').select('ong_id').where('id', id).first()

        if (res.ong_id !== ong_id) {
            response.status(401).send({ error: 'Operation not permitted.' })
        }

        await connection('incidents').delete().where('id', id)
        response.status(204).send()
    }

}