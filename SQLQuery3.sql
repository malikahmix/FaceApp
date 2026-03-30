USE OrphanageDB;
GO


SELECT * FROM PERSON;


SELECT * FROM ROOM;


SELECT * FROM CHILD;


SELECT * FROM BED;


SELECT * FROM ACTIVITY;


SELECT * FROM CHILD_ACTIVITY;


SELECT * FROM DONATION;


SELECT * FROM ADOPTION_APPLICATION;
GO

SELECT 
    r.Room_Number, 
    r.Room_Type, 
    p.First_Name + ' ' + p.Last_Name AS Staff_In_Charge,
    c.First_Name + ' ' + c.Last_Name AS Child_Name,
    c.Age AS Child_Age
FROM ROOM r
LEFT JOIN PERSON p ON r.Incharge_Person_ID = p.Person_ID
LEFT JOIN CHILD c ON r.Room_ID = c.Room_ID
ORDER BY r.Room_Number;

SELECT 
    r.Room_Number,
    b.Bed_Number,
    b.Bed_Type,
    CASE WHEN b.Is_Occupied = 1 THEN 'Occupied' ELSE 'Empty' END AS Status,
    ISNULL(c.First_Name + ' ' + c.Last_Name, '-') AS Assigned_Child
FROM BED b
JOIN ROOM r ON b.Room_ID = r.Room_ID
LEFT JOIN CHILD c ON b.Assigned_Child_ID = c.Child_ID
ORDER BY r.Room_Number, b.Bed_Number;

SELECT 
    a.Activity_Name,
    a.Schedule,
    sup.First_Name + ' ' + sup.Last_Name AS Supervisor,
    child.First_Name + ' ' + child.Last_Name AS Participant,
    ca.Performance_Rating
FROM ACTIVITY a
JOIN PERSON sup ON a.Supervisor_Person_ID = sup.Person_ID
JOIN CHILD_ACTIVITY ca ON a.Activity_ID = ca.Activity_ID
JOIN CHILD child ON ca.Child_ID = child.Child_ID
ORDER BY a.Activity_Name;

SELECT 
    d.Receipt_Number,
    d.Donation_Date,
    donor.First_Name + ' ' + donor.Last_Name AS Donor_Name,
    d.Amount,
    d.Purpose,
    staff.First_Name + ' ' + staff.Last_Name AS Recorded_By
FROM DONATION d
JOIN PERSON donor ON d.Donor_Person_ID = donor.Person_ID
JOIN PERSON staff ON d.Recorded_By_Person_ID = staff.Person_ID
ORDER BY d.Donation_Date DESC;

SELECT 
    app.Application_ID,
    app.Status,
    child.First_Name AS Child_Name,
    adopter.First_Name + ' ' + adopter.Last_Name AS Adopter_Name,
    app.Application_Date,
    ISNULL(approver.First_Name + ' ' + approver.Last_Name, 'Pending') AS Approved_By
FROM ADOPTION_APPLICATION app
JOIN CHILD child ON app.Child_ID = child.Child_ID
JOIN PERSON adopter ON app.Adopter_Person_ID = adopter.Person_ID
LEFT JOIN PERSON approver ON app.Approved_By_Person_ID = approver.Person_ID;