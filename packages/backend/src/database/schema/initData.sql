-- Mock data for Department
INSERT INTO Department (Address) VALUES 
('123 Main Street, Downtown'),
('456 Fitness Avenue, Uptown'),
('789 Wellness Road, Westside');

-- Department Phone Numbers
INSERT INTO Department_Phone_number (Phone_number, Department_id) VALUES
('555-123-4567', 1),
('555-234-5678', 2),
('555-345-6789', 3);

-- Department Emails
INSERT INTO Department_Email (Email, Department_id) VALUES
('downtown@gymdb.com', 1),
('uptown@gymdb.com', 2),
('westside@gymdb.com', 3);

-- Mock data for Staff
INSERT INTO Staff (Contract_num, Staff_Name, Surname, Patronymic, Salary, Phone_num, Qualification_cert_number_of_coach, Email, Department_id, Login_password) VALUES
('C001', 'John', 'Smith', 'Edward', 5000.00, '+380501112233', 'CERT-001', 'john.smith@gymdb.com', 1, '$2a$10$XK0f3XfnMfr8zGQ1KJkmEOIzrGzCjWl.gYS7Ru5OQ/MgGxGzQ5xaC'),
('C002', 'Emily', 'Johnson', 'Marie', 4500.00, '+380502223344', 'CERT-002', 'emily.johnson@gymdb.com', 1, '$2a$10$DuPm1.HCwIzFQwjShc8ygu9KMTVFtkZqzKs89n1WMtBYnDvgWL4DK'),
('C003', 'Michael', 'Williams', 'James', 5200.00, '+380503334455', 'CERT-003', 'michael.williams@gymdb.com', 2, '$2a$10$qQPfIlGvLEn6lZ8gG0SZD.YN33BFzbJGmkm3QGMfvHSn9mS9HVtVu'),
('C004', 'Sarah', 'Brown', NULL, 4000.00, '+380504445566', NULL, 'sarah.brown@gymdb.com', 2, '$2a$10$ZLCIw2UYWXDFitDq0JUqnuNxzKRgwz6Y6.hQTg2gykVV.c/d0Y1dW'),
('C005', 'David', 'Jones', 'Robert', 4800.00, '+380505556677', 'CERT-004', 'david.jones@gymdb.com', 3, '$2a$10$kl8Cfs7HSl8QxhXp2wd1MO3cBaZ4QF1UZn6NOyVl8QH/GxJwqQsxu'),
('C006', 'Jessica', 'Davis', 'Lynn', 3800.00, '+380506667788', NULL, 'jessica.davis@gymdb.com', 3, '$2a$10$lmVcNbVZ8OWvk0Oq3InWou/H5JcIbAZfanYPMYKGilUE7m7Xa8nC.'),
('C007', 'Robert', 'Miller', 'George', 6000.00, '+380507778899', 'CERT-005', 'robert.miller@gymdb.com', 1, '$2a$10$5hCZYwS5MrZ5K/nOZdbtf.RbmQrN3L9K3gqgNc8.gVQlwS8xbKAKi'),
('C008', 'Jennifer', 'Wilson', NULL, 4200.00, '+380508889900', NULL, 'jennifer.wilson@gymdb.com', 2, '$2a$10$z.rJeM3nE/5nbU4hD7WEWOveMF2BE2gF1QpbzI2vJ5kbv1KUVqZPa'),
('C009', 'Thomas', 'Moore', 'Daniel', 5500.00, '+380509990011', 'CERT-006', 'thomas.moore@gymdb.com', 3, '$2a$10$HRvQJvt1u19wP3Pf1R8Wz.qMv5c0GN1cgOqZVZuO0aPVWQiAJh/t2'),
('C010', 'Lisa', 'Taylor', 'Anne', 4100.00, '+380500001122', NULL, 'lisa.taylor@gymdb.com', 1, '$2a$10$nkRhJG0xrB9Y9mXDTZiVj.7AYKqF7CRczHwQC4q/VmYnhsWnOjrS.'),
('C011', 'Vanya', 'Hushchin', 'Oleksiyovych', 94100.00, '+380992353975', NULL, 'someMail@gmail.com', 1, '$2b$10$japjmWU6kc59vL7gW/C.Ke8Wo9jU73H9oErl//b46HUJIO/E9CyEm');

INSERT INTO Visitor (Birth_date, Visitor_name, Surname, Patronymic, Phone_num, Email, Login_password) VALUES
('1990-01-15', 'Alex', 'Ivanov', 'Petrovich', '+380501122233', 'alex.ivanov@gmail.com', '$2b$10$e3JiRO4m5ReUZbiGvM14mu2GMgDPEK7YkF4sfRQZGe.6UVX6LZC9K'),
('1985-05-20', 'Maria', 'Koval', 'Ivanivna', '+380502233344', 'maria.koval@gmail.com', '$2b$10$7KrP7Y7FjCb8D1IQtxrh7ezGeNeaFzMjP0eBbN8EjvD.D28Drm4p2'),
('1993-09-10', 'Oleh', 'Shevchenko', 'Mykolayovych', '+380504334455', 'oleh.shevchenko@gmail.com', '$2b$10$T7pBW3vWjWDL5iGr8TFeve1uzqsRU6NmZMIb2VhW1KMaHiTfQaV1y'),
('2000-12-25', 'Anna', 'Bondarenko', 'Serhiivna', '+380504446566', 'anna.bondarenko@gmail.com', '$2b$10$CDMp2gXkG4nZjmsY7l7T6eK4kSIRZrzp1eXrF4lWpiAZc2Ft1Gq9W'),
('1997-03-08', 'Taras', 'Tkachenko', 'Volodymyrovych', '+380506556677', 'taras.tkachenko@gmail.com', '$2b$10$AGeNs4fAgfKg6gPKOcbDAeXtZtIMv5mRjzp8ZEMKcmuM4nAtvJzU2'),
('05-05-2006', 'Vanya', 'Hushchin', 'Oleksiyovych', '+380992353976', 'someMail@gmail.com', '$2b$10$japjmWU6kc59vL7gW/C.Ke8Wo9jU73H9oErl//b46HUJIO/E9CyEm');

-- Manager-Subordinate relationships
INSERT INTO Staff_Manager_Subordinate (Manager_ID, Subordinate_ID) VALUES 
(1, 2),
(2, 7),
(1, 7),
(1, 10),
(3, 4),
(3, 8),
(5, 6),
(5, 9);

INSERT INTO Visitor (Birth_date, Visitor_name, Surname, Patronymic, Phone_num, Email, Login_password)
VALUES
('1990-04-12', 'Alex', 'Petrov', 'Ivanovich', '+380991112233', 'alex.petrov@example.com', '$2a$10$abcd1234abcd1234abcd1uDPhlMd8vHpj1sdtC92DC/2A4RfL6ReS'),
('1985-07-22', 'Maria', 'Kovalenko', 'Sergeevna', '+380932223344', 'maria.kovalenko@example.com', '$2a$10$efgh5678efgh5678efgh5YdOvdDJJk4Fpi9Lgcn3yt2HYAnOeTWj6'),
('1993-01-05', 'Ivan', 'Shevchenko', 'Chuvak', '+380973334455', 'ivan.shevchenko@example.com', '$2a$10$ijkl9012ijkl9012ijkl9XgPAV4KMTG0R8aM4GpL5Wkj0qOHEQtSi'),
('2000-09-10', 'Olga', 'Tkachenko', 'Olegovna', '+380664445566', 'olga.tkachenko@example.com', '$2a$10$mnop3456mnop3456mnop3NsWDkRbkdrFhE93xXBZntzcc3kPNgJ2'),
('1988-12-02', 'Dmytro', 'Lysenko', 'Vitaliyovych', '+380985556677', 'dmytro.lysenko@example.com', '$2a$10$qrst7890qrst7890qrst7Hg5LUOrAXxqkLt3ETrgjkUR5gUzAzGO.'),
('2006-05-05', 'Vanya', 'Hushchin', 'TaPoh', '+380992353975', 'oopsgu2006@gmail.com', '$2b$10$yu57S3KCQFFmc3KV1tssuuEcBrtY/kFjN0kJQgauykpAAfQQzNSPS');

INSERT INTO Training (Visitor_ID, Staff_ID, Date_Of_Begin, Date_Of_End)
VALUES
(1, 1, '2025-05-02T10:00:00', '2025-05-02T11:00:00'),
(2, 2, '2025-05-02T11:30:00', '2025-05-02T12:30:00'),
(3, 3, '2025-05-02T13:00:00', '2025-05-02T14:00:00'),
(5, 5, '2025-05-03T10:30:00', '2025-05-03T11:30:00'),
(1, 2, '2025-05-04T08:00:00', '2025-05-04T09:00:00'),
(2, 3, '2025-05-04T09:15:00', '2025-05-04T10:15:00'),
(3, 1, '2025-05-04T10:30:00', '2025-05-04T11:30:00');

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


-- Abonement types
INSERT INTO Abonement_type (Abonement_type, Price) VALUES
('Monthly', 50.00),
('Quarterly', 130.00),
('Half-Yearly', 240.00),
('Yearly', 450.00),
('One-Time', 10.00);


-- Abonements
INSERT INTO Abonement (Start_date, End_date, Is_active, Visitor_ID, Abonement_type, Department_id) VALUES
('2025-01-01', '2025-01-31', TRUE, 1, 'Monthly', 1),
('2025-02-01', '2025-04-30', TRUE, 2, 'Quarterly', 2),
('2024-11-01', '2025-04-30', FALSE, 3, 'Half-Yearly', 1),
('2025-01-15', '2026-01-14', TRUE, 4, 'Yearly', 3),
('2025-04-10', '2025-04-10', FALSE, 5, 'One-Time', 1);

-- Insert contracts - A story of fitness and competition!
INSERT INTO Contract (EDRPOU, Total_sum, Contract_date) VALUES
-- Contract 1: "FitGear" strikes a deal for the season's essentials.
(31000432, 25000.00, '2024-01-20'),
-- Contract 2: "ActivePro" equips a new gym with top-of-the-line machines.
(32450981, 120000.00, '2024-02-15'),
-- Contract 3: "PowerUp" gets ready for the national games.
(33789412, 45000.00, '2024-03-01'),
-- Contract 4: "GymBasics" supplies a local studio with yoga and fitness gear.
(34982017, 18000.00, '2024-03-25'),
-- Contract 5: "ProTrainer" orders equipment for a celebrity fitness challenge.
(36212045, 60000.00, '2024-04-10'),
-- Contract 6: "SportX" signs a deal for a marathon event.
(37550987, 35000.00, '2024-05-05');

-- Insert contract products - Detailing the orders.
INSERT INTO Contract_Products (Contract_num, Goods_id, Goods_price, Goods_amount) VALUES
-- Contract 1: FitGear's order:
(1, 1, 120.00, 50),  -- Footballs for the local league
(1, 5, 100.00, 50), -- Running Shoes for the marathon team
(1, 7, 40.00, 100), -- Dumbbells for the new fitness program
(1, 11, 30.00, 80), -- Resistance Bands for group classes

-- Contract 2: ActivePro's order:
(2, 9, 8000.00, 10), -- Treadmill Pros for the cardio zone
(2, 10, 3000.00, 15), -- Exercise Bikes for spinning classes
(2, 17, 5000.00, 8),  -- Bench Press Machines for strength training

-- Contract 3: PowerUp's order:
(3, 2, 130.00, 100), -- Basketballs for the national team
(3, 4, 70.00, 80),  -- Boxing Gloves for the training camp
(3, 9, 7500.00, 5),  -- Treadmill for pro atheletes
(3, 16, 60.00, 120),  -- Speed Ropes

-- Contract 4: GymBasics's order:
(4, 12, 20.00, 60), -- Yoga Blocks for the studio
(4, 13, 30.00, 60), -- Yoga Mats for the new members
(4, 14, 45.00, 20),  -- Pull-up Bars for home use

-- Contract 5: ProTrainer's order:
(5, 2, 130.00, 80),  -- Basketballs for training
(5, 5, 110.00, 60), -- Running shoes for the challenge
(5, 7, 40.00, 120),  -- Dumbbells for strength
(5, 15, 100.00, 30), -- Kettlebells

-- Contract 6: SportX's order:
(6, 1, 120.00, 200),  -- Footballs for the event
(6, 6, 60.00, 150),  -- Swimming goggles for the aquathlon
(6, 10, 3200.00, 10), -- Exercise Bikes for warmups
(6, 18, 420.00, 40);  -- Eliptical trainers

-- Link John Smith (Staff ID based on the order in the Staff INSERT, assuming it auto-increments or you know the ID) to the first contract (EDRPOU 31000432)
INSERT INTO staff_contract (staff_id, contract_num) VALUES
(1, 1),
(2, 2),
(6, 3),
(7, 4),
(9, 5),
(10,6);


--test data for getSuppliersOnlySuppySpecifiedProduct
INSERT INTO Supplier (EDRPOU, Phone_num, Email)
VALUES (987654321, '555-123-4567', 'supplier228@example.com');

-- Insert into the Products table
INSERT INTO Products (Goods_name)
VALUES ('Example Product');

-- Insert into the Supplier_Products table to link the supplier and product
INSERT INTO Supplier_Products (EDRPOU, Goods_id)
VALUES (987654321, (SELECT Goods_id FROM Products WHERE Goods_name = 'Example Product'));



