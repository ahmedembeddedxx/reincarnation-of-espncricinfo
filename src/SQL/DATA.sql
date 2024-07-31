USE ESPNCricInfo;


-- UserData
INSERT INTO UserData (_UserName, _Password, _Name, _Country, _PhoneNumber, _Email, _IsAdmin) 
VALUES 
('johndoe', 'password123', 'John Doe', 'USA', '+1234567890', 'john.doe@example.com', 1),
('janesmith', 'pass456', 'Jane Smith', 'UK', '+9876543210', 'jane.smith@example.com', 0),
('alicee', 'abc123', 'Alice Johnson', 'Canada', NULL, 'alice.johnson@example.com', 0),
('mjhonson', 'pass789', 'Michael Johnson', 'Australia', '+61412345678', 'michael.johnson@example.com', 0),
('emmawilson', 'qwerty', 'Emma Wilson', 'Canada', '+15551234567', 'emma.wilson@example.com', 0),
('danbrown', 'pass123', 'Daniel Brown', 'UK', '+447890123456', 'daniel.brown@example.com', 1),
('sophlee', 'pass456', 'Sophia Lee', 'USA', '+12015551234', 'sophia.lee@example.com', 0),
('noahtay', 'password', 'Noah Taylor', 'India', '+910987654321', 'noah.taylor@example.com', 0),
('whiteolivia', 'abc123', 'Olivia White', 'New Zealand', '+64021234567', 'olivia.white@example.com', 0),
('martinez', 'secret', 'William Martinez', 'South Africa', '+270112345678', 'william.martinez@example.com', 0);

-- GroundData
INSERT INTO GroundData (_Location, _Country, _AverageFirstInningsScore, _AverageSecondInningsScore, _AvgSwingDegrees, _PitchRating) 
VALUES 
('Lahore Stadium', 'Pakistan', 250, 230, 12.5, 8.7),
('Sydney Cricket Ground', 'Australia', 280, 260, 8.2, 9.1),
('Lord''s Cricket Ground', 'UK', 270, 250, 9.5, 9.3),
('MCG', 'Australia', 290, 270, 9.8, 8.9),
('Eden Gardens', 'India', 260, 240, 7.5, 8.6),
('Newlands Cricket Ground', 'South Africa', 270, 250, 8.3, 8.8),
('Edgbaston', 'UK', 275, 255, 9.1, 9.0),
('Dubai International Cricket Stadium', 'UAE', 250, 230, 10.5, 8.7),
('Seddon Park', 'New Zealand', 255, 235, 7.8, 8.5),
('Kensington Oval', 'West Indies', 280, 260, 9.2, 8.9),
('Galle International Stadium', 'Sri Lanka', 245, 225, 6.9, 8.3),
('Sher-e-Bangla National Cricket Stadium', 'Bangladesh', 255, 235, 8.1, 8.6),
('National Stadium', 'Pakistan', 265, 245, 8.5, 8.8);

-- RolesData
INSERT INTO RolesData (_RoleName)
VALUES 
('Batsman'),
('Bowler'),
('All-Rounder'),
('Wicketkeeper'),
('Spinner'),
('Fast Bowler'),
('Captain');

-- NewsData
INSERT INTO NewsData (_Headline, _Text, _UserID, _Date) 
VALUES 
('Exciting match ahead!', 'Pakistan vs India promises to be a thrilling encounter.', 'johndoe', '2024-03-14 15:30:00'),
('New player signed', 'Lahore Qalendars signs a promising young talent.', 'alicee', '2024-03-17 11:45:00'),
('Player of the match announced', 'Babar Azam from Team1 awarded Player of the Match.', 'johndoe', '2024-03-24 16:45:00'),
('New contract signed', 'IPL extends contract with their star player.', 'noahtay', '2024-03-27 10:15:00'),
('Team rankings updated', 'Team rankings for the upcoming series have been announced.', 'johndoe', '2024-03-30 14:00:00'),
('Injury update', 'Faheem Ashraf sidelined due to injury.', 'whiteolivia', '2024-04-03 11:30:00'),
('Match postponed', 'Fixture between New Zealand and Afghanistan postponed due to weather conditions.', 'sophlee', '2024-04-06 09:45:00');

-- FixtureData
INSERT INTO FixtureData (_Team1ID, _Team2ID, _Date, _VenueID) 
VALUES 
(1, 2, '2024-03-15 10:00:00', 1),
(3, 4, '2024-03-18 09:30:00', 2),
(5, 6, '2024-03-22 11:00:00', 3),
(7, 8, '2024-03-25 14:30:00', 5),
(9, 10, '2024-03-28 09:00:00', 6),
(1, 4, '2024-04-02 10:30:00', 9),
(8, 3, '2024-04-05 13:00:00', 2);

-- SeriesData
INSERT INTO SeriesData (_VenueID, _SeriesName, _SeriesStartDate, _SeriesEndDate, _SeriesVenue) 
VALUES 
(1,'Ashes Test Series', '2024-07-01', '2024-08-15', 'Lord''s Cricket Ground'),
    (2,'Indian Premier League', '2024-04-01', '2024-05-30', 'Wankhede Stadium'),
    (3,'Big Bash League', '2024-12-15', '2025-01-30', 'Melbourne Cricket Ground'),
    (1,'T20 World Cup', '2024-10-15', '2024-11-15', 'Eden Gardens'),
    (3,'Pakistan Super League', '2025-02-01', '2025-03-15', 'Gaddafi Stadium');


-- TeamData
INSERT INTO TeamData (_Name, _Abbreviation, _HomeGroundID, _Nick, _UpcomingFixtureID, _UpcomingSeriesID, _Wins, _Draws, _Loss, _RankingPoints) 
VALUES 
('Pakistan', 'PAK', 1, 'Shaheens', 1, 1, 10, 5, 3, 450),
('India', 'IND', 5, 'Blues', 1, 1, 8, 7, 3, 400),
('Afghanistan', 'AFG', 13, 'Afghanistan A', 2, 2, 5, 8, 5, 350),
('Australia', 'AUS', 2, 'Kangaroos', 2, 2, 7, 6, 5, 380),
('New Zealand', 'NZE', 9, 'Kiwis', 3, 3, 6, 8, 4, 360),
('Sri Lanka', 'SLC', 11, 'Loins', 3, 3, 9, 4, 5, 420),
('Bangladesh', 'BAN', 12, 'Tigers', 4, 4, 8, 5, 5, 400),
('England', 'ENG', 3, 'Loins', 4, 4, 5, 7, 6, 370),
('South Africa', 'SA', 6, 'Proteas', 5, 5, 4, 10, 4, 350),
('West Indies', 'WI', 10, 'Windies', 5, 5, 6, 6, 6, 380);

-- PlayerData
INSERT INTO PlayerData (_TeamID, _Name, _Age, _Country, _RoleID, _BatAvg, _BattingStyle, _BatRuns, _HS, _Matches, _BatInnings, _BatSR, _Hundreds, _Fifties, _BowlAvg, _BowlingStyle, _Wickets, _BowlRuns, _BBF, _BowlInnings, _BowlSR, _FiveWickets, _TenWickets, _LastMatchID) 
VALUES 
(1, 'Babar Azam', 28, 'Pakistan', 1, 42.5, 'Right-handed', 1800, 150, 40, 45, 120.5, 5, 15, 28.7, 'Right-arm fast', 80, 1600, '5/40', 60, 30.5, 4, NULL, 1),
(1, 'Adam Zampa', 30, 'Australia', 2, 38.7, 'Left-handed', 2100, 180, 55, 50, 115.2, 6, 10, 25.8, 'Right-arm off-spin', 60, 1500, '6/35', 55, 28.3, 3, NULL, 2),
(2, 'Virat Kohli', 25, 'India', 3, 45.2, 'Right-handed', 1900, 160, 45, 42, 130.9, 4, 20, 31.5, 'Left-arm fast', 70, 1700, '4/28', 50, 32.6, NULL, NULL, 1),
(3, 'Faf du Plesis', 32, 'South Africa', 1, 40.2, 'Right-handed', 2200, 170, 48, 47, 118.3, 8, 12, 29.5, 'Left-arm orthodox', 65, 1800, '5/38', 55, 30.2, 4, NULL, 2),
(4, 'Jos Butler', 27, 'England', 2, 37.8, 'Right-handed', 2000, 150, 42, 40, 115.6, 6, 15, 26.8, 'Leg-break', 70, 1900, '6/42', 60, 28.5, 3, NULL, 3),
(5, 'Bryan Lara', 29, 'West Indies', 3, 43.5, 'Left-handed', 2300, 190, 50, 48, 125.5, 7, 18, 32.7, 'Right-arm fast-medium', 80, 2000, '4/25', 55, 31.0, 5, NULL, 4),
(6, 'Mitchell Santner', 31, 'New Zealand', 4, 39.6, 'Right-handed', 2100, 160, 45, 43, 120.8, 5, 20, 30.1, 'Off-spin', 60, 1700, '5/30', 50, 32.2, NULL, NULL, 3),
(7, 'Mushfiqur Rahim', 26, 'Bangladesh', 1, 41.3, 'Left-handed', 1900, 140, 38, 35, 122.4, 4, 22, 27.9, 'Left-arm fast-medium', 70, 1850, '4/28', 58, 29.5, NULL, NULL, 2),
(8, 'Kusal Mendis', 30, 'Sri Lanka', 2, 36.8, 'Right-handed', 1800, 130, 35, 33, 110.9, 3, 25, 25.0, 'Leg-spin', 55, 1950, '5/35', 53, 31.8, 2, NULL, 1),
(9, 'Shaheen Afridi', 28, 'Pakistan', 3, 42.0, 'Left-handed', 2050, 155, 40, 38, 125.2, 5, 19, 28.3, 'Right-arm medium', 65, 1750, '4/22', 54, 30.5, 3, NULL, 4),
(10, 'Jasprit Bumrah', 29, 'India', 4, 38.9, 'Right-handed', 1950, 145, 38, 36, 115.7, 4, 21, 27.5, 'Off-spin', 60, 1900, '6/30', 57, 29.9, NULL, NULL, 5);



SELECT * FROM UserData;
SELECT * FROM GroundData;
SELECT * FROM RolesData;
SELECT * FROM NewsData;
SELECT * FROM FixtureData;
SELECT * FROM SeriesData;
SELECT * FROM TeamData;
SELECT * FROM PlayerData;

