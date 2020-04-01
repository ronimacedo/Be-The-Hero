/* O que eu quero que seja feito */
exports.up = function(knex) {
   return knex.schema.createTable('incidents',(table) => {
        table.increments()

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()
        
        table.string('ong_id').notNullable()

        table.foreign('ong_id').references('id').inTable('ongs')
    })
  };
  
  
  /* O que eu quero voltar atras , deu algum problema */
  exports.down = function(knex) {
     return knex.schema.dropTable('incidents')
  };
  