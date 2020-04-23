BEGIN;

-- CREATE DATABASE project_db;
-- CREATE USER super WITH SUPERUSER PASSWORD '123';
-- ALTER DATABASE project_db OWNER TO super;


DROP TABLE IF EXISTS sitters,reservations CASCADE;


CREATE TABLE sitters(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        starting_hour TIME NOT NULL,
                        end_hour TIME NOT NULL,
                        cost INTEGER NOT NULL
);


CREATE TABLE reservations(
                            id SERIAL PRIMARY KEY,
                            reservant_full_name VARCHAR(100) NOT NULL,
                            reservant_phone VARCHAR(15) NOT NULL,
                            starting_hour TIME NOT NULL,
                            end_hour TIME NOT NULL,
                            sitter_id INTEGER ,
                            is_reserved BOOLEAN DEFAULT true
--                             FOREIGN KEY(sitter_id) REFERENCES  sitters(id)
);


INSERT INTO sitters (name,starting_hour, end_hour, cost)
VALUES
       ('a', '7:00', '22:00', '50' ),
       ('b', '7:00', '22:00', '50' ),
       ('c', '7:00', '22:00', '50' ),
       ('d', '7:00', '22:00', '50' ),
       ('e', '7:00', '22:00', '50' ),
       ('f', '7:00', '22:00', '50' );


INSERT INTO reservations (reservant_full_name, reservant_phone, starting_hour, end_hour,sitter_id)
VALUES('Marwan Rizik', '050111111', '11:00', '13:00',2),
 ('Marwan Rizik', '050111111', '11:00', '13:00',8);



COMMIT;
