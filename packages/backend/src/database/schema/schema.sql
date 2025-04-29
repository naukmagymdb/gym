-- schema for Gym DB

-- Visitor table
CREATE TABLE Visitor (
  ID SERIAL PRIMARY KEY,
  Birth_date DATE NOT NULL,
  Visitor_name VARCHAR(50) NOT NULL,
  Surname VARCHAR(50) NOT NULL,
  Patronymic VARCHAR(50) NOT NULL,
  Phone_num VARCHAR(50) NOT NULL,
  Email VARCHAR(50),
  Login_password VARCHAR(100) NOT NULL
);

-- View to calculate Age dynamically
CREATE VIEW Visitor_with_Age AS
SELECT
  v.*,
  DATE_PART('year', AGE(current_date, v.Birth_date))::INTEGER AS Age
FROM Visitor v;

-- Department and its contacts
CREATE TABLE Department (
  Department_id SERIAL PRIMARY KEY,
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
  ID SERIAL PRIMARY KEY,
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
    ON DELETE NO ACTION ON UPDATE CASCADE,
  Login_password VARCHAR(100) NOT NULL
);

CREATE TABLE Staff_Manager_Subordinate (
  Manager_ID INTEGER NOT NULL,
  Subordinate_ID INTEGER NOT NULL,
  PRIMARY KEY (Manager_ID, Subordinate_ID),
  FOREIGN KEY (Manager_ID) REFERENCES Staff(ID)
    ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY (Subordinate_ID) REFERENCES Staff(ID)
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

-- Insert into Supplier table
INSERT INTO Supplier (EDRPOU, Phone_num, Email) VALUES
(31000432, '+380501112233', 'fitgear@suppliers.ua'),
(32450981, '+380631234111', 'activepro@equipments.com'),
(33789412, '+380671998877', 'powerup@sportsup.ua'),
(34982017, '+380932226655', 'gymbasics@fitmail.net'),
(36212045, '+380681234567', 'protrainer@suphub.org'),
(37550987, '+380991111222', 'sportx@suppliers.ua');

-- Expanded Products
INSERT INTO Products (goods_name) VALUES
('Football Ball'),
('Basketball Ball'),
('Tennis Racket'),
('Boxing Gloves'),
('Running Shoes'),
('Swimming Goggles'),
('Dumbbells 5kg'),
('Dumbbells 10kg'),
('Treadmill Pro 5000'),
('Exercise Bike X100'),
('Resistance Bands Set'),
('Yoga Block Cork'),
('Yoga Mat Deluxe'),
('Pull-up Bar'),
('Kettlebell 12kg'),
('Speed Rope'),
('Bench Press Machine'),
('Elliptical Trainer');

-- Link Suppliers to Products
INSERT INTO Supplier_Products (EDRPOU, Goods_id) VALUES
-- fitgear
(31000432, 1), (31000432, 5), (31000432, 7), (31000432, 11),
-- activepro
(32450981, 2), (32450981, 6), (32450981, 8), (32450981, 10), (32450981, 17),
-- powerup
(33789412, 3), (33789412, 4), (33789412, 9), (33789412, 12), (33789412, 16),
-- gymbasics
(34982017, 13), (34982017, 14), (34982017, 15), (34982017, 18),
-- protrainer
(36212045, 2), (36212045, 5), (36212045, 7), (36212045, 13), (36212045, 17),
-- sportx
(37550987, 1), (37550987, 6), (37550987, 10), (37550987, 15), (37550987, 18),

-- Shared supplies
(31000432, 13),
(32450981, 1),
(33789412, 5),
(34982017, 7),
(36212045, 10),
(37550987, 11);


-- Abonements
CREATE TABLE Abonementtype (
  Abonement_type VARCHAR(50) PRIMARY KEY,
  Price NUMERIC(10,2) NOT NULL
);

CREATE TABLE Abonement (
  Abonement_id SERIAL PRIMARY KEY,
  Start_date DATE NOT NULL,
  End_date DATE NOT NULL,
  Is_active BOOLEAN NOT NULL,
  Visitor_ID INTEGER NOT NULL,
  Abonement_type VARCHAR(50) NOT NULL,
  Department_id INTEGER NOT NULL,
  FOREIGN KEY (Visitor_ID) REFERENCES Visitor(ID)
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
  Visitor_ID INTEGER NOT NULL,
  Staff_ID INTEGER,
  Date_Of_Begin DATE NOT NULL,
  Date_Of_End DATE NOT NULL,
  PRIMARY KEY (Visitor_ID, Staff_ID, Date_Of_Begin, Date_Of_End),
  FOREIGN KEY (Visitor_ID) REFERENCES Visitor(ID)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Staff_ID) REFERENCES Staff(ID)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Session table
CREATE TABLE Session (
  sid VARCHAR(100) PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);
