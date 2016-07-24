CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  Item_ID INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(100) NOT NULL,
  DepartmentName VARCHAR(100) NOT NULL,
  Price DECIMAL(10,4) NULL,
  StockQuantity INT NULL,
  PRIMARY KEY (Item_ID)
);

SELECT * FROM products;