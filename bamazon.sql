DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_DB;

CREATE TABLE products(
    Item_ID INT NOT NULL AUTO_INCREMENT,
    Product_Name VARCHAR(100) NOT NULL,
    Department_Name VARCHAR(80) NOT NULL,
    Price DECIMAL(13,4),
    Stock_Quantity INTEGER(10),
    PRIMARY KEY (Item_ID)
);

SELECT * FROM products;