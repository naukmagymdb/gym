-- Mock data for Department
INSERT INTO Department (Department_id, Address) VALUES 
(1, '123 Main Street, Downtown'),
(2, '456 Fitness Avenue, Uptown'),
(3, '789 Wellness Road, Westside');

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
('C001', 'John', 'Smith', 'Edward', 5000.00, '555-111-2222', 'CERT-001', 'john.smith@gymdb.com', 1, '$2a$10$XK0f3XfnMfr8zGQ1KJkmEOIzrGzCjWl.gYS7Ru5OQ/MgGxGzQ5xaC'),
('C002', 'Emily', 'Johnson', 'Marie', 4500.00, '555-222-3333', 'CERT-002', 'emily.johnson@gymdb.com', 1, '$2a$10$DuPm1.HCwIzFQwjShc8ygu9KMTVFtkZqzKs89n1WMtBYnDvgWL4DK'),
('C003', 'Michael', 'Williams', 'James', 5200.00, '555-333-4444', 'CERT-003', 'michael.williams@gymdb.com', 2, '$2a$10$qQPfIlGvLEn6lZ8gG0SZD.YN33BFzbJGmkm3QGMfvHSn9mS9HVtVu'),
('C004', 'Sarah', 'Brown', NULL, 4000.00, '555-444-5555', NULL, 'sarah.brown@gymdb.com', 2, '$2a$10$ZLCIw2UYWXDFitDq0JUqnuNxzKRgwz6Y6.hQTg2gykVV.c/d0Y1dW'),
('C005', 'David', 'Jones', 'Robert', 4800.00, '555-555-6666', 'CERT-004', 'david.jones@gymdb.com', 3, '$2a$10$kl8Cfs7HSl8QxhXp2wd1MO3cBaZ4QF1UZn6NOyVl8QH/GxJwqQsxu'),
('C006', 'Jessica', 'Davis', 'Lynn', 3800.00, '555-666-7777', NULL, 'jessica.davis@gymdb.com', 3, '$2a$10$lmVcNbVZ8OWvk0Oq3InWou/H5JcIbAZfanYPMYKGilUE7m7Xa8nC.'),
('C007', 'Robert', 'Miller', 'George', 6000.00, '555-777-8888', 'CERT-005', 'robert.miller@gymdb.com', 1, '$2a$10$5hCZYwS5MrZ5K/nOZdbtf.RbmQrN3L9K3gqgNc8.gVQlwS8xbKAKi'),
('C008', 'Jennifer', 'Wilson', NULL, 4200.00, '555-888-9999', NULL, 'jennifer.wilson@gymdb.com', 2, '$2a$10$z.rJeM3nE/5nbU4hD7WEWOveMF2BE2gF1QpbzI2vJ5kbv1KUVqZPa'),
('C009', 'Thomas', 'Moore', 'Daniel', 5500.00, '555-999-0000', 'CERT-006', 'thomas.moore@gymdb.com', 3, '$2a$10$HRvQJvt1u19wP3Pf1R8Wz.qMv5c0GN1cgOqZVZuO0aPVWQiAJh/t2'),
('C010', 'Lisa', 'Taylor', 'Anne', 4100.00, '555-000-1111', NULL, 'lisa.taylor@gymdb.com', 1, '$2a$10$nkRhJG0xrB9Y9mXDTZiVj.7AYKqF7CRczHwQC4q/VmYnhsWnOjrS.');

-- Manager-Subordinate relationships
INSERT INTO Staff_Manager_Subordinate (Manager_ID, Subordinate_ID) VALUES
(1, 2),
(1, 7),
(1, 10),
(3, 4),
(3, 8),
(5, 6),
(5, 9); 


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
