from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
from werkzeug.security import check_password_hash, generate_password_hash
import platform
from datetime import datetime
from getpass import getpass

app = Flask(__name__)
CORS(app)

server = 'ahmedhost.database.windows.net'
database = 'ESPNCricInfo'
username = 'ahmedsql'
password = "pancakes123$$"

if platform.system() == 'Windows':
    driver = '{ODBC Driver 17 for SQL Server}'
else:
    driver = '/opt/homebrew/lib/libmsodbcsql.17.dylib'

# Create a connection
conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)

# Create a cursor object
cursor = conn.cursor()


global_user_name = 'alicee'
#login
@app.route('/api/authenticate', methods=['POST'])
def authenticate():
    # Get data from the request body
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Execute the stored procedure
    cursor.execute('EXEC GetUserDetails @username = ?, @password = ?', (username, password))
    result = cursor.fetchone()
    global_user_name = result[0]

    if result:

        user_data = {
            'username': result[0],
            'name': result[1],
            'country': result[2],
            'phone_number': result[3],
            'email': result[4],
            'is_admin': result[5]
        }
        # Return success response with user data
        return jsonify({'success': True, 'user_data': user_data})
    else:
        # Return failure response
        return jsonify({'success': False, 'message': 'Invalid credentials'})


#series
@app.route('/api/series', methods=['GET'])
def get_series_data():
    try:

        query = '''
            SELECT 
                _SeriesID AS SeriesID,
                _VenueID AS VenueID,
                _SeriesName AS SeriesName,
                _SeriesStartDate AS SeriesStartDate,
                _SeriesEndDate AS SeriesEndDate,
                _Location AS SeriesVenue
            FROM SeriesData join GroundData on _VenueID = _GroundID;
        '''

        cursor.execute(query)
        data = cursor.fetchall()

        columns = [column[0] for column in cursor.description]
        data_list = [dict(zip(columns, row)) for row in data]


        return jsonify(data_list)
    except Exception as e:
        print("Error fetching series data:", e)
        return jsonify([])

#Team
@app.route('/api/teams', methods=['GET'])
def get_team_data():
    query = '''
        SELECT 
            _Name AS TeamName,
            _TeamID AS TeamID,
            GroundData._Location AS HomeGroundID,
            _Abbreviation AS Abbreviation,
            _Nick AS Nickname,
            FixtureData._Date AS UpcomingFixtureID,
            SeriesData._SeriesName AS UpcomingSeriesID,
            _Wins AS Wins,
            _Draws AS Draws,
            _Loss AS Losses,
            _RankingPoints AS RankingPoints
        FROM TeamData
        JOIN GroundData 
        ON TeamData._HomeGroundID = GroundData._GroundID
        JOIN FixtureData
        ON TeamData._UpcomingFixtureID = FixtureData._FixtureID
        JOIN SeriesData
        ON TeamData._UpcomingSeriesID = SeriesData._SeriesID;
    '''


    # Execute the query
    cursor.execute(query)
    data = cursor.fetchall()

    # Convert the data to a list of dictionaries
    columns = [column[0] for column in cursor.description]
    data_list = [dict(zip(columns, row)) for row in data]

    # Return the data list as a JSON response
    return jsonify(data_list)
@app.route('/api/addteams', methods=['POST'])
def add_team():
    try:
        # Extract team data from request body
        data = request.get_json()
        _Name = data.get('_Name')
        _Abbreviation = data.get('_Abbreviation')
        _HomeGroundID = data.get('_HomeGroundID')
        _Nick = data.get('_Nick')
        _UpcomingFixtureID = data.get('_UpcomingFixtureID')
        _UpcomingSeriesID = data.get('_UpcomingSeriesID')
        _Wins = data.get('_Wins')
        _Draws = data.get('_Draws')
        _Loss = data.get('_Loss')
        _RankingPoints = data.get('_RankingPoints')

        # Execute the stored procedure to add the team
        cursor.execute(
            "EXEC add_team ?,?,?,?,?,?,?,?,?,?",(
                _Name,
                _Abbreviation,
                _HomeGroundID,
                _Nick,
                _UpcomingFixtureID,
                _UpcomingSeriesID,
                _Wins,
                _Draws,
                _Loss,
                _RankingPoints
            )
        )

        
        # Commit the transaction
        conn.commit()
        
        # Return a success response
        return jsonify({'message': 'Team added successfully'}), 201
    
    except Exception as e:
        # If an error occurs, return an error response
        return jsonify({'error': str(e)}), 400


#Matches
@app.route('/api/matches', methods=['GET'])
def get_match_data():
    # Define the SQL query to fetch data from the MatchData table
    query = '''
        SELECT 
            m._FixtureID AS MatchID,
            t1._Name AS Team1,
            t2._Name AS Team2,
            m._Date AS MatchDate,
            v._Location AS MatchVenue
        FROM FixtureData m
        JOIN TeamData t1 ON m._Team1ID = t1._TeamID
        JOIN TeamData t2 ON m._Team2ID = t2._TeamID
        JOIN GroundData v ON m._VenueID = v._GroundID
    '''
    cursor.execute(query)
    data = cursor.fetchall()

    # Convert the data to a list of dictionaries
    columns = [column[0] for column in cursor.description]
    data_list = [dict(zip(columns, row)) for row in data]

    # Return the data list as a JSON response
    return jsonify(data_list)

#Players
@app.route('/api/players',methods=['GET'])
def get_Playerdata():
    query = '''
        SELECT PlayerData._Name AS PlayerName, 
               TeamData._Name AS PlayerTeam, 
               _RoleName AS PlayerRole,
               _Matches AS PlayerMatches,
               _BatRuns AS PlayerRuns,
               PlayerData._BatAvg as BatAvg,
               PlayerData._BattingStyle as BatStyle,
               PlayerData._HS as HighestScore,
               _Wickets AS PlayerWickets,
               _Age AS PlayerAge,
               _PlayerID as PlayerID,
               PlayerData.*
        FROM PlayerData 
        join TeamData on PlayerData._TeamID = TeamData._TeamID
        join RolesData on RolesData._RoleID = PlayerData._RoleID
        order by PlayerID;
    '''
    

    cursor.execute(query)
    data = cursor.fetchall()
    # Query the data from SQL Server
    # Convert data to a list of dictionaries
    columns = [column[0] for column in cursor.description]
    data_list = [dict(zip(columns, row)) for row in data]
    return jsonify(data_list)



@app.route('/api/addplayers',methods=['POST']) 
def insert_player():
    # Get data from the request body
    data = request.json
    
    # Extract the data to pass as parameters to the stored procedure
    team_id = data.get('_TeamID')
    name = data.get('_Name')
    age = data.get('_Age')
    country = data.get('_Country')
    role_id = data.get('_RoleID')
    bat_avg = data.get('_BatAvg')
    batting_style = data.get('_BattingStyle')
    bat_runs = data.get('_BatRuns')
    hs = data.get('_HS')
    matches = data.get('_Matches')
    bat_innings = data.get('_BatInnings')
    bat_sr = data.get('_BatSR')
    hundreds = data.get('_Hundreds')
    fifties = data.get('_Fifties')
    bowl_avg = data.get('_BowlAvg')
    bowling_style = data.get('_BowlingStyle')
    wickets = data.get('_Wickets')
    bowl_runs = data.get('_BowlRuns')
    bbf = data.get('_BBF')
    bowl_innings = data.get('_BowlInnings')
    bowl_sr = data.get('_BowlSR')
    five_wickets = data.get('_FiveWickets')
    ten_wickets = data.get('_TenWickets')
    last_match_id = data.get('_LastMatchID')

    try:
        cursor.execute(
            'EXEC add_player ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?',
            (
                team_id,
                name,
                age,
                country,
                role_id,
                bat_avg,
                batting_style,
                bat_runs,
                hs,
                matches,
                bat_innings,
                bat_sr,
                hundreds,
                fifties,
                bowl_avg,
                bowling_style,
                wickets,
                bowl_runs,
                bbf,
                bowl_innings,
                bowl_sr,
                five_wickets,
                ten_wickets,
                last_match_id
            )
        )
        conn.commit()
        return jsonify({'success': True, 'message': 'Player added successfully.'}), 200
    except pyodbc.Error as error:
        conn.rollback()
        print('Error:', error)
        return jsonify({'success': False, 'message': 'Failed to add player.'}), 500


#Add Series
@app.route('/api/addseries', methods=['POST'])
def add_series():
    try:
        # Extract series data from request body
        data = request.get_json()
        SeriesName = data.get('_SeriesName')
        EndDate = data.get('_EndDate')
        StartDate = data.get('_StartDate')
        _VenueID = data.get('_VenueID')

        # Execute the stored procedure to add the series
        cursor.execute(
            "EXEC add_series ?, ?, ?, ?",
            (SeriesName, StartDate, EndDate, _VenueID)
        )

        # Commit the transaction
        conn.commit()

        # Return a success response
        return jsonify({'message': 'Series added successfully'}), 201
    
    except Exception as e:
        # If an error occurs, return an error response
        return jsonify({'error': str(e)}), 400



@app.route('/api/addmatches', methods=['POST'])
def add_match():
    try:
        # Extract match data from the request body
        data = request.get_json()
        team1_id = data.get('_Team1ID')
        team2_id = data.get('_Team2ID')
        date = data.get('_Date')
        venue_id = data.get('_VenueID')

        # Execute the stored procedure to add the match
        cursor.execute(
            'EXEC add_match ?, ?, ?, ?',
            (team1_id, team2_id, date, venue_id)
        )
        
        # Commit the transaction
        conn.commit()
        
        # Return a success response
        return jsonify({'message': 'Match added successfully'}), 201
    
    except Exception as e:
        # If an error occurs, return an error response
        return jsonify({'error': str(e)}), 400
    

@app.route('/api/news', methods=['GET'])
def fetch_news_data():
    
    # Define the query to fetch news data, including headline, text, date, and player name
    query = """
        SELECT NewsData._Headline AS headline,
               NewsData._Text AS text,
               NewsData._Date AS date,
               UserData._Name AS playername
        FROM NewsData
        JOIN UserData ON NewsData._UserID = UserData._UserName;
    """
    
    # Execute the query
    cursor = conn.execute(query)
    news_rows = cursor.fetchall()
    
    # Convert the rows to a list of dictionaries
    news_data = []
    for row in news_rows:
        news_data.append({
            "headline": row.headline,
            "text": row.text,
            "date": row.date,
            "playername": row.playername
        })
    return jsonify(news_data)


@app.route('/api/addnews', methods=['POST'])
def add_news():
    try:
        # Extract news data from request body
        data = request.get_json()
        headline = data.get('_Headline')
        text = data.get('_Text')
        user_id = global_user_name
        
        

        # Execute the stored procedure to add the news entry
        cursor.execute(
            'EXEC add_news ?, ?, ?',
            (headline, text, user_id)
        )
        
        # Commit the transaction
        conn.commit()
        
        # Return a success response
        return jsonify({'message': 'News added successfully'}), 201
    
    except Exception as e:
        # If an error occurs, return an error response
        print(f"Error adding news: {e}")
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/getplayercolumns', methods=['GET'])
def fetch_player_columns():
    try:
        # Get column names from PlayerData table
        cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'PlayerData'")
        columns = [row[0] for row in cursor.fetchall()]

        # Return column names as JSON response
        return jsonify({'columns': columns})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    

@app.route('/api/updateplayercolumns',methods=['POST'])
def update_player():
    try:
        data = request.get_json()
        columnName = data.get('columnName')
        ID = data.get('id')
        newValue = data.get('newValue')  # Corrected from `date` to `data`

        cursor.execute("EXEC UpdatePlayerColumn ?, ?, ?", (columnName, ID, newValue))
        conn.commit()
        return jsonify({'message': 'Player updated successfully'}), 201
    
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/getteamcolumns', methods=['GET'])
def fetch_team_column():
    try:
        # Get column names from PlayerData table
        cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'TeamData'")
        columns = [row[0] for row in cursor.fetchall()]

        # Return column names as JSON response
        return jsonify({'columns': columns})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/updateteamcolumns',methods=['POST'])
def update_team():
    try:
        data = request.json
        column_name = data.get('columnName')
        team_id = data.get('id')
        new_value = data.get('newValue')

        # Execute the stored procedure to update the column
        cursor.execute("EXEC UpdateTeamColumn ?, ?, ?", (column_name, team_id, new_value))
        conn.commit()

        return jsonify({'message': 'Team column updated successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/getseriescolumns', methods=['GET'])
def fetch_series_column():
    try:
        # Get column names from PlayerData table
        cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'SeriesData'")
        columns = [row[0] for row in cursor.fetchall()]

        # Return column names as JSON response
        return jsonify({'columns': columns})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/updateseriescolumns',methods=['POST'])
def update_series():
    try:
        data = request.json
        column_name = data.get('columnName')
        team_id = data.get('id')
        new_value = data.get('newValue')

        # Execute the stored procedure to update the column
        cursor.execute("EXEC UpdateSeriesColumn ?, ?, ?", (column_name, team_id, new_value))
        conn.commit()

        return jsonify({'message': 'Series column updated successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400

@app.route('/api/getmatchcolumns', methods=['GET'])
def fetch_match_column():
    try:
        # Get column names from PlayerData table
        cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'FixtureData'")
        columns = [row[0] for row in cursor.fetchall()]

        # Return column names as JSON response
        return jsonify({'columns': columns})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/updatematchcolumns',methods=['POST'])
def update_match():
    try:
        data = request.json
        column_name = data.get('columnName')
        team_id = data.get('id')
        new_value = data.get('newValue')

        # Execute the stored procedure to update the column
        cursor.execute("EXEC UpdateMatchColumn ?, ?, ?", (column_name, team_id, new_value))
        conn.commit()

        return jsonify({'message': 'Series column updated successfully'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400   
    



@app.route('/api/deleteplayer',methods=['POST'])
def delete_player():
    try:
        data = request.json
        player_id = data.get('id')
        
        cursor.execute("EXEC delete_player ?",player_id)
        conn.commit()
        return jsonify({'messege':'Player deleted successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/deleteteam',methods=['POST'])
def delete_team():
    try:
        data = request.json
        team_id = data.get('id')
        
        cursor.execute("EXEC delete_team ?",team_id)
        conn.commit()
        return jsonify({'messege':'team deleted successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/deleteseries',methods=['POST'])
def delete_series():
    try:
        data = request.json
        series_id = data.get('id')
        
        cursor.execute("EXEC delete_series ?",series_id)
        conn.commit()
        return jsonify({'messege':'series deleted successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
  
  
@app.route('/api/deletematch',methods=['POST'])
def delete_match():
    try:
        data = request.json
        match_id = data.get('id')
        
        cursor.execute("EXEC delete_match ?",match_id)
        conn.commit()
        return jsonify({'messege':'match deleted successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/deletenews',methods=['POST'])
def delete_news():
    try:
        data = request.json
        news_date = data.get('date')
        
        cursor.execute("EXEC delete_news ?",news_date)
        conn.commit()
        return jsonify({'messege':'news deleted successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 400
            
            
                
        
if __name__ == '__main__':
    app.run(port=5000,debug=True)