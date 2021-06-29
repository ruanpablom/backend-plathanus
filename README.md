# Back-end desafio Plathanus

## Instruções
- Você precisa ter instalado em sua máquina o docker e docker-compose 
- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

## Docker
- Para incializar o ambiente docker, você deve navegar até a pasta docker do projeto(`cd docker`), rodar o comando `docker-compose build` e em seguida `docker-compose up`

## Database
- Para criar as tabelas da database:
 navegar até a pasta docker do projecto(`cd docker`)
 executar o comando: `docker-compose exec postgres bash`
 em seguida: `psql -U plathanus -d plathanus`
 depois: `\i /var/postgres/scripts/script.sql`
 pronto as tabelas da databse foram criadas

 ## Node
- dentro da pasta do projeto rodar: `npm install`
- para ambiente de dev: `npm run dev`
- build: `npm run build`
- depois de rodar o build você pode usar o script start: `npm start`