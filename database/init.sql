BEGIN;

DROP TABLE IF EXISTS users, users_posts, like_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  users_name VARCHAR(255) NOT NULL,
  password NVARCHAR(250)
);

CREATE TABLE users_posts (
  id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(id),
instrument_name VARCHAR(255),
  description TEXT,
  price Decimal,
  contact TEXT,
  imageUrl TEXT
);

CREATE TABLE like_posts (
      id SERIAL PRIMARY KEY,
users_id INTEGER REFERENCES users(id),
post_id INTEGER REFERENCES users_posts(id)

);

INSERT INTO users (user_name,password) VALUES
('abeer','1234')
('mervat','mervat1993')

INSERT INTO users_posts(users_id,instrument_name,description,price,contact,imageUrl) VALUES
 (1,'guitar','...','1000','public /image/guitar.jpg')
 (2,'piano','...','5000','public /image/51RXcPCEiSL._AC_SX425_.jpg')
 


 

 

INSERT INTO like_posts (users_id, post_id) VALUES 
(1,2);
(2,1)

COMMIT;
