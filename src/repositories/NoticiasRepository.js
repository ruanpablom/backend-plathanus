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

  async getNoticia(id) {
    return db.oneOrNone({
      name: 'get-noticia',
      text: `select n.id, n.titulo, n.texto, a.nome as autor_nome from noticias n
              join autores a on n.autor_id=a.id 
              where n.id =$1`,
      values: [id],
    });
  }

  async getAllNoticias() {
    return db.manyOrNone({
      name: 'get-all-noticias',
      text: `select n.id, n.titulo, n.texto, a.nome as autor_nome from noticias n
              join autores a on n.autor_id=a.id`,
      values: [],
    });
  }
}

export default new NoticiasRepository();
