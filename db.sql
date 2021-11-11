create database dormbi_db default character set utf8;

use dormbi_db;

create table USER (
UserID varchar(20),
UserPW varchar(20) NOT NULL,
UserNAME varchar(15) NOT NULL,
UserNO decimal(4) UNIQUE,
UserTEL varchar(15),
UserP_TEL varchar(15),
UserLOC varchar(10),
constraint PK_ID primary key(UserID)
);