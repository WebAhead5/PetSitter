BEGIN;

CREATE TABLE sitters(
    id SERIAL PRIMARY KEY,
    sitter_name VARCHAR(100) NOT NULL, 
    starting_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    cost INTEGER NOT NULL
);

CREATE TABLE reservation(
    id SERIAL PRIMARY KEY, 
    reservant_full_name VARCHAR(100) NOT NULL,
    reservant_phone VARCHAR(15) NOT NULL,
    starting_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    sitter_id INTEGER REFERENCES sitters(id)
);


INSERT INTO sitters (sitter_name,starting_hour, end_hour, cost) 
VALUES('Morad Abed', '11:30', '13:00', 100);


INSERT INTO reservation (reservant_full_name, reservant_phone, starting_hour, end_hour,sitter_id) 
VALUES('Marwan Rizik', '050111111', '11:30', '13:00'); 

COMMIT;