-- Creation of restaurants table
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL,
  name varchar(55) NOT NULL,
  email varchar(55) NOT NULL,
  date DATE NOT NULL,
  city varchar(55) NOT NULL,
  country varchar(55) NOT NULL,
  PRIMARY KEY (id)
);

  INSERT INTO users(
	id, name, email, date, city, country)
	VALUES ('1', 'name', 'email@test.com', '2022-07-14', 'Montreal', 'Canada');