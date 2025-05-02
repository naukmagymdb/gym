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
('C010', 'Lisa', 'Taylor', 'Anne', 4100.00, '555-000-1111', NULL, 'lisa.taylor@gymdb.com', 1, '$2a$10$nkRhJG0xrB9Y9mXDTZiVj.7AYKqF7CRczHwQC4q/VmYnhsWnOjrS.'),
('C011', 'Vanya', 'Hushchin', 'Oleksiyovych', 94100.00, '1', NULL, 'someMail@gmail.com', 1, '$2b$10$japjmWU6kc59vL7gW/C.Ke8Wo9jU73H9oErl//b46HUJIO/E9CyEm');

INSERT INTO Visitor (Birth_date, Visitor_name, Surname, Patronymic, Phone_num, Email, Login_password) VALUES
('1990-01-15', 'Alex', 'Ivanov', 'Petrovich', '555-111-0001', 'alex.ivanov@gmail.com', '$2b$10$e3JiRO4m5ReUZbiGvM14mu2GMgDPEK7YkF4sfRQZGe.6UVX6LZC9K'),
('1985-05-20', 'Maria', 'Koval', 'Ivanivna', '555-222-0002', 'maria.koval@gmail.com', '$2b$10$7KrP7Y7FjCb8D1IQtxrh7ezGeNeaFzMjP0eBbN8EjvD.D28Drm4p2'),
('1993-09-10', 'Oleh', 'Shevchenko', 'Mykolayovych', '555-333-0003', 'oleh.shevchenko@gmail.com', '$2b$10$T7pBW3vWjWDL5iGr8TFeve1uzqsRU6NmZMIb2VhW1KMaHiTfQaV1y'),
('2000-12-25', 'Anna', 'Bondarenko', 'Serhiivna', '555-444-0004', 'anna.bondarenko@gmail.com', '$2b$10$CDMp2gXkG4nZjmsY7l7T6eK4kSIRZrzp1eXrF4lWpiAZc2Ft1Gq9W'),
('1997-03-08', 'Taras', 'Tkachenko', 'Volodymyrovych', '555-555-0005', 'taras.tkachenko@gmail.com', '$2b$10$AGeNs4fAgfKg6gPKOcbDAeXtZtIMv5mRjzp8ZEMKcmuM4nAtvJzU2'),
('05-05-2006', 'Vanya', 'Hushchin', 'Oleksiyovych', '1', 'someMail@gmail.com', '$2b$10$japjmWU6kc59vL7gW/C.Ke8Wo9jU73H9oErl//b46HUJIO/E9CyEm');

-- Manager-Subordinate relationships
INSERT INTO Staff_Manager_Subordinate (Manager_ID, Subordinate_ID) VALUES 
(1, 2),
(1, 7),
(1, 10),
(3, 4),
(3, 8),
(5, 6),
(5, 9);

INSERT INTO Visitor (Birth_date, Visitor_name, Surname, Patronymic, Phone_num, Email, Login_password)
VALUES
('1990-04-12', 'Alex', 'Petrov', 'Ivanovich', '0991112233', 'alex.petrov@example.com', '$2a$10$abcd1234abcd1234abcd1uDPhlMd8vHpj1sdtC92DC/2A4RfL6ReS'),
('1985-07-22', 'Maria', 'Kovalenko', 'Sergeevna', '0932223344', 'maria.kovalenko@example.com', '$2a$10$efgh5678efgh5678efgh5YdOvdDJJk4Fpi9Lgcn3yt2HYAnOeTWj6'),
('1993-01-05', 'Ivan', 'Shevchenko', 'Chuvak', '0973334455', 'ivan.shevchenko@example.com', '$2a$10$ijkl9012ijkl9012ijkl9XgPAV4KMTG0R8aM4GpL5Wkj0qOHEQtSi'),
('2000-09-10', 'Olga', 'Tkachenko', 'Olegovna', '0664445566', 'olga.tkachenko@example.com', '$2a$10$mnop3456mnop3456mnop3NsWDkRbkdrFhE93xXBZntzcc3kPNgJ2'),
('1988-12-02', 'Dmytro', 'Lysenko', 'Vitaliyovych', '0985556677', 'dmytro.lysenko@example.com', '$2a$10$qrst7890qrst7890qrst7Hg5LUOrAXxqkLt3ETrgjkUR5gUzAzGO.'),
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
