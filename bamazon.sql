DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE auctions(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(80) NOT NULL,
    price DECIMAL(13,4),
    stock_quantity, INT(10),
    PRIMARY KEY (item_id)
)