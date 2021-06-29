import { db } from '../config/dbConnection';

class AutorRepository {
  async inserirAutor(nome) {
    return db.oneOrNone({
      name: 'inserir-autor',
      text: `insert into autores (id, nome)
              values((SELECT uuid_in(md5(random()::text || now()::text)::cstring)), $1)
              returning id`,
      values: [nome],
    });
  }

  async todosAutores() {
    return db.manyOrNone({
      name: 'todos-autores',
      text: 'select * from autores',
      values: [],
    });
  }

  async getAutor(id) {
    return db.oneOrNone({
      name: 'get-autor',
      text: `select * from autores
              where id = $1`,
      values: [id],
    });
  }
}

export default new AutorRepository();
