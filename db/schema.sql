DROP DATABASE IF EXISTS GrammagramDB;
CREATE DATABASE GrammagramDB;





USE animals_db;


CREATE TABLE users (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  
  authorId INTEGER(11),

  title VARCHAR(100),

  PRIMARY KEY (id)
);