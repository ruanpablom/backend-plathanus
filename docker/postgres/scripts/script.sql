-- public.autores definition

-- Drop table

-- DROP TABLE public.autores;

CREATE TABLE autores (
	id uuid NOT NULL,
	nome varchar(200) NULL,
	CONSTRAINT autor_pkey PRIMARY KEY (id)
);


-- public.noticias definition

-- Drop table

-- DROP TABLE public.noticias;

CREATE TABLE noticias (
	id uuid NOT NULL,
	titulo varchar(200) NOT NULL,
	texto text NOT NULL,
	autor_id uuid NOT NULL,
	CONSTRAINT noticias_pkey PRIMARY KEY (id),
	CONSTRAINT fk_autor FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE SET NULL
);