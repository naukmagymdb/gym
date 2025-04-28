-- schema for Gym DB

-- Visitor table
CREATE TABLE Visitor (
  IPN INTEGER PRIMARY KEY,
  Birth_date DATE NOT NULL,
  Visitor_name VARCHAR(50) NOT NULL,
  Surname VARCHAR(50) NOT NULL,
  Patronymic VARCHAR(50) NOT NULL,
  Phone_num VARCHAR(50) NOT NULL,
  Email VARCHAR(50)
);

-- View to calculate Age dynamically
CREATE VIEW Visitor_with_Age AS
SELECT
  v.*,
  DATE_PART('year', AGE(current_date, v.Birth_date))::INTEGER AS Age
FROM Visitor v;

-- Department and its contacts
CREATE TABLE Department (
  Department_id INTEGER PRIMARY KEY,
  Address VARCHAR(50) NOT NULL
);

CREATE TABLE Department_Phone_number (
  Phone_number VARCHAR(50) PRIMARY KEY,
  Department_id INTEGER NOT NULL,
  FOREIGN KEY (Department_id) REFERENCES Department(Department_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Department_Email (
  Email VARCHAR(50) PRIMARY KEY,
  Department_id INTEGER NOT NULL,
  FOREIGN KEY (Department_id) REFERENCES Department(Department_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Staff and hierarchy
CREATE TABLE Staff (
  IPN INTEGER PRIMARY KEY,
  Contract_num VARCHAR(50) NOT NULL,
  Staff_Name VARCHAR(50) NOT NULL,
  Surname VARCHAR(50) NOT NULL,
  Patronymic VARCHAR(50),
  Salary NUMERIC(12,2) NOT NULL,
  Phone_num VARCHAR(50) NOT NULL,
  Qualification_cert_number_of_coach VARCHAR(50),
  Email VARCHAR(50),
  Department_id INTEGER NOT NULL,
  FOREIGN KEY (Department_id) REFERENCES Department(Department_id)
    ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Staff_Manager_Subordinate (
  IPN_of_Manager INTEGER NOT NULL,
  IPN_of_Subordinate INTEGER NOT NULL,
  PRIMARY KEY (IPN_of_Manager, IPN_of_Subordinate),
  FOREIGN KEY (IPN_of_Manager) REFERENCES Staff(IPN)
    ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY (IPN_of_Subordinate) REFERENCES Staff(IPN)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Suppliers and goods
CREATE TABLE Supplier (
  EDRPOU INTEGER PRIMARY KEY,
  Phone_num VARCHAR(50) NOT NULL,
  Email VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
  Goods_id SERIAL PRIMARY KEY,
  Goods_name VARCHAR(50) NOT NULL
);

CREATE TABLE Supplier_Products (
  EDRPOU INTEGER NOT NULL,
  Goods_id INTEGER NOT NULL,
  PRIMARY KEY (EDRPOU, Goods_id),
  FOREIGN KEY (EDRPOU) REFERENCES Supplier(EDRPOU)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Goods_id) REFERENCES Products(Goods_id)
    ON DELETE NO ACTION ON UPDATE CASCADE
);

-- Abonements
CREATE TABLE Abonementtype (
  Abonement_type VARCHAR(50) PRIMARY KEY,
  Price NUMERIC(10,2) NOT NULL
);

CREATE TABLE Abonement (
  Abonement_id INTEGER PRIMARY KEY,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Is_active BOOLEAN NOT NULL,
  IPN INTEGER NOT NULL,
  Abonement_type VARCHAR(50) NOT NULL,
  Department_id INTEGER NOT NULL,
  FOREIGN KEY (IPN) REFERENCES Visitor(IPN)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Abonement_type) REFERENCES Abonementtype(Abonement_type)
    ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY (Department_id) REFERENCES Department(Department_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Contracts and line items
CREATE TABLE Contract (
  Contract_num SERIAL PRIMARY KEY,
  EDRPOU INTEGER NOT NULL,
  Total_sum NUMERIC(12,2) NOT NULL,
  Contract_date DATE NOT NULL,
  FOREIGN KEY (EDRPOU) REFERENCES Supplier(EDRPOU)
    ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Contract_Products (
  Contract_num INTEGER NOT NULL,
  Goods_id INTEGER NOT NULL,
  Goods_price NUMERIC(10,2) NOT NULL,
  Goods_amount INTEGER NOT NULL,
  Total_goods_price NUMERIC(12,2) GENERATED ALWAYS AS (Goods_price * Goods_amount) STORED,
  PRIMARY KEY (Contract_num, Goods_id),
  FOREIGN KEY (Contract_num) REFERENCES Contract(Contract_num)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Goods_id) REFERENCES Products(Goods_id)
    ON DELETE NO ACTION ON UPDATE CASCADE
);

-- Training sessions
CREATE TABLE Training (
  IPN_Visitor INTEGER NOT NULL,
  IPN_Staff INTEGER,
  Date_Of_Begin DATE NOT NULL,
  Date_Of_End DATE NOT NULL,
  PRIMARY KEY (IPN_Visitor, IPN_Staff, Date_Of_Begin, Date_Of_End),
  FOREIGN KEY (IPN_Visitor) REFERENCES Visitor(IPN)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (IPN_Staff) REFERENCES Staff(IPN)
    ON DELETE SET NULL ON UPDATE CASCADE
);
