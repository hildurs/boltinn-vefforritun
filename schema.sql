-- Table: public.entries

DROP TABLE public.entries;

CREATE TABLE public.entries
(
    id serial primary key,
    entry_date timestamp with time zone NOT NULL DEFAULT now(),
    entry_name character varying(45) COLLATE pg_catalog."default" NOT NULL,
    entry_topic_name character varying(45) COLLATE pg_catalog."default" NOT NULL,
    entry_data text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.entries
    OWNER to postgres;
