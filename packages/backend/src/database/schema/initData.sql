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