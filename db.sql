create database dormbi_db default character set utf8;

use dormbi_db;

create table USER (
    UserID varchar(20),
    UserPW varchar(200) NOT NULL,
    UserNAME varchar(15) NOT NULL,
    UserNO decimal(4) UNIQUE NOT NULL,
    UserTEL varchar(15),
    UserP_TEL varchar(15),
    UserLOC varchar(10),
    constraint PK_ID primary key(UserID)
);

create table ROOM (
    RoomNO decimal(4),
    RoomFloor decimal(1) NOT NULL,
    RoomNum decimal(2) NOT NULL,
    WashNum SMALLINT NOT NULL,
    WashDay SMALLINT NOT NULL,
    WashTime SMALLINT NOT NULL,
    constraint PK_RoomNO primary key(RoomNO)
);


INSERT INTO ROOM VALUES
(415, 4, 15, 3, 2, 3),
(416, 4, 16, 2, 3, 3)
;

create table student (
    StuNO decimal(4),
    StuName varchar(20) NOT NULL,
    StuRoom decimal(3) NOT NULL,
    good int default 0,
    bad int default 0,
    constraint PK_NO primary key(StuNO),
    constraint FK_RoomNO foreign key(StuRoom) references ROOM(RoomNO)
);

INSERT INTO student VALUES 
(2104, "김유나", 415, 0, 0), 
(2107, "김하진", 415, 0, 0),
(2110, "엄지윤", 415,0 ,0 ),
(2113, "윤채원", 416, 0, 0),
(2117, "조해정", 416, 0, 0),
(2119, "황예림", 416, 0 ,0)
;


