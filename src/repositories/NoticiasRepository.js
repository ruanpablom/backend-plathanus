import { db } from '../config/dbConnection';

class NoticiasRepository {
  async inserirNoticia(titulo, texto, autorId) {
    return db.oneOrNone({
      name: 'inserir-noticia',
      text: `insert into noticias (id, titulo, texto, autor_id)
              values((SELECT uuid_in(md5(random()::text || now()::text)::cstring)), $1, $2, $3)`,
      values: [titulo, texto, autorId],
    });
  }

  async updateNoticia(id, titulo, texto, autorId) {
    return db.oneOrNone({
      name: 'update-noticia',
      text: `update noticias 
              set titulo=$2, texto=$3, autor_id=$4
              where id=$1`,
      values: [id, titulo, texto, autorId],
    });
  }

  async getNoticia(id) {
    return db.oneOrNone({
      name: 'get-noticia',
      text: `select n.id, n.titulo, n.texto, json_build_object('id', a.id, 'nome', a.nome) as autor from noticias n
              join autores a on n.autor_id=a.id 
              where n.id =$1`,
      values: [id],
    });
  }

  async getAllNoticias() {
    return db.manyOrNone({
      name: 'get-all-noticias',
      text: `select n.id, n.titulo, n.texto, json_build_object('id', a.id, 'nome', a.nome) as autor from noticias n
              join autores a on n.autor_id=a.id`,
      values: [],
    });
  }

  async filterNoticias(filter) {
    return db.manyOrNone({
      text: `select n.id, n.titulo, n.texto, json_build_object('id', a.id, 'nome', a.nome) as autor from noticias n
              join autores a on n.autor_id=a.id
              where n.titulo ilike '%${filter}%'
              or n.texto ilike '%${filter}%'
              or a.nome ilike '%${filter}%'`,
    });
  }

  async deleteNoticia(id) {
    return db.oneOrNone({
      name: 'delete-noticia',
      text: `delete from noticias
              where id=$1`,
      values: [id],
    });
  }
}

export default new NoticiasRepository();
