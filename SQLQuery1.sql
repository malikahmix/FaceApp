-- 1. Create the Database
CREATE DATABASE OrphanageDB;
GO

USE OrphanageDB;
GO

-- 2. Create PERSON Table
-- Implements Single Table Inheritance based on "Person_Type"
CREATE TABLE PERSON (
    Person_ID INT IDENTITY(1,1) PRIMARY KEY,
    First_Name NVARCHAR(50) NOT NULL,
    Last_Name NVARCHAR(50) NOT NULL,
    Date_of_Birth DATE NOT NULL,
    -- DERIVED ATTRIBUTE: Age calculated automatically
    Age AS (DATEDIFF(YEAR, Date_of_Birth, GETDATE())), 
    Gender NVARCHAR(20),
    Phone_Number VARCHAR(20) UNIQUE,
    Email NVARCHAR(100) UNIQUE,
    Address NVARCHAR(255),
    
    -- DISCRIMINATOR: Staff, Donor, Adopter
    Person_Type NVARCHAR(20) NOT NULL CHECK (Person_Type IN ('Staff', 'Donor', 'Adopter')),
    
    -- Staff specific columns (Nullable)
    Position NVARCHAR(50),
    Department NVARCHAR(50),
    Salary DECIMAL(18, 2),
    
    -- Donor specific columns (Nullable)
    -- Note: Complex derived aggregations (Total_Donated) are usually best handled 
    -- by a View or App Logic rather than a CREATE TABLE computed column. 
    -- We will create it as a standard column here to hold the cached value.
    Total_Donated DECIMAL(18, 2) DEFAULT 0.00,
    
    -- Adopter specific columns (Nullable)
    Occupation NVARCHAR(100),
    Annual_Income DECIMAL(18, 2),
    
    Is_Active BIT DEFAULT 1,
    Created_At DATETIME DEFAULT GETDATE()
);
GO

-- 3. Create ROOM Table
CREATE TABLE ROOM (
    Room_ID INT IDENTITY(1,1) PRIMARY KEY,
    Room_Number NVARCHAR(20) NOT NULL UNIQUE,
    Room_Type NVARCHAR(50),
    Capacity INT NOT NULL,
    -- Derived occupancy is best handled via View/Query, 
    -- placeholder column provided here.
    Current_Occupancy INT DEFAULT 0, 
    Incharge_Person_ID INT,
    Is_Active BIT DEFAULT 1,
    
    CONSTRAINT FK_Room_Person FOREIGN KEY (Incharge_Person_ID) REFERENCES PERSON(Person_ID)
);
GO

-- 4. Create CHILD Table
CREATE TABLE CHILD (
    Child_ID INT IDENTITY(1,1) PRIMARY KEY,
    First_Name NVARCHAR(50) NOT NULL,
    Last_Name NVARCHAR(50) NOT NULL,
    Date_of_Birth DATE NOT NULL,
    -- DERIVED ATTRIBUTE: Age calculated automatically
    Age AS (DATEDIFF(YEAR, Date_of_Birth, GETDATE())),
    Gender NVARCHAR(20),
    Blood_Group NVARCHAR(5),
    Admission_Date DATE DEFAULT GETDATE(),
    Current_Status NVARCHAR(50),
    Photo_URL NVARCHAR(MAX),
    Room_ID INT,
    Guardian_Contact NVARCHAR(255),
    Is_Deleted BIT DEFAULT 0,
    Created_At DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Child_Room FOREIGN KEY (Room_ID) REFERENCES ROOM(Room_ID)
);
GO

-- 5. Create BED Table
CREATE TABLE BED (
    Bed_ID INT IDENTITY(1,1) PRIMARY KEY,
    Room_ID INT NOT NULL, -- Identifying relationship
    Bed_Number NVARCHAR(20) NOT NULL, -- Partial Key
    Bed_Type NVARCHAR(50),
    Is_Occupied BIT DEFAULT 0,
    Assigned_Child_ID INT NULL,

    CONSTRAINT FK_Bed_Room FOREIGN KEY (Room_ID) REFERENCES ROOM(Room_ID),
    CONSTRAINT FK_Bed_Child FOREIGN KEY (Assigned_Child_ID) REFERENCES CHILD(Child_ID),
    
    -- Enforce uniqueness of Bed Number within a Room (Partial Key logic)
    CONSTRAINT UQ_Room_BedNumber UNIQUE (Room_ID, Bed_Number)
);
GO

-- 6. Create ACTIVITY Table
CREATE TABLE ACTIVITY (
    Activity_ID INT IDENTITY(1,1) PRIMARY KEY,
    Activity_Name NVARCHAR(100) NOT NULL,
    Activity_Type NVARCHAR(50),
    Schedule NVARCHAR(100),
    Supervisor_Person_ID INT,
    Is_Active BIT DEFAULT 1,

    CONSTRAINT FK_Activity_Person FOREIGN KEY (Supervisor_Person_ID) REFERENCES PERSON(Person_ID)
);
GO

-- 7. Create CHILD_ACTIVITY Table (Associative Entity)
CREATE TABLE CHILD_ACTIVITY (
    Child_ID INT NOT NULL,
    Activity_ID INT NOT NULL,
    Enrollment_Date DATE DEFAULT GETDATE(),
    Attendance_Count INT DEFAULT 0,
    Performance_Rating INT CHECK (Performance_Rating BETWEEN 1 AND 10),

    -- Composite Primary Key
    CONSTRAINT PK_ChildActivity PRIMARY KEY (Child_ID, Activity_ID),
    CONSTRAINT FK_CA_Child FOREIGN KEY (Child_ID) REFERENCES CHILD(Child_ID),
    CONSTRAINT FK_CA_Activity FOREIGN KEY (Activity_ID) REFERENCES ACTIVITY(Activity_ID)
);
GO

-- 8. Create DONATION Table
CREATE TABLE DONATION (
    Donation_ID INT IDENTITY(1,1) PRIMARY KEY,
    Donor_Person_ID INT NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    Donation_Date DATE DEFAULT GETDATE(),
    Payment_Method NVARCHAR(50),
    Purpose NVARCHAR(255),
    Receipt_Number NVARCHAR(50) UNIQUE NOT NULL,
    Recorded_By_Person_ID INT,
    Created_At DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Donation_Donor FOREIGN KEY (Donor_Person_ID) REFERENCES PERSON(Person_ID),
    CONSTRAINT FK_Donation_Recorder FOREIGN KEY (Recorded_By_Person_ID) REFERENCES PERSON(Person_ID)
);
GO

-- 9. Create ADOPTION_APPLICATION Table
CREATE TABLE ADOPTION_APPLICATION (
    Application_ID INT IDENTITY(1,1) PRIMARY KEY,
    Child_ID INT NOT NULL,
    Adopter_Person_ID INT NOT NULL,
    Application_Date DATE DEFAULT GETDATE(),
    Status NVARCHAR(50) DEFAULT 'Pending',
    Interview_Date DATE,
    Approved_By_Person_ID INT,
    Approval_Date DATE,
    Notes NVARCHAR(MAX),
    Created_At DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_App_Child FOREIGN KEY (Child_ID) REFERENCES CHILD(Child_ID),
    CONSTRAINT FK_App_Adopter FOREIGN KEY (Adopter_Person_ID) REFERENCES PERSON(Person_ID),
    CONSTRAINT FK_App_Approver FOREIGN KEY (Approved_By_Person_ID) REFERENCES PERSON(Person_ID)
);
GO