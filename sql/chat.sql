DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id),
    message TEXT,
    posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
