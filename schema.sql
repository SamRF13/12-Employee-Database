DROP DATABASE IF EXISTS employeesIndex_db;

CREATE DATABASE employeesIndex_db;

-- Makes it so all of the following code will affect inventory_db --
USE employeesIndex_db;

CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE role (

    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary  DECIMAL, 
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


CREATE TABLE employee (

    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)


);