

-- FETCH USER DATA
CREATE PROCEDURE GetUserDetails
    @username NVARCHAR(50),
    @password NVARCHAR(50)
AS
BEGIN
    SELECT _UserName, _Name, _Country, _PhoneNumber, _Email, _IsAdmin
    FROM UserData
    WHERE _UserName = @username AND _Password = @password;
END

-- FETCH PLAYER DATA
CREATE PROCEDURE fetch_player_data
    @_PlayerID INT
AS
BEGIN
    SELECT _PlayerID, PlayerData._Name, TeamData._Name , _Age, _Country, _RoleName, _BatAvg, _BattingStyle, _BatRuns, _HS, _Matches, _BatInnings, _BatSR, _Hundreds, _Fifties, _BowlAvg, _BowlingStyle, _Wickets, _BowlRuns, _BBF, _BowlInnings, _BowlSR, _FiveWickets, _TenWickets, _LastMatchID
    FROM PlayerData
    JOIN TeamData
    ON PlayerData._TeamID = TeamData._TeamID
    JOIN RolesData
    ON PlayerData._RoleID = RolesData._RoleID
    JOIN FixtureData
    ON PlayerData._LastMatchID = FixtureData._FixtureID
    WHERE _PlayerID = @_PlayerID;
END;


-- FETCH TEAM DATA
CREATE PROCEDURE fetch_team_data
    @_TeamID INT
AS
BEGIN
    SELECT _TeamID, _Name, _Abbreviation, _Nick, _Wins, _Draws, _Loss, _RankingPoints, GroundData._Location, GroundData._Country, FixtureData._Date, SeriesData._Date
    FROM TeamData
    JOIN GroundData
    ON TeamData._HomeGroundID = GroundData._GroundID
    JOIN FixtureData
    ON TeamData._UpcomingFixtureID = FixtureData._FixtureID
    JOIN SeriesData
    ON TeamData._UpcomingSeriesID = SeriesData._SeriesID
    WHERE _TeamID = @_TeamID;
END;


-- FETCH MATCH DATA
CREATE PROCEDURE fetch_match_data
    @_FixtureID INT
AS
BEGIN
    SELECT _FixtureID, T1._Name AS Team1, T2._Name AS Team2, GroundData._Location, GroundData._Country, _Date
    FROM FixtureData
    JOIN TeamData AS T1
    ON FixtureData._Team1ID = T1._TeamID
    JOIN TeamData AS T2
    ON FixtureData._Team2ID = T2._TeamID
    JOIN GroundData
    ON FixtureData._VenueID = GroundData._GroundID
    WHERE _FixtureID = @_FixtureID;
END;

-- FETCH SERIES DATA
CREATE PROCEDURE fetch_series_data
    @_SeriesID INT
AS
BEGIN
    SELECT _SeriesID, T1._Name AS Team1, T2._Name AS Team2, GroundData._Location, GroundData._Country, _Date
    FROM SeriesData
    JOIN TeamData AS T1
    ON SeriesData._Team1ID = T1._TeamID
    JOIN TeamData AS T2
    ON SeriesData._Team2ID = T2._TeamID
    JOIN GroundData
    ON SeriesData._VenueID = GroundData._GroundID
    WHERE _SeriesID = @_SeriesID;
END;


-- FETCH NEWS DATA
CREATE PROCEDURE fetch_news_data
    @_Date DATETIME
AS
BEGIN
    SELECT _Headline, _Text, UserData._Name, _Date
    FROM NewsData
    JOIN UserData
    ON NewsData._UserID = UserData._UserName
    WHERE _Date = @_Date;
END;


-- ADD PLAYER
CREATE PROCEDURE add_player
    @_TeamID INT,
    @_Name VARCHAR(20),
    @_Age INT,
    @_Country VARCHAR(30),
    @_RoleID INT,
    @_BatAvg FLOAT,
    @_BattingStyle VARCHAR(30),
    @_BatRuns INT,
    @_HS INT,
    @_Matches INT,
    @_BatInnings INT,
    @_BatSR FLOAT,
    @_Hundreds INT,
    @_Fifties INT,
    @_BowlAvg FLOAT,
    @_BowlingStyle VARCHAR(30),
    @_Wickets INT,
    @_BowlRuns INT,
    @_BBF VARCHAR(30),
    @_BowlInnings INT,
    @_BowlSR FLOAT,
    @_FiveWickets INT,
    @_TenWickets INT,
    @_LastMatchID INT
AS
BEGIN
    INSERT INTO PlayerData (_TeamID, _Name, _Age, _Country, _RoleID, _BatAvg, _BattingStyle, _BatRuns, _HS, _Matches, _BatInnings, _BatSR, _Hundreds, _Fifties, _BowlAvg, _BowlingStyle, _Wickets, _BowlRuns, _BBF, _BowlInnings, _BowlSR, _FiveWickets, _TenWickets, _LastMatchID)
    VALUES (@_TeamID, @_Name, @_Age, @_Country, @_RoleID, @_BatAvg, @_BattingStyle, @_BatRuns, @_HS, @_Matches, @_BatInnings, @_BatSR, @_Hundreds, @_Fifties, @_BowlAvg, @_BowlingStyle, @_Wickets, @_BowlRuns, @_BBF, @_BowlInnings, @_BowlSR, @_FiveWickets, @_TenWickets, @_LastMatchID);
END;


-- ADD TEAM
CREATE PROCEDURE add_team
    @_Name VARCHAR(30),
    @_Abbreviation VARCHAR(3),
    @_HomeGroundID INT,
    @_Nick VARCHAR(30),
    @_UpcomingFixtureID INT,
    @_UpcomingSeriesID INT,
    @_Wins INT,
    @_Draws INT,
    @_Loss INT,
    @_RankingPoints INT
AS
BEGIN
    INSERT INTO TeamData (_Name, _Abbreviation, _HomeGroundID, _Nick, _UpcomingFixtureID, _UpcomingSeriesID, _Wins, _Draws, _Loss, _RankingPoints)
    VALUES (@_Name, @_Abbreviation, @_HomeGroundID, @_Nick, @_UpcomingFixtureID, @_UpcomingSeriesID, @_Wins, @_Draws, @_Loss, @_RankingPoints);
END;

-- ADD MATCH
CREATE PROCEDURE add_match
    @_Team1ID INT,
    @_Team2ID INT,
    @_Date DATETIME,
    @_VenueID INT
AS
BEGIN
    INSERT INTO FixtureData (_Team1ID, _Team2ID, _Date, _VenueID)
    VALUES (@_Team1ID, @_Team2ID, @_Date, @_VenueID);
END;

-- ADD SERIES
CREATE PROCEDURE add_series
    @_SeriesName VARCHAR(255),
    @_StartDate DATETIME,
    @_EndDate DATETIME,
    @_VenueID INT
AS
BEGIN
    INSERT INTO SeriesData (_SeriesName, _SeriesStartDate, _SeriesEndDate, _VenueID)
    VALUES (@_SeriesName, @_StartDate, @_EndDate, @_VenueID);
END;

-- ADD NEWS
CREATE PROCEDURE add_news
    @_Headline VARCHAR(100),
    @_Text VARCHAR(200),
    @_UserID VARCHAR(30)
AS
BEGIN
    DECLARE @_Date DATETIME;
    SET @_Date = GETDATE();
    INSERT INTO NewsData (_Headline, _Text, _UserID, _Date)
    VALUES (@_Headline, @_Text, @_UserID, @_Date);
END;


-- UPDATE PLAYER
CREATE PROCEDURE UpdatePlayerColumn
    @ColumnName NVARCHAR(100),
    @ID INT,
    @NewValue NVARCHAR(255)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    -- Constructing dynamic SQL to update the specified column
    SET @SQL = '
        UPDATE PlayerData
        SET ' + QUOTENAME(@ColumnName) + ' = @NewValue
        WHERE _PlayerID = @ID;';

    -- Executing the dynamic SQL
    EXEC sp_executesql @SQL,
                       N'@NewValue NVARCHAR(255), @ID INT',
                       @NewValue,
                       @ID;
END;

-- UPDATE TEAM
CREATE PROCEDURE UpdateTeamColumn
    @ColumnName NVARCHAR(100),
    @ID INT,
    @NewValue NVARCHAR(255)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    -- Constructing dynamic SQL to update the specified column
    SET @SQL = '
        UPDATE TeamData
        SET ' + QUOTENAME(@ColumnName) + ' = @NewValue
        WHERE _TeamID = @ID;';

    -- Executing the dynamic SQL
    EXEC sp_executesql @SQL,
                       N'@NewValue NVARCHAR(255), @ID INT',
                       @NewValue,
                       @ID;
END;

-- UPDATE MATCH
CREATE PROCEDURE UpdateMatchColumn
    @ColumnName NVARCHAR(100),
    @ID INT,
    @NewValue NVARCHAR(255)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    -- Constructing dynamic SQL to update the specified column
    SET @SQL = '
        UPDATE FixtureData
        SET ' + QUOTENAME(@ColumnName) + ' = @NewValue
        WHERE _SeriesID = @ID;';

    -- Executing the dynamic SQL
    EXEC sp_executesql @SQL,
                       N'@NewValue NVARCHAR(255), @ID INT',
                       @NewValue,
                       @ID;
END;


-- UPDATE SERIES
CREATE PROCEDURE UpdateSeriesColumn
    @ColumnName NVARCHAR(100),
    @ID INT,
    @NewValue NVARCHAR(255)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    -- Constructing dynamic SQL to update the specified column
    SET @SQL = '
        UPDATE SeriesData
        SET ' + QUOTENAME(@ColumnName) + ' = @NewValue
        WHERE _FixtureID = @ID;';

    -- Executing the dynamic SQL
    EXEC sp_executesql @SQL,
                       N'@NewValue NVARCHAR(255), @ID INT',
                       @NewValue,
                       @ID;
END;


-- DELETE PLAYER
CREATE PROCEDURE delete_player
    @_PlayerID INT
AS
BEGIN
    DELETE FROM PlayerData
    WHERE _PlayerID = @_PlayerID;
END;

-- DELETE TEAM
CREATE PROCEDURE delete_team
    @_TeamID INT
AS
BEGIN
    DELETE FROM TeamData
    WHERE _TeamID = @_TeamID;
END;

-- DELETE MATCH
CREATE PROCEDURE delete_match
    @_FixtureID INT
AS
BEGIN
    DELETE FROM FixtureData
    WHERE _FixtureID = @_FixtureID;
END;

-- DELETE SERIES
CREATE PROCEDURE delete_series
    @_SeriesID INT
AS
BEGIN
    DELETE FROM SeriesData
    WHERE _SeriesID = @_SeriesID;
END;

-- DELETE NEWS
CREATE PROCEDURE delete_news
    @_Date DATETIME
AS
BEGIN
    DELETE FROM NewsData
    WHERE _Date = @_Date;
END;
