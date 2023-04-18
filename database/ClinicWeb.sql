CREATE DATABASE ClinicWeb

USE ClinicWeb

-- CREATE TABLE
CREATE TABLE Role(
	id		INT PRIMARY KEY  ,
	name	VARCHAR(10)
)

CREATE TABLE Users(
	id INT identity (1,1) PRIMARY KEY      NOT NULL,
	username	VARCHAR(100) NOT NULL,
	email		VARCHAR(100) NOT NULL,
	password	VARCHAR(100) NOT NULL,
	passwordAt	VARCHAR(100) NOT NULL,
	photo		VARCHAR(300) NOT NULL,
	role		INT FOREIGN KEY REFERENCES Role(id) default 1 NOT NULL,
	createdAt	DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)

CREATE TABLE TreatmentCourse(
	id              INT identity (1,1) PRIMARY KEY      NOT NULL,
	name		VARCHAR(50) NOT NULL, 
	description	VARCHAR(max) NOT NULL,
	ratingsAverage  FLOAT default 4.5 CHECK (RatingsAverage >= 0 AND ratingsAverage <= 5),
    ratingsQuantity INT default 0 CHECK (RatingsQuantity >= 0),
	price		INT NOT NULL,
	createdAt	DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,	
)

CREATE TABLE Reviews	
(
    id			INT identity (1,1) PRIMARY KEY             NOT NULL,
    review		VARCHAR(max)                              NOT NULL,
    rating		INT CHECK (rating >= 0 AND rating <= 5),
    TreatmentId    INT FOREIGN KEY REFERENCES TreatmentCourse(id) not  null,
    userId		INT FOREIGN KEY REFERENCES Users(id) NOT NULL,
    createdAt	DATETIME DEFAULT CURRENT_TIMESTAMP        NOT NULL,
)

CREATE TABLE Diseases(
	idDis		INT identity (1,1) PRIMARY KEY      NOT NULL,
	nameDis		VARCHAR(100) NOT NULL,
	Cause		VARCHAR(300) NOT NULL,
	Conditions	VARCHAR(300) NOT NULL,
)

CREATE TABLE TreatmentProcess(
	UserId	INT FOREIGN KEY REFERENCES Users(id),
	TreatmentCourseId	INT FOREIGN KEY REFERENCES TreatmentCourse(id),
) 

CREATE TABLE post(
	id INT identity (1,1) PRIMARY KEY      NOT NULL,
	title VARCHAR(200) NOT NULL,
	content VARCHAR(max)   NOT NULL,
	UserId	INT FOREIGN KEY REFERENCES Users(id)   NOT NULL,
	postTime	DATETIME DEFAULT CURRENT_TIMESTAMP        NOT NULL	
)

CREATE TABLE Appointment(
	idApp	INT identity (1,1) PRIMARY KEY ,
	PatientId	INT FOREIGN KEY REFERENCES Users(id)   NOT NULL,
	Doctorid	INT FOREIGN KEY REFERENCES Users(id)   NOT NULL,
	AppTime		DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL	
)

-- ALTER TABLE 
ALTER TABLE TreatmentCourse
    ADD idDis INT,
    FOREIGN KEY(idDis) REFERENCES Diseases(idDis)

-- ALTER DATABASE
ALTER DATABASE ClinicWeb SET COMPATIBILITY_LEVEL = 160;

-- INSERT DATA
INSERT INTO Role (id,name)
VALUES
(1, 'Patient'),
(2, 'Doctor'),
(3, 'Admin')

INSERT INTO Diseases
VALUES
('Ung thu Phoi', 'hut thuoc, o nhiem khong khi', 'ho ra mau')

INSERT INTO TreatmentCourse
VALUES
('xa tri', 'des cua course',4.5,100,500000,'20120618 10:34:09 AM', 1)

INSERT INTO Users
VALUES 
('thang045', 'thang045@gmail.com', '123456aA', '2023/06/04 08:30:50', 'https://www.shutterstock.com/image-photo/hospital-interior-operating-surgery-table-lamps-1407429638', 1, '2023/06/04 08:35:59'),
('cgk23', 'cgk23@gmail.com', '223123aA@', '2023/06/04 08:41:20', 'https://www.shutterstock.com/image-illustration/room-equipment-clinic-dermatology-cosmetology-3d-664883989', 1, '2023/06/04 08:50:59')

INSERT INTO Appointment
VALUES 
(1, 4, '2023/10/04 10:20:22'),
(2, 3, '2023/10/04 10:22:00') 

-- ALREADY HAVE DATA
SELECT * FROM dbo.Role
SELECT * FROM dbo.Diseases
SELECT * FROM dbo.TreatmentCourse
SELECT * FROM dbo.Users
SELECT * FROM dbo.Appointment

-- DO NOT HAVE DATA YET
SELECT * FROM dbo.Reviews
SELECT * FROM dbo.TreatmentProcess
SELECT * FROM dbo.post

-- DELETE DATA
DELETE FROM Users
WHERE 	id = 4
GO

DELETE FROM Appointment
WHERE idApp = 1
GO

-- RESEED IDENTITY & DBCC stands for Database Consistency Checker
DBCC CHECKIDENT ('Users', RESEED, 2)
DBCC CHECKIDENT ('Appointment', RESEED, 0)

-- This command works, but the masking does not appear.
ALTER TABLE [dbo].[Users]
ALTER COLUMN password ADD MASKED WITH (FUNCTION = 'default()');








