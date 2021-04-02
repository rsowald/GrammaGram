DROP DATABASE IF EXISTS GrammagramDB;
CREATE DATABASE GrandmagramDB;





USE animals_db;


CREATE TABLE users (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,

  otherdata INTEGER(11),

  username VARCHAR(100),

  PRIMARY KEY (id)
);


CREATE TABLE posts (

  poster INTEGER(11) NOT NULL,

  id INTEGER(11) AUTO_INCREMENT NOT NULL,

  title VARCHAR(256),

  username VARCHAR(100),

  PRIMARY KEY (id)
);