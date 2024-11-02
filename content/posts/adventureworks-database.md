---
date: 2023-01-22 19:20:00 +0800
title: "Adventure Works Database Management"
categories:
  - Database Management
  - RDBMS
pin: false
render_with_liquid: false
tags:
  - MySQL
includes_code: yes
includes_math: yes
---

This article showcases a project on managing big data using MySQL Workbench, focusing on the Adventure Works dataset. The project involves constructing a relational database system and performing data analysis queries using SQL.

{{< notice note "Note" >}}
The Python source code used in creating the database in Python is available in this [Github-repo](https://github.com/ahmedsalim3/AdventureWorks-Database).
The Adventure Works dump database is free to download from [**here**](https://raw.githubusercontent.com/ahmedsalim3/public-data/refs/heads/main/adventureworks/rdbms/AdventureWorks-DumpDatabase.sql), and the SQL query scripts used can be found [**here**](https://raw.githubusercontent.com/ahmedsalim3/public-data/refs/heads/main/adventureworks/rdbms/AdventureWorks-Scripts.sql).
{{< /notice >}}

## Data Source

The Adventure Works dataset was obtained from [Kaggle][data-source], an open-source platform that provides a large number of datasets and challenges for users to work on. This dataset consists of ten different tables stored in `.csv` format and includes information on 18000 customers. Both women and men are involved in purchasing the company’s products, and each customer’s data includes their personal information such as customer key, first name, last name, email address, and annual income.

The dataset also includes products and their subcategories, featuring different brands of bikes categorized into four groups: bikes, components, clothing, and accessories. The company manufactures its own components, accessories, and clothing, but the primary products of Adventure Works are bikes, including mountain, road, and touring bikes.

Additionally, the dataset contains more than 56000 sales records stored in separate tables, covering the years 2015, 2016, and 2017. Other tables hold information on returned orders and shipping territories.

## Data Cleaning and Schema Setup

After gathering the data, the first step was data cleaning to prepare the dataset for building the AdventureWorks Database Schema. Although the data was mostly cleaned, we still did a few processing steps in Excel to ensure everything was in order. These steps included:

1. **Ensuring Correct Data Types**: We double-checked that all columns had the correct data types, particularly for MySQL's DATE format. For instance, columns containing dates were converted from the US format `MM-DD-YYYY` to the standard `YYYY-MM-DD` format, making it compatible with MySQL.

2. **Removing Special Characters**: Special characters and symbols, like the `$` sign in the `Annual Income` column, were removed. This was essential to ensure that columns expected to hold integers could do so properly. This will also allow us to run statistical queries and sort the data efficiently.

3. **Ensuring Unique Primary Keys**: We validated the uniqueness of primary keys. For example, we found some duplicate `OrderNumbers` in the sales tables, which would prevent us from using the column as a primary key. In such cases, we made sure to rename or remove duplicates to maintain data integrity and avoid issues during the database creation process.

The cleaned datasets are available for download [here][clean-data].

Once data cleaning was completed, we moved on to creating the Adventure Works Database Schema and importing the table data. However, before importing, it was essential to define the databases and tables with the appropriate data types.

The SQL queries for defining the database and its entities are available [here][schema.sql]. We used data types such as `DATE` for date fields, `VARCHAR` for variable character fields, and `INT` and `DECIMAL` for numerical data.

```sql
/*CREATE THE DATABASE AdventureWorks*/
DROP DATABASE IF EXISTS adventureworks;
CREATE DATABASE AdventureWorks;

/*Use Database*/
USE AdventureWorks;

/* Table structure for the calendar */
DROP TABLE IF EXISTS `calendar`;
CREATE TABLE `calendar` (
  `OrderDate` DATE NOT NULL,
  PRIMARY KEY (`OrderDate`)
);

/* Table structure for the customers */
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `CustomerKey` INT NOT NULL,
  `Prefix` VARCHAR(100) NOT NULL,
  `FirstName` VARCHAR(100) NOT NULL,
  `LastName` VARCHAR(100) NOT NULL,
  `BirthDate` DATE NOT NULL,
  `MaritalStatus` VARCHAR(100) NOT NULL,
  `Gender` VARCHAR(100) NOT NULL,
  `EmailAddress` VARCHAR(100) NOT NULL,
  `AnnualIncome` INT NOT NULL,
  `TotalChildren` INT NOT NULL,
  `EducationLevel` VARCHAR(100) NOT NULL,
  `Occupation` VARCHAR(100) NOT NULL,
  `HomeOwner` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`CustomerKey`)
);

/* Table structure for product categories */
DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories` (
  `ProductCategoryKey` INT NOT NULL,
  `CategoryName` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`ProductCategoryKey`)
);

/* Table structure for product subcategories */
DROP TABLE IF EXISTS `product_subcategories`;
CREATE TABLE `product_subcategories` (
  `ProductSubcategoryKey` INT NOT NULL,
  `SubcategoryName` VARCHAR(100) NOT NULL,
  `ProductCategoryKey` INT NOT NULL,
  PRIMARY KEY (`ProductSubcategoryKey`),
  KEY `ProductCategoryKey` (`ProductCategoryKey`),
  CONSTRAINT `product_subcategories_ibfk_1` FOREIGN KEY (`ProductCategoryKey`) REFERENCES `product_categories` (`ProductCategoryKey`)
); 

/* Table structure for products */
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `ProductKey` INT NOT NULL,
  `ProductSubcategoryKey` INT NOT NULL,
  `ProductSKU` VARCHAR(100) NOT NULL,
  `ProductName` VARCHAR(100) NOT NULL,
  `ModelName` VARCHAR(100) NOT NULL,
  `ProductDescription` VARCHAR(250) NOT NULL,
  `ProductColor` VARCHAR(100) NOT NULL,
  `ProductSize` VARCHAR(100) NOT NULL,
  `ProductStyle` VARCHAR(100) NOT NULL,
  `ProductCost` DECIMAL(10,4) NOT NULL,
  `ProductPrice` DECIMAL(10,4) NOT NULL,
  PRIMARY KEY (`ProductKey`),
  KEY `ProductSubcategoryKey` (`ProductSubcategoryKey`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`ProductSubcategoryKey`) REFERENCES `product_subcategories` (`ProductSubcategoryKey`)
);

/* Table structure for territories */
DROP TABLE IF EXISTS `territories`;
CREATE TABLE `territories` (
  `TerritoryKey` INT NOT NULL,
  `Region` VARCHAR(100) NOT NULL,
  `Country` VARCHAR(100) NOT NULL,
  `Continent` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`TerritoryKey`)
);

/* Table structure for returns */
DROP TABLE IF EXISTS `returns`;
CREATE TABLE `returns` (
  `ReturnDate` DATE NOT NULL,
  `TerritoryKey` INT NOT NULL,
  `ProductKey` INT NOT NULL,
  `ReturnQuantity` INT NOT NULL,
  KEY `ProductKey` (`ProductKey`),
  KEY `TerritoryKey` (`TerritoryKey`),
  CONSTRAINT `returns_ibfk_1` FOREIGN KEY (`ProductKey`) REFERENCES `products` (`ProductKey`),
  CONSTRAINT `returns_ibfk_2` FOREIGN KEY (`TerritoryKey`) REFERENCES `territories` (`TerritoryKey`)
);

/* Table structure for sales in 2015 */
DROP TABLE IF EXISTS `sales_2015`;
CREATE TABLE `sales_2015` (
  `OrderDate` DATE NOT NULL,
  `StockDate` DATE NOT NULL,
  `OrderNumber` VARCHAR(100) NOT NULL,
  `ProductKey` INT NOT NULL,
  `CustomerKey` INT NOT NULL,
  `TerritoryKey` INT NOT NULL,
  `OrderLineItem` INT NOT NULL,
  `OrderQuantity` INT NOT NULL,
  PRIMARY KEY (`OrderNumber`),
  KEY `ProductKey` (`ProductKey`),
  KEY `CustomerKey` (`CustomerKey`),
  KEY `TerritoryKey` (`TerritoryKey`),
  KEY `OrderDate` (`OrderDate`),
  CONSTRAINT `sales_2015_ibfk_1` FOREIGN KEY (`ProductKey`) REFERENCES `products` (`ProductKey`),
  CONSTRAINT `sales_2015_ibfk_2` FOREIGN KEY (`CustomerKey`) REFERENCES `customers` (`CustomerKey`),
  CONSTRAINT `sales_2015_ibfk_3` FOREIGN KEY (`TerritoryKey`) REFERENCES `territories` (`TerritoryKey`),
  CONSTRAINT `sales_2015_ibfk_4` FOREIGN KEY (`OrderDate`) REFERENCES `calendar` (`OrderDate`)
);

/* Table structure for sales in 2016 */
DROP TABLE IF EXISTS `sales_2016`;
CREATE TABLE `sales_2016` (
  `OrderDate` DATE NOT NULL,
  `StockDate` DATE NOT NULL,
  `OrderNumber` VARCHAR(100) NOT NULL,
  `ProductKey` INT NOT NULL,
  `CustomerKey` INT NOT NULL,
  `TerritoryKey` INT NOT NULL,
  `OrderLineItem` INT NOT NULL,
  `OrderQuantity` INT NOT NULL,
  PRIMARY KEY (`OrderNumber`),
  KEY `ProductKey` (`ProductKey`),
  KEY `CustomerKey` (`CustomerKey`),
  KEY `TerritoryKey` (`TerritoryKey`),
  KEY `OrderDate` (`OrderDate`),
  CONSTRAINT `sales_2016_ibfk_1` FOREIGN KEY (`ProductKey`) REFERENCES `products` (`ProductKey`),
  CONSTRAINT `sales_2016_ibfk_2` FOREIGN KEY (`CustomerKey`) REFERENCES `customers` (`CustomerKey`),
  CONSTRAINT `sales_2016_ibfk_3` FOREIGN KEY (`TerritoryKey`) REFERENCES `territories` (`TerritoryKey`),
  CONSTRAINT `sales_2016_ibfk_4` FOREIGN KEY (`OrderDate`) REFERENCES `calendar` (`OrderDate`)
);

/* Table structure for sales in 2017 */
DROP TABLE IF EXISTS `sales_2017`;
CREATE TABLE `sales_2017` (
  `OrderDate` DATE NOT NULL,
  `StockDate` DATE NOT NULL,
  `OrderNumber` VARCHAR(100) NOT NULL,
  `ProductKey` INT NOT NULL,
  `CustomerKey` INT NOT NULL,
  `TerritoryKey` INT NOT NULL,
  `OrderLineItem` INT NOT NULL,
  `OrderQuantity` INT NOT NULL,
  PRIMARY KEY (`OrderNumber`),
  KEY `ProductKey` (`ProductKey`),
  KEY `CustomerKey` (`CustomerKey`),
  KEY `TerritoryKey` (`TerritoryKey`),
  KEY `OrderDate` (`OrderDate`),
  CONSTRAINT `sales_2017_ibfk_1` FOREIGN KEY (`ProductKey`) REFERENCES `products` (`ProductKey`),
  CONSTRAINT `sales_2017_ibfk_2` FOREIGN KEY (`CustomerKey`) REFERENCES `customers` (`CustomerKey`),
  CONSTRAINT `sales_2017_ibfk_3` FOREIGN KEY (`TerritoryKey`) REFERENCES `territories` (`TerritoryKey`),
  CONSTRAINT `sales_2017_ibfk_4` FOREIGN KEY (`OrderDate`) REFERENCES `calendar` (`OrderDate`)
);
```

## Database Setup and Import with Python

There are various methods for importing data into MySQL Workbench, such as the MySQL Workbench [Data Import Wizard][data-import-wizard], which supports `CSV` and `JSON` files. However, this approach can be extremely slow and may fail due to the large volume of data or errors. As an alternative, the [Load Data Infile][load-data-statement] statement can be used for handling huge datasets more efficiently. Converting `CSV` files to `JSON` format might also streamline this process.

However, an even more flexible and automated approach is to use Python with the MySQLdb library. This method allows for better control over the import process, ensuring faster and more reliable bulk data transfers. In this section, I will guide you through a Python class designed to automate the database setup and data import, significantly reducing the manual effort required for handling large datasets.

To follow along, you'll need to have MySQL installed on your system. For Linux users, you can check out this [short blog](../install-mysql-on-linux) for installation instructions.

Below is a Python script that sets up the Adventure Works database schema and imports data from CSV files into MySQL tables.

```python
from tqdm import tqdm
import csv
import MySQLdb

class MySQLDatabaseManager:
    def __init__(self, db_config):
        self.db_config = db_config

    def Setup(self, script_path):
        """
        Executes an SQL script to set up the database and tables
        """
        conn = MySQLdb.connect(
            host=self.db_config["host"],
            user=self.db_config["user"],
            password=self.db_config["password"],
            port=self.db_config.get("port", 3306)
        )
        cursor = conn.cursor()
        cursor.execute(f"DROP DATABASE IF EXISTS {self.db_config['database']}")
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {self.db_config['database']}")
        cursor.execute(f"USE {self.db_config['database']}")

        with open(script_path, 'r') as file:
            sql_script = file.read()
        
        for statement in sql_script.split(';'):
            if statement.strip():
                cursor.execute(statement)
        
        conn.commit()
        print(f"{db_config['database']} Database schema was setup successfully!")
        cursor.close()
        conn.close()

    def Importer(self, csv_file_path, table_name):

        conn = MySQLdb.connect(
            host=self.db_config.get("host"),
            user=self.db_config.get("user"),
            password=self.db_config.get("password"),
            database=self.db_config.get("database"),
            port=self.db_config.get("port", 3306)
        )
        cursor = conn.cursor()

        with open(csv_file_path, 'r', encoding='ISO-8859-1') as csv_file:
            csv_data = csv.DictReader(csv_file)
            columns = csv_data.fieldnames
            column_placeholders = ', '.join(['%s'] * len(columns))

            sql = f"""
            INSERT INTO {table_name} ({', '.join(columns)})
            VALUES ({column_placeholders})
            """

            print(f'Importing the CSV file: {csv_file_path}')

            for row in tqdm(csv_data):
                values = [row.get(column) for column in columns]
                cursor.execute(sql, values)

        conn.commit()
        cursor.close()
        conn.close()
        
# Example usage        
if __name__ == "__main__":
    db_config = {
        "host": "127.0.0.1",
        "user": "your_username",
        "password": "your_password",
        "database": "adventureworks",
        "port": 3306
    }

    db_manager = MySQLDatabaseManager(db_config)
    db_manager.Setup('rdbms/schema.sql')
    db_manager.Importer('data/AdventureWorks_Customers.csv', 'customers')
    db_manager.Importer('data/AdventureWorks_Calendar.csv', 'calendar')
    db_manager.Importer('data/AdventureWorks_Product_Categories.csv', 'product_categories')
    db_manager.Importer('data/AdventureWorks_Product_Subcategories.csv', 'product_subcategories')
    db_manager.Importer('data/AdventureWorks_Products.csv', 'products')
    db_manager.Importer('data/AdventureWorks_Territories.csv', 'territories')
    db_manager.Importer('data/AdventureWorks_Returns.csv', 'returns')
    db_manager.Importer('data/AdventureWorks_Sales_2015.csv', 'sales_2015')
    db_manager.Importer('data/AdventureWorks_Sales_2016.csv', 'sales_2016')
    db_manager.Importer('data/AdventureWorks_Sales_2017.csv', 'sales_2017')
```

{{< notice tip "Note" >}} Replace **your_username** and **your_password** with your MySQL credentials. Make sure to repeat the importer method for each CSV file if you're importing multiple files. {{< /notice >}}

This Python script automates two key processes:

* **setup()**: Executes an SQL script to create the [Adventure Works database schema](#data-cleaning-and-schema-setup), ensuring all tables are properly defined before importing data.
* **importer()**: Populates the tables with data from [CSV files][clean-data]. It dynamically reads the column names from each CSV file and maps them to the corresponding table in MySQL.

The `tqdm` library enhances the user experience by displaying a progress bar during the import process, especially useful for large datasets, the output of the script is shown below:

{{< figure src="/posts/adventureworks-database/csv2mysql.png" alt="Output from MySQLDatabaseManager class" caption="Output from MySQLDatabaseManager class" width="100%" class="right" >}}

{{< notice tip "Note" >}} We can also dump and export the database into a directory using the command line. {{< /notice >}}

```sh
cd rdbms/
mysqldump --skip-extended-insert --compact -u root -p adventureworks > DUMP_adventureworks.sql
```

## MySQL Workbench

After creating the database, we can access it using tools like [MySQL Workbench][mysql-workbench], [phpMyAdmin][php-my-admin], or others. For this project, we utilized MySQL Workbench to analyze our SQL queries effectively.

### Entity Relationship Diagram (ERD)

The schema of the Adventure Works Database incorporates various attributes that define the relationships among different entities. The ERD below visualizes these relationships, offering a comprehensive view of the database structure. It illustrates the relational schema, which consists of ten tables: `customers` , `products` , `product_subcategories` , `product_categories` , `calendar` , `territories` , `sales_2015` , `sales_2016` , `sales_2017` , and `returns` .

In the ERD:

* **Primary Keys (PK)** are represented by a golden key symbol.
* **Foreign Keys (FK)** are depicted as a red rhombus.

{{< figure src="/posts/adventureworks-database/AdventureWorks-Schema.png" alt="Entity Relationship Diagram" caption="Entity Relationship Diagram" width="100%" class="right" >}}

### Statistical & Analysis queries

To gain deeper insights into the dataset, we performed several statistical and analysis queries. These queries help us understand various aspects of the data, such as counts, averages, medians, and means. Below are examples of the queries used for our analysis:

```sql
-- 1/ COUNT all sales in each year
SELECT '2015' AS Year, COUNT(*) AS Total_Sales FROM sales_2015
UNION ALL
SELECT '2016' AS Year, COUNT(*) AS Total_Sales FROM sales_2016
UNION ALL
SELECT '2017' AS Year, COUNT(*) AS Total_Sales FROM sales_2017;
```

{{< figure src="/posts/adventureworks-database/img2.png" alt="staistical queries 1" caption="staistical queries 1" width="20%" class="right" >}}

```sql
-- 2/ MAX return quantity in each year
SELECT '2015' AS Year, SUM(ReturnQuantity) AS Total_Returns FROM returns
WHERE ReturnDate BETWEEN '2015-01-01' AND '2015-12-31' 
UNION ALL
SELECT '2016' AS Year, SUM(ReturnQuantity) AS Total_Returns FROM returns
WHERE ReturnDate BETWEEN '2016-01-01' AND '2016-12-31' 
UNION ALL 
SELECT '2017' AS Year, SUM(ReturnQuantity) AS Total_Returns FROM returns
WHERE ReturnDate BETWEEN '2017-01-01' AND '2017-12-31';
```

{{< figure src="/posts/adventureworks-database/img3.png" alt="staistical queries 2" caption="staistical queries 2" width="20%" class="right" >}}

```sql
-- 3/ Calculate the average age of all customers
SELECT AVG(EXTRACT( YEAR FROM DATE('2023-01-17')) - (EXTRACT(YEAR FROM BirthDate))) AS average_age
FROM customers;
```

{{< figure src="/posts/adventureworks-database/img4.png" alt="staistical queries 3" caption="staistical queries 3" width="20%" class="right" >}}

```sql
-- 4/ Find minimum product profit
SELECT products.ProductName, ProductPrice - ProductCost as profit
FROM products
WHERE (ProductPrice - ProductCost) = (SELECT MIN(ProductPrice - ProductCost) FROM products);
```

{{< figure src="/posts/adventureworks-database/img5.png" alt="staistical queries 4" caption="staistical queries 4" width="30%" class="right" >}}

### Data Analysis SQL Queries

**Question 1:** Find all the products and identify them by their unique key values in ascending order.

```sql
SELECT * FROM products ORDER BY ProductKey ASC;
```

{{< figure src="/posts/adventureworks-database/img6.png" alt="Output from Question 1" caption="Output from Question 1" width="100%" class="right" >}}

**Question 2:** Find all the products profit and identify them by their names in ascending order.

```sql
SELECT ProductName, ProductCost, ProductPrice, 
ProductPrice-ProductCost AS Profit
FROM products ORDER BY profit DESC;
```

{{< figure src="/posts/adventureworks-database/img7.png" alt="Output from Question 2" caption="Output from Question 2" width="50%" class="right" >}}

**Question 3:** Find the 10 most expensive products in descending order.

```sql
SELECT ProductName, ProductPrice FROM products
ORDER BY ProductPrice DESC LIMIT 10;
```

{{< figure src="/posts/adventureworks-database/img8.png" alt="Output from Question 3" caption="Output from Question 3" width="50%" class="right" >}}

**Question 4:** Find the 10 cheapest products in ascending order:

```sql
 SELECT ProductName, ProductPrice FROM products
 ORDER BY ProductPrice ASC LIMIT 10;
```

{{< figure src="/posts/adventureworks-database/img9.png" alt="Output from Question 4" caption="Output from Question 4" width="50%" class="right" >}}

**Question 5:** Find the average price from products and products  greater than the average:

```sql
SELECT  ProductName, ProductPrice FROM products
HAVING ProductPrice >  (SELECT
 AVG(ProductPrice) FROM products)
ORDER BY ProductPrice ASC;
```

{{< figure src="/posts/adventureworks-database/img10.png" alt="Output from Question 5" caption="Output from Question 5" width="50%" class="right" >}}

**Question 6:** List all products whose size is medium, red in color and the product cost less than 800:

```sql
 SELECT ProductKey, ProductName,
 ProductSize,
 ProductColor, ProductCost
 FROM products
 WHERE ProductSize > 20 
 AND ProductColor='red' 
 AND ProductCost < 800;
 ```

{{< figure src="/posts/adventureworks-database/img11.png" alt="Output from Question 6" caption="Output from Question 6" width="50%" class="right" >}}

**Question 7:** List all products based on subcategories:

```sql
SELECT ProductKey, ProductName, subcategoryName
FROM products
JOIN product_subcategories 
ON products.ProductSubcategoryKey
=product_subcategories.ProductSubcategoryKey;
```

{{< figure src="/posts/adventureworks-database/img12.png" alt="Output from Question 7" caption="Output from Question 7" width="50%" class="right" >}}

**Question 8:** List all customers who owns house by gender by DESC order of Annual Income:

```sql
SELECT gender, FirstName, LastName, 
AnnualIncome, HomeOwner
FROM customers
WHERE HomeOwner = 'Y'
ORDER BY AnnualIncome DESC;
```

{{< figure src="/posts/adventureworks-database/img13.png" alt="Output from Question 8" caption="Output from Question 8" width="50%" class="right" >}}

**Question 9:** Find married customers that own a house and their occupation by ascending  order of birth date:

```sql
SELECT FirstName,BirthDate, MaritalStatus,
EducationLevel, Occupation
FROM customers 
WHERE MaritalStatus= 'm' 
AND HomeOwner ='Y'
ORDER BY BirthDate ASC;
```

{{< figure src="/posts/adventureworks-database/img14.png" alt="Output from Question 9" caption="Output from Question 9" width="50%" class="right" >}}

**Question 10:** Find customers that are single and whose annual income is greater than 50, 000 in ascending order:

```sql
SELECT FirstName, LastName,
MaritalStatus, AnnualIncome 
FROM customers
WHERE MaritalStatus='s' AND
AnnualIncome > 50000 
ORDER BY AnnualIncome ASC;
```

{{< figure src="/posts/adventureworks-database/img15.png" alt="Output from Question 10" caption="Output from Question 10" width="50%" class="right" >}}

**Question 11:** Among the female customers who are married, find the ones that have houses and their annual income is greater than average income:

```sql
SELECT CustomerKey, FirstName,
LastName, MaritalStatus,gender, HomeOwner, AnnualIncome
FROM customers
WHERE MaritalStatus = 'M' 
AND gender = 'F' 
AND HomeOwner='Y'
AND AnnualIncome > (select avg(AnnualIncome)from customers)
ORDER BY AnnualIncome;
```

{{< figure src="/posts/adventureworks-database/img16.png" alt="Output from Question 11" caption="Output from Question 11" width="60%" class="right" >}}

**Question 12:** List all the customers that their annual income is less than 20, 000 and bought products in 2015:

```sql
SELECT  FirstName, LastName, 
AnnualIncome, ProductName,
YEAR(OrderDate) AS Year
FROM sales_2015
JOIN products ON sales_2015.ProductKey = products.ProductKey
JOIN customers ON sales_2015.CustomerKey = customers.CustomerKey
HAVING AnnualIncome < 20000;
```

{{< figure src="/posts/adventureworks-database/img17.png" alt="Output from Question 12" caption="Output from Question 12" width="50%" class="right" >}}

**Question 13:** List all sales from 2015 in ascending order by order Number, product key and customer Key and in day/month/year format:

```sql
SELECT OrderNumber,products.ProductKey, 
customers.CustomerKey,DAY(OrderDate) AS Day, 
MONTH(OrderDate) AS MONTH, YEAR(OrderDate) AS Year,
sales_2015.OrderQuantity * products.ProductPrice AS Sales
from sales_2015 join products 
ON sales_2015.ProductKey = products.ProductKey
JOIN customers ON
sales_2015.CustomerKey = customers.CustomerKey 
ORDER BY Sales ASC;
```

{{< figure src="/posts/adventureworks-database/img18.png" alt="Output from Question 13" caption="Output from Question 13" width="50%" class="right" >}}

**Question 14:** List all sales from 2016 order by orderNumber and in day/month/year format:

```sql
SELECT OrderNumber,products.ProductKey, 
customers.CustomerKey,DAY(OrderDate) AS Day, 
MONTH(OrderDate) AS MONTH, YEAR(OrderDate) AS Year,
sales_2016.OrderQuantity * products.ProductPrice AS Sales
from sales_2016 join products 
ON sales_2016.ProductKey = products.ProductKey
JOIN customers ON
sales_2016.CustomerKey = customers.CustomerKey 
ORDER BY Sales DESC;
```

{{< figure src="/posts/adventureworks-database/img19.png" alt="Output from Question 14" caption="Output from Question 14" width="60%" class="right" >}}

**Question 15:** List all sales from 2017 order by orderNumber and in day/month/year format:

```sql
SELECT OrderNumber,products.ProductKey, 
customers.CustomerKey,DAY(OrderDate) AS Day, 
MONTH(OrderDate) AS MONTH, YEAR(OrderDate) AS Year,
sales_2017.OrderQuantity * products.ProductPrice AS Sales
from sales_2017 join products 
ON sales_2017.ProductKey = products.ProductKey
JOIN customers ON
sales_2017.CustomerKey = customers.CustomerKey 
ORDER BY Sales DESC;
```

{{< figure src="/posts/adventureworks-database/img20.png" alt="Output from Question 15" caption="Output from Question 15" width="60%" class="right" >}}

**Question 16:** List all the customers that purchased the most sold products in the year that has higher sales 2017:

```sql
SELECT customers.CustomerKey, 
FirstName, LastName, 
ProductName, OrderQuantity, OrderDate
FROM sales_2017
JOIN customers ON 
sales_2017.CustomerKey = customers.CustomerKey
JOIN products ON 
sales_2017.ProductKey = products.ProductKey
WHERE OrderQuantity > (SELECT AVG(OrderQuantity)
FROM sales_2017);
```

{{< figure src="/posts/adventureworks-database/img21.png" alt="Output from Question 16" caption="Output from Question 16" width="60%" class="right" >}}

**Question 17:** Count the products that purchased the same item in 2016:

```sql
SELECT count(*) as quantity_sold, ProductName
FROM sales_2016
JOIN customers ON sales_2016.CustomerKey = customers.CustomerKey
JOIN products ON sales_2016.ProductKey = products.ProductKey
GROUP BY ProductName
ORDER BY quantity_sold DESC;
```

{{< figure src="/posts/adventureworks-database/img22.png" alt="Output from Question 17" caption="Output from Question 17" width="60%" class="right" >}}

**Question 18:** List all products that have been returned based on continent, country and region and order by the return date:

```sql
SELECT products.ProductKey,
ProductName,ReturnDate,
Continent, Country, Region
FROM returns
JOIN products ON 
returns.ProductKey = products.ProductKey
JOIN territories ON 
returns.TerritoryKey = territories.TerritoryKey
ORDER BY ReturnDate;
```

{{< figure src="/posts/adventureworks-database/img23.png" alt="Output from Question 18" caption="Output from Question 18" width="60%" class="right" >}}

**Question 19:** Count the returned products group by region:

```sql
SELECT count(*) AS Total_Return, Region
FROM returns
JOIN territories ON
returns.TerritoryKey = territories.TerritoryKey
GROUP BY region;
```

{{< figure src="/posts/adventureworks-database/img24.png" alt="Output from Question 19" caption="Output from Question 19" width="30%" class="right" >}}

**Question 20:** Find out the profit of the top 5 products for 2017:

```sql
SELECT products.ProductKey, ProductName,ProductCost,
ProductPrice, ProductPrice - ProductCost AS Profit, OrderDate
FROM sales_2017
JOIN products ON sales_2017.ProductKey = products.ProductKey
LIMIT 5;
```

{{< figure src="/posts/adventureworks-database/img25.png" alt="Output from Question 20" caption="Output from Question 20" width="60%" class="right" >}}

**Question 21:** Find the average returns in each year:

```sql
SELECT '2017' AS Year, AVG(ReturnQuantity) AS Average_returns FROM returns
WHERE ReturnDate BETWEEN '2017-01-01' AND '2017-12-31'
UNION ALL
SELECT '2016' AS Year, AVG(ReturnQuantity) AS Average_returns FROM returns
WHERE ReturnDate BETWEEN '2016-01-01' AND '2016-12-31'
UNION ALL
SELECT '2015' AS Year, AVG(ReturnQuantity) AS Average_returns FROM returns
WHERE ReturnDate BETWEEN '2015-01-01' AND '2015-12-31';
```

{{< figure src="/posts/adventureworks-database/img26.png" alt="Output from Question 21" caption="Output from Question 21" width="30%" class="right" >}}

**Question 22:** Find the total quantities orded in each year and at all times within each region:

```sql
WITH cte2015 AS (
    SELECT Region, territories.TerritoryKey, territories.Country, SUM(OrderQuantity) as total_quantity
    FROM territories
    JOIN sales_2015
    ON territories.TerritoryKey = sales_2015.TerritoryKey
    GROUP BY Region, territories.Country, territories.TerritoryKey
), cte2016 AS (
    SELECT Region, territories.TerritoryKey, territories.Country, SUM(OrderQuantity) as total_quantity
    FROM territories
    JOIN sales_2016
    ON territories.TerritoryKey = sales_2016.TerritoryKey
    GROUP BY Region, territories.Country, territories.TerritoryKey
), cte2017 AS (
    SELECT Region, territories.TerritoryKey, territories.Country, SUM(OrderQuantity) as total_quantity
    FROM territories
    JOIN sales_2017
    ON territories.TerritoryKey = sales_2017.TerritoryKey
    GROUP BY Region, territories.Country, territories.TerritoryKey
), cte_all_times AS (
    SELECT Region, territories.TerritoryKey, territories.Country, SUM(OrderQuantity) as total_quantity
    FROM territories
    JOIN (SELECT * FROM sales_2015
    UNION ALL
    SELECT * FROM sales_2016
    UNION ALL
    SELECT * FROM sales_2017) s
    ON territories.TerritoryKey = s.TerritoryKey
    GROUP BY Region, territories.Country, territories.TerritoryKey
)
SELECT cte2015.Region, cte2015.TerritoryKey,
       MAX(cte2015.total_quantity) as total_quantities2015,
       MAX(cte2016.total_quantity) as total_quantities2016,
       MAX(cte2017.total_quantity) as total_quantities2017,
       MAX(cte_all_times.total_quantity) as total_quantities_all_times
FROM cte2015
JOIN cte2016
ON cte2015.Region = cte2016.Region and cte2015.TerritoryKey = cte2016.TerritoryKey
JOIN cte2017
ON cte2016.Region = cte2017.Region and cte2016.TerritoryKey = cte2017.TerritoryKey
JOIN cte_all_times
ON cte2017.Region = cte_all_times.Region and cte2017.TerritoryKey = cte_all_times.TerritoryKey
GROUP BY cte2015.Region, cte2015.TerritoryKey
ORDER BY total_quantities2015 DESC;
```

{{< figure src="/posts/adventureworks-database/img27.png" alt="Output from Question 22" caption="Output from Question 22" width="80%" class="right" >}}

{{< notice note "Note" >}}
The Python source code used in creating the database in Python is available in this [Github-repo](https://github.com/ahmedsalim3/AdventureWorks-Database).
The Adventure Works dump database is free to download from [**here**](https://raw.githubusercontent.com/ahmedsalim3/public-data/refs/heads/main/adventureworks/rdbms/AdventureWorks-DumpDatabase.sql), and the SQL query scripts used can be found [**here**](https://raw.githubusercontent.com/ahmedsalim3/public-data/refs/heads/main/adventureworks/rdbms/AdventureWorks-Scripts.sql).
{{< /notice >}}

[data-source]: https://www.kaggle.com/datasets/ukveteran/adventure-works
[clean-data]: https://github.com/ahmedsalim3/AdventureWorks-Database/tree/main/data/raw
[schema.sql]: https://github.com/ahmedsalim3/AdventureWorks-Database/blob/main/data/database/schema.sql
[data-import-wizard]: https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-table.html
[load-data-statement]: https://dev.mysql.com/doc/refman/5.1/en/load-data.html
[mysql-workbench]: https://www.mysql.com/products/workbench/
[php-my-admin]: https://www.phpmyadmin.net/
[source-code]: https://github.com/ahmedsalim3/AdventureWorks-Database
[dump-db-raw]: https://raw.githubusercontent.com/ahmedsalim3/AdventureWorks-Database/refs/heads/main/data/database/dump_adventureworks.sql
[SQL-queries]: https://raw.githubusercontent.com/ahmedsalim3/Public-Data/main/AdventureWorks/AdventureWorks-Scripts.sql
