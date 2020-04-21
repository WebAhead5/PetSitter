BEGIN;

CREATE TABLE reservation(
    id SERIAL PRIMARY KEY,
    sitter_id INTEGER REFERENCES sitters(id), 
    reservant_full_name VARCHAR(100) NOT NULL,
    reservan_phone INTEGER(15) NOT NULL,
    starting_hour INTEGER ,
    end_hour INTEGER
)

COMMIT;