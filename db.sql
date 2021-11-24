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
(401, 4, 1, 1, 1, 2),
(402, 4, 2, 2, 1, 2),
(403, 4, 3, 3, 1, 2),
(404, 4, 4, 2, 1, 3),
(405, 4, 4, 1, 2, 2),
(406, 4, 6, 2, 2, 2),
(407, 4, 7, 3, 2, 2),
(408, 4, 8, 1, 2, 3),
(409, 4, 9, 1, 3, 2),
(410, 4, 10, 2, 3, 2),
(411, 4, 11, 3, 3, 2),
(412, 4, 12, 1, 3, 2),
(413, 4, 13, 1, 4, 2),
(414, 4, 13, 3, 1, 3),
(415, 4, 15, 3, 2, 3),
(416, 4, 16, 2, 3, 3),
(417, 4, 17, 2, 4, 2),
(418, 4, 18, 3, 4, 2)
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

INSERT INTO student (StuNO, StuName, StuRoom) VALUES
(1102, "김윤서", 401),
(1103, "배서연", 401),
(1104, "백지민", 401),
(1106, "양다연", 401),
(1108, "이예진", 402),
(1109, "이주완", 402),
(1112, "정가현", 402),
(1113, "정현진", 402),
(1114, "조예서", 403),
(1201, "곽경희", 403),
(1202, "권하은", 403),
(1203, "임수연", 403),
(1209, "박승채", 404),
(1210, "안주연", 404),
(1213, "임수연", 404), 
(1215, "편은진", 404),
(1308, "이해령", 405),
(1309, "임재연", 405),
(1310, "최가을", 405),
(1311, "최원서", 405),
(1312, "최혜민", 406),
(1313, "하도연", 406),
(1314, "황채민", 406),
(1403, "김유진", 406),
(1404, "박선주", 407),
(1410, "임수민", 407),
(1412, "최승빈", 407),
(1413, "최윤영", 407),
(1414, "하진", 408),
(1501, "김다정", 408),
(1503, "김보경", 408),
(1504, "김소리", 408),
(1507, "맹선주", 409),
(1508, "박서윤", 409),
(1509, "박하은", 409),
(1510, "엄희주", 409),
(1512, "이미란", 410),
(1516, "장정원", 410),
(1517, "차수빈", 410),
(1518, "최이나", 410),
(1603, "구수연", 411),
(1606, "민지원", 411),
(1607, "박민지", 411),
(1609, "박이겸", 411),
(1611, "오은채", 412),
(1613, "이유리", 412),
(1614, "이재원", 412),
(1615, "이현정", 412),
(1616, "전수연", 413),
(1617, "정다예", 413),
(1619, "정유진", 413),
(1620, "황수빈", 413),
(1402, "김비야", 414),
(2209, "박수연", 414),
(2211, "유현아", 414),
(2104, "김유나", 415), 
(2107, "김하진", 415),
(2110, "엄지윤", 415),
(2113, "윤채원", 416),
(2117, "조해정", 416),
(2119, "황예림", 416),
(2201, "가연우", 417),
(2204, "김세린", 417),
(2206, "김찬희", 417)
;

CREATE TABLE wash (
    RoomNO decimal(4) NOT NULL,
    WashNum SMALLINT NOT NULL,
    WashTime SMALLINT NOT NULL,
    date varchar(15) NOT NULL,
    constraint FK_washRoomNO foreign key(RoomNO) references ROOM(RoomNO)
);
