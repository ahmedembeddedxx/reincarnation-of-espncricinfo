-- Use these standards while coding
-- Write Variable Names in this format '_variable_name'
-- Make sure to run the query on both MySQL Server and MsSQL Server on SQLite

CREATE DATABASE ESPNCricInfo;
USE ESPNCricInfo;

CREATE TABLE UserData
(
    _UserName VARCHAR(30),
    _Password VARCHAR(30) NOT NULL,
    _Name VARCHAR(30) NOT NULL,
    _Country VARCHAR(30),
    _PhoneNumber VARCHAR(30),
    _Email VARCHAR(30) NOT NULL,    
    _IsAdmin BIT NOT NULL,
    PRIMARY KEY (_UserName)
);

CREATE TABLE GroundData
(
    _GroundID INT IDENTITY(1,1),
    _Location VARCHAR(40) NOT NULL,
    _Country VARCHAR(30) NOT NULL,
    _AverageFirstInningsScore INT,
    _AverageSecondInningsScore INT,
    _AvgSwingDegrees FLOAT,
    _PitchRating FLOAT NOT NULL,  
    PRIMARY KEY (_GroundID)
);

CREATE TABLE RolesData
(
    _RoleID INT IDENTITY(1,1),
    _RoleName VARCHAR(30) NOT NULL,
    PRIMARY KEY (_RoleID)
);

CREATE TABLE FixtureData
(
    _FixtureID INT IDENTITY(1,1),
    _Team1ID INT NOT NULL,
    _Team2ID INT NOT NULL,
    _Date DATETIME NOT NULL,
    _VenueID INT,
    PRIMARY KEY (_FixtureID),
    FOREIGN KEY (_VenueID) REFERENCES GroundData(_GroundID) ON DELETE SET NULL
);

CREATE TABLE NewsData
(
    _Headline VARCHAR(100) NOT NULL,
    _Text VARCHAR(200) NOT NULL,
    _UserID VARCHAR(30),
    _Date DATETIME NOT NULL,
    PRIMARY KEY (_Date),
    FOREIGN KEY (_UserID) REFERENCES UserData(_UserName) ON DELETE SET NULL
);


CREATE TABLE SeriesData
(
    _SeriesID INT IDENTITY(1,1),
	_VenueID INT,
    _SeriesName NVARCHAR(255),
    _SeriesStartDate DATE,
    _SeriesEndDate DATE,
    _SeriesVenue NVARCHAR(255),
    PRIMARY KEY (_SeriesID),
    FOREIGN KEY (_VenueID) REFERENCES GroundData(_GroundID) ON DELETE SET NULL
);



CREATE TABLE TeamData
(    
    _Name VARCHAR(30) NOT NULL,
    _TeamID INT IDENTITY(1,1),
    _HomeGroundID INT,
    _Abbreviation VARCHAR(3) NOT NULL,
    _Nick VARCHAR(30),
    _UpcomingFixtureID INT,
    _UpcomingSeriesID INT,
    _Wins INT NOT NULL,
    _Draws INT NOT NULL,
    _Loss INT NOT NULL,
    _RankingPoints INT NOT NULL,
    PRIMARY KEY (_TeamID),
    FOREIGN KEY (_UpcomingFixtureID) REFERENCES FixtureData(_FixtureID) ON DELETE SET NULL,
    FOREIGN KEY (_UpcomingSeriesID) REFERENCES SeriesData(_SeriesID) ON DELETE SET NULL,
    FOREIGN KEY (_HomeGroundID) REFERENCES GroundData(_GroundID) ON DELETE SET NULL
);

CREATE TABLE PlayerData
(
    _PlayerID INT IDENTITY(1,1),
    _TeamID INT NOT NULL,
    _Name VARCHAR(20) NOT NULL,
    _Age INT NOT NULL,
    _Country VARCHAR(30) NOT NULL,
    _RoleID INT,
    -- Batting Stats
    _BatAvg FLOAT,
    _BattingStyle VARCHAR(30),
    _BatRuns INT,
    _HS INT,
    _Matches INT,
    _BatInnings INT,
    _BatSR FLOAT,
    _Hundreds INT,
    _Fifties INT,
    -- Bowling Stats
    _BowlAvg FLOAT,
    _BowlingStyle VARCHAR(30),
    _Wickets INT,
    _BowlRuns INT,
    _BBF VARCHAR(30),
    _BowlInnings INT,
    _BowlSR FLOAT,
    _FiveWickets INT,
    _TenWickets INT,
    
    _LastMatchID INT,

    PRIMARY KEY (_PlayerID),
    FOREIGN KEY (_LastMatchID) REFERENCES FixtureData(_FixtureID) ON DELETE SET NULL,
    FOREIGN KEY (_TeamID) REFERENCES TeamData(_TeamID) ON DELETE CASCADE,
    FOREIGN KEY (_RoleID) REFERENCES RolesData(_RoleID) ON DELETE SET NULL
);


-- CONSTRAINTS

--USER DATA--
ALTER TABLE UserData
ADD CONSTRAINT CHK_IsAdmin CHECK (_IsAdmin IN (0, 1));

--FixtureData--
ALTER TABLE FixtureData
ADD CONSTRAINT team1team2unique UNIQUE (_Team1ID,_Team2ID);

--TeamData Table--
ALTER TABLE	TeamData
ADD CONSTRAINT check_negWins CHECK (_Wins>=0);

ALTER TABLE	TeamData
ADD CONSTRAINT check_negdraws CHECK (_Draws>=0);

ALTER TABLE	TeamData
ADD CONSTRAINT check_negloss CHECK (_Loss>=0);

ALTER TABLE	TeamData
ADD CONSTRAINT check_negpoints CHECK (_RankingPoints>=0);

--PlayerData table--

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_age_non_negative CHECK (_Age >= 12);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_BatAvg_non_negative CHECK (_BatAvg >= 0 OR _BatAvg IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_BatRun_non_negative CHECK (_BatRuns >= 0 OR _BatRuns IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_Batinnings_non_negative CHECK (_BatInnings >= 0 OR _BatInnings IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_BatSR_non_negative CHECK (_BatSR >= 0 AND _BatSR<=600 OR _BatSR IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_hundreds_non_negative CHECK (_Hundreds >= 0 OR _Hundreds IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_fifties_non_negative CHECK (_Fifties >= 0 OR _Fifties IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_bowlavg_non_negative CHECK (_BowlAvg >= 0 OR _BowlAvg IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_wickets_non_negative CHECK (_Wickets >= 0 OR _Wickets IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_BlowRuns_non_negative CHECK (_BowlRuns >= 0 OR _BowlRuns IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_Bowlinnings_non_negative CHECK (_BowlInnings >= 0 OR _BowlInnings IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_FiveW_non_negative CHECK (_FiveWickets >= 0 OR _FiveWickets IS NULL);

ALTER TABLE PlayerData
ADD CONSTRAINT CHK_TenW_non_negative CHECK (_TenWickets >= 0 OR _TenWickets IS NULL);