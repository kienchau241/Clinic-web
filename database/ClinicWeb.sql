create database ClinicWeb

create table Role(
	id		int primary key,
	name	varchar(10)
)

insert into Role (id,name)
values
(1, 'Patient'),
(2, 'Doctor'),
(3, 'Admin')

create table Users(
	id int identity (1,1) primary key     not null,
	username	varchar(100) not null,
	email		varchar(100) not null,
	password	varchar(100) not null,
	passwordAt	varchar(100) not null,
	photo		varchar(300) not null,
	role		int foreign key references Role(id) default 1 not null,
	createdAt	Datetime default CURRENT_TIMESTAMP not null
)

create table TreatmentCourse(
	id              int identity (1,1) primary key     not null,
	name		varchar(50) not null, 
	description	varchar(max) not null,
	ratingsAverage  float default 4.5 CHECK (RatingsAverage >= 0 AND ratingsAverage <= 5),
    ratingsQuantity int default 0 CHECK (RatingsQuantity >= 0),
	price		int not null,
	createdAt	datetime default CURRENT_TIMESTAMP not null,	
)

INsert into TreatmentCourse
values
(1,'xa tri', 'des cua course',4.5,100,500000,'20120618 10:34:09 AM')

create table Reviews	
(
    id			int identity (1,1) primary key            not null,
    review		varchar(max)                              not null,
    rating		int CHECK (rating >= 0 AND rating <= 5),
    TreatmentId    int foreign key references TreatmentCourse(id) not  null,
    userId		int foreign key references Users(id) not null,
    createdAt	datetime default CURRENT_TIMESTAMP        not null,
)


create table Diseases(
	idDis		int identity (1,1) primary key     not null,
	nameDis		varchar(100) not null,
	Cause		varchar(300) not null,
	Conditions	varchar(300) not null,
)

insert into Diseases
values
('Ung thu Phoi', 'hut thuoc, o nhiem khong khi', 'ho ra mau')

select * from Diseases

ALTER TABLE TreatmentCourse
    ADD idDis int,
    FOREIGN KEY(idDis) REFERENCES Diseases(idDis);

create table TreatmentProcess(
	UserId	int foreign key references Users(id),
	TreatmentCourseId	int foreign key references TreatmentCourse(id),
) 

create table post(
	id int identity (1,1) primary key     not null,
	title varchar(200) not null,
	content varchar(max)   not null,
	UserId	int foreign key references Users(id)   not null,
	postTime	datetime default CURRENT_TIMESTAMP        not null	
)

create table Appointment(
	idApp	int identity (1,1) primary key,
	PatientId	int foreign key references Users(id)   not null,
	Doctorid	int foreign key references Users(id)   not null,
	AppTime		datetime default CURRENT_TIMESTAMP not null	
)





