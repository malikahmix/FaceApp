USE OrphanageDB;
GO

-- 1. Insert into PERSON (Staff, Donors, Adopters)
-- We need a mix of types to satisfy foreign keys later.
INSERT INTO PERSON 
(First_Name, Last_Name, Date_of_Birth, Gender, Phone_Number, Email, Address, Person_Type, Position, Department, Salary, Occupation, Annual_Income)
VALUES
-- STAFF (IDs 1-3)
('Alice', 'Smith', '1980-05-15', 'Female', '555-0101', 'alice.smith@orph.org', '123 Maple St', 'Staff', 'Manager', 'Administration', 60000.00, NULL, NULL),
('Bob', 'Jones', '1985-08-22', 'Male', '555-0102', 'bob.jones@orph.org', '456 Oak Ave', 'Staff', 'Nurse', 'Medical', 45000.00, NULL, NULL),
('Charlie', 'Brown', '1990-12-01', 'Male', '555-0103', 'charlie.brown@orph.org', '789 Pine Rd', 'Staff', 'Caregiver', 'Childcare', 35000.00, NULL, NULL),

-- DONORS (IDs 4-6)
('Diana', 'Prince', '1975-03-10', 'Female', '555-0201', 'diana.p@gmail.com', '101 Hero Way', 'Donor', NULL, NULL, NULL, 'CEO', NULL),
('Bruce', 'Wayne', '1978-02-19', 'Male', '555-0202', 'bruce.w@enterprises.com', '102 Gotham Blvd', 'Donor', NULL, NULL, NULL, 'Philanthropist', NULL),
('Clark', 'Kent', '1982-06-18', 'Male', '555-0203', 'clark.k@daily.com', '103 Metro St', 'Donor', NULL, NULL, NULL, 'Journalist', NULL),

-- ADOPTERS (IDs 7-9)
('Lois', 'Lane', '1984-01-01', 'Female', '555-0301', 'lois.l@daily.com', '200 News Ln', 'Adopter', NULL, NULL, NULL, 'Reporter', 85000.00),
('Peter', 'Parker', '1995-08-10', 'Male', '555-0302', 'peter.p@web.com', '201 Queens Blvd', 'Adopter', NULL, NULL, NULL, 'Photographer', 40000.00),
('Mary', 'Jane', '1996-04-22', 'Female', '555-0303', 'mj.watson@act.com', '201 Queens Blvd', 'Adopter', NULL, NULL, NULL, 'Actress', 95000.00);
GO

-- 2. Insert into ROOM
INSERT INTO ROOM (Room_Number, Room_Type, Capacity, Incharge_Person_ID)
VALUES
('101', 'Nursery', 4, 2), -- Managed by Bob (Nurse)
('102', 'Toddler', 4, 3), -- Managed by Charlie (Caregiver)
('103', 'Preschool', 6, 3),
('104', 'School Age', 8, 1),
('201', 'Study', 10, 1),
('202', 'Playroom', 15, 3),
('203', 'Medical Bay', 2, 2),
('301', 'Storage', 0, 1);
GO

-- 3. Insert into CHILD
INSERT INTO CHILD (First_Name, Last_Name, Date_of_Birth, Gender, Blood_Group, Room_ID, Guardian_Contact, Current_Status)
VALUES
('Timmy', 'Turner', '2018-05-20', 'Male', 'O+', 1, 'Unknown', 'Resident'),
('Sally', 'Ride', '2019-06-15', 'Female', 'A-', 1, 'Grandmother: 555-9999', 'Resident'),
('Johnny', 'Bravo', '2015-01-10', 'Male', 'B+', 2, 'Police Referral', 'Resident'),
('Velma', 'Dinkley', '2015-03-30', 'Female', 'AB+', 2, 'Unknown', 'Resident'),
('Shaggy', 'Rogers', '2012-07-04', 'Male', 'O-', 3, 'Unknown', 'Resident'),
('Daphne', 'Blake', '2012-09-12', 'Female', 'A+', 3, 'Aunt: 555-8888', 'Resident'),
('Fred', 'Jones', '2010-11-20', 'Male', 'B-', 4, 'Unknown', 'Pending Adoption'),
('Scooby', 'Doo', '2016-12-25', 'Male', 'O+', 2, 'Found at Park', 'Resident');
GO

-- 4. Insert into BED
-- Linking Beds to Rooms and assigning Children where applicable
INSERT INTO BED (Room_ID, Bed_Number, Bed_Type, Is_Occupied, Assigned_Child_ID)
VALUES
(1, 'A', 'Crib', 1, 1), -- Timmy
(1, 'B', 'Crib', 1, 2), -- Sally
(1, 'C', 'Crib', 0, NULL),
(1, 'D', 'Crib', 0, NULL),
(2, 'A', 'Toddler Bed', 1, 3), -- Johnny
(2, 'B', 'Toddler Bed', 1, 4), -- Velma
(2, 'C', 'Toddler Bed', 1, 8), -- Scooby
(3, 'A', 'Single Bed', 1, 5), -- Shaggy
(3, 'B', 'Single Bed', 1, 6), -- Daphne
(4, 'A', 'Bunk Bed Top', 1, 7); -- Fred
GO

-- 5. Insert into ACTIVITY
INSERT INTO ACTIVITY (Activity_Name, Activity_Type, Schedule, Supervisor_Person_ID)
VALUES
('Morning Yoga', 'Health', 'Daily 7:00 AM', 2),
('Art Class', 'Creative', 'Mon/Wed 10:00 AM', 3),
('Soccer Practice', 'Sports', 'Tue/Thu 4:00 PM', 3),
('Math Tutoring', 'Education', 'Mon-Fri 3:00 PM', 1),
('Story Time', 'Leisure', 'Daily 6:00 PM', 3),
('Music Lesson', 'Creative', 'Fri 2:00 PM', 1),
('Swimming', 'Sports', 'Sat 10:00 AM', 2),
('Gardening', 'Vocational', 'Sun 9:00 AM', 1);
GO

-- 6. Insert into CHILD_ACTIVITY (Linking Children to Activities)
INSERT INTO CHILD_ACTIVITY (Child_ID, Activity_ID, Attendance_Count, Performance_Rating)
VALUES
(1, 5, 20, 8), -- Timmy in Story Time
(2, 5, 15, 9), -- Sally in Story Time
(3, 3, 10, 7), -- Johnny in Soccer
(4, 2, 12, 10), -- Velma in Art
(5, 7, 5, 6), -- Shaggy in Swimming
(6, 6, 8, 9), -- Daphne in Music
(7, 4, 30, 8), -- Fred in Math
(5, 8, 4, 5); -- Shaggy in Gardening
GO

-- 7. Insert into DONATION
INSERT INTO DONATION (Donor_Person_ID, Amount, Payment_Method, Purpose, Receipt_Number, Recorded_By_Person_ID)
VALUES
(4, 500.00, 'Credit Card', 'General Fund', 'REC-001', 1),
(5, 10000.00, 'Bank Transfer', 'New Wing Construction', 'REC-002', 1),
(6, 100.00, 'Cash', 'Food Supplies', 'REC-003', 1),
(4, 250.00, 'PayPal', 'Toys', 'REC-004', 1),
(5, 5000.00, 'Check', 'Medical Equipment', 'REC-005', 2),
(6, 50.00, 'Cash', 'Books', 'REC-006', 3),
(4, 1000.00, 'Credit Card', 'Scholarship Fund', 'REC-007', 1),
(5, 2000.00, 'Bank Transfer', 'Maintenance', 'REC-008', 1);
GO

-- 8. Insert into ADOPTION_APPLICATION
INSERT INTO ADOPTION_APPLICATION (Child_ID, Adopter_Person_ID, Application_Date, Status, Interview_Date, Approved_By_Person_ID, Approval_Date, Notes)
VALUES
(7, 7, '2023-01-10', 'Approved', '2023-01-20', 1, '2023-02-01', 'Perfect match.'),
(3, 8, '2023-03-15', 'Pending', '2023-04-01', NULL, NULL, 'Waiting for background check.'),
(4, 9, '2023-05-05', 'Rejected', '2023-05-10', 1, NULL, 'Income requirement not met.'),
(1, 7, '2023-06-01', 'Under Review', NULL, 1, NULL, 'Second application.'),
(2, 8, '2023-02-14', 'Withdrawn', NULL, NULL, NULL, 'Adopter moved away.'),
(5, 9, '2023-07-20', 'Pending', '2023-08-01', NULL, NULL, 'Scheduled for home visit.'),
(6, 7, '2023-08-10', 'Approved', '2023-08-15', 1, '2023-08-20', 'Sibling adoption.'),
(8, 8, '2023-09-01', 'Pending', NULL, NULL, NULL, 'Initial paperwork submitted.');
GO