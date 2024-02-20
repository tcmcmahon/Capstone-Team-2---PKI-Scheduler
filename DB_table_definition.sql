CREATE TABLE Stage_Course_Sheet(
  Course_Header VARCHAR(100),
  Term VARCHAR(12),
  Term_Code INT,
  Department_Code CHAR(8),
  Subject_Code CHAR(4),
  Catalog_Number INT,
  Course CHAR(9),
  Section_Num INT,
  Course_Title VARCHAR(80),
  Section_Type VARCHAR(20),
  Title_Topic VARCHAR(30),
  Meeting_Pattern VARCHAR(20),
  Meetings VARCHAR(20),
  Instructor VARCHAR(280),
  Room VARCHAR(90),
  Status VARCHAR(10),
  Session VARCHAR(30),
  Campus VARCHAR(20),
  Inst_Method VARCHAR(20),
  Integ_Partner VARCHAR(100),
  Schedule_Print VARCHAR(4),
  Consent VARCHAR(30),
  Credit_Hrs_Min SMALLINT,
  Credit_Hrs SMALLINT,
  Grade_Mode VARCHAR(30),
  Attributes VARCHAR(256),
  Course_Attributes VARCHAR(200),
  Room_Attributes VARCHAR(256),
  Enrollment INT,
  Maximum_Enrollment INT,
  Prior_Enrollment INT,
  Projected_Enrollment INT,
  Wait_Cap INT,
  Rm_Cap_Request INT,
  Cross_listings VARCHAR(64),
  Cross_list_Maximum INT,
  Cross_list_Projected INT,
  Cross_list_Wait_Cap INT,
  Cross_list_Rm_Cap_Request INT,
  Link_To VARCHAR(50),
  Comments VARCHAR(256),
  Notes_1 VARCHAR(256),
  Notes_2 VARCHAR(256)
)

CREATE TABLE RoomsList(
  Room_Number VARCHAR(20),
  Displays VARCHAR(50),
  Connectivity_Info VARCHAR(100),
  Special_Attributes VARCHAR(256),
  Seats INT,
  Computers INT
)

CREATE TABLE CourseLookup(
  Orig_Course CHAR(9),
  CoList_Course CHAR(9)
)