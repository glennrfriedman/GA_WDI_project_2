DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS show_data;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE show_data (
  id SERIAL PRIMARY KEY,
  show_id VARCHAR(255),
  show_name VARCHAR(255),
  network_name VARCHAR(255),
  image VARCHAR(255),
  show_date VARCHAR(255),
  show_time VARCHAR(255),
  show_status VARCHAR(255),
  comments VARCHAR(255)
);

-- may need to come back and update show_date/show_time 
