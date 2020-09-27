from bs4 import BeautifulSoup
import requests
import pymongo
from bson.objectid import ObjectId
import re
import json
import math

MONGO_PASSWORD = "deval"
MONGO_DB_NAME = "ipl_fantasy"
PLAYERS = ["Kohli", "Rohit", "David Warner", "de Villiers", "Buttler", "Steven Smith", "Lokesh Rahul", "Andre Russell", "Hardik Pandya", "Shane Watson",
           "Ravindra Jadeja", "Glenn Maxwell", "Krunal Pandya", "Bravo", "Rashid Khan", "Jasprit Bumrah", "Sunil Narine", "Yuzvendra Chahal", "Mujeeb", "Kagiso Rabada",
           "Bhuvneshwar", "Finch", "Dhawan", "Shreyas Iyer", "Eoin Morgan", "Manish Pandey", "Samson", "Gayle", "Vijay Shankar", "Pollard",
           "Ben Stokes", "Shreyas Gopal", "Kedar Jadhav", "Jofra Archer", "Moeen Ali", "Kuldeep Yadav", "D Chahar", "Umesh Yadav", "Shami", "Rahul Chahar",
           "Khalil Ahmed", "Suryakumar Yadav", "Prithvi Shaw", "Ambati Rayudu", "de Kock", "Jonny Bairstow", "Pant", "MS Dhoni", "Pat Cummins", "Sandeep Sharma", "Jaydev Unadkat", "Prasidh",
           "Imran Tahir", "Navdeep Saini", "Dale Steyn", "Ishant Sharma"]

BOWLERS = ["Rashid Khan", "Jasprit Bumrah", "Sunil Narine", "Yuzvendra Chahal", "Mujeeb", "Kagiso Rabada",
           "Bhuvneshwar", "Kuldeep Yadav", "D Chahar", "Umesh Yadav", "Shami", "Rahul Chahar",
           "Khalil Ahmed", "Pat Cummins", "Sandeep Sharma", "Jaydev Unadkat", "Prasidh",
           "Imran Tahir", "Navdeep Saini", "Dale Steyn", "Ishant Sharma"]

PLAYER_NAME_DICT = {
    "Bumrah": "Jasprit Bumrah",
    "Rabada": "Kagiso Rabada",
    "Mohammed Shami": "Shami",
    "Bhuvneshwar Kumar": "Bhuvneshwar",
    "jadhav": "Kedar Jadhav",
    "Jadhav": "Kedar Jadhav",
    "Dhoni": "MS Dhoni",
    "Bairstow": "Jonny Bairstow",
    "Umesh": "Umesh Yadav",
    "Steyn": "Dale Steyn",
    "Cummins": "Pat Cummins",
    "Narine": "Sunil Narine",
    "Russel": "Andre Russell",
    "Kieron Pollard": "Pollard",
    "Tahir": "Imran Tahir",
    "Morgan": "Eoin Morgan",
    "Stokes": "Ben Stokes",
    "Khalil": "Khalil Ahmed",
    "Ishant": "Ishant Sharma",
    "Rahul": "Lokesh Rahul",
    "Aaron Finch": "Finch",
    "Virat Kohli": "Kohli",
    "AB de Villiers": "de Villiers",
    "Chahal": "Yuzvendra Chahal"

}

TOTAL_PREFIX = "total_points_"
RUNS_KEY = "runs"
WICKET_KEY = "wicket"
MAIDEN_KEY = "maiden"
CATCH_KEY = "catch"
RUNOUT_CATCH_KEY = "runout_catch"
RUNOUT_THROW_KEY = "runout_throw"
RUNOUT_DIRECT_KEY = "runout_direct"
STUMPING_KEY = "stumping"
SIXS_KEY = "sixs"
FOURS_KEY = "fours"
SR_KEY = "sr"
ECONOMY_KEY = "economy"

client = pymongo.MongoClient(
    "mongodb+srv://deval:deval@cluster0.odhin.mongodb.net/ipl_fantasy>?retryWrites=true&w=majority")
db = client.ipl_fantasy
scores = db.scores

# test = {"Rohit":{"runs":2}}
# print(scores.insert_one(test))

# scores.remove()
# for player in PLAYERS:
#     temp = {"name":player, "match_stats":[]}
#     print(scores.insert_one(temp))


# for player in PLAYERS:
#     scores.update_one(
#         {"name": player},
#         {"$set": {"total_points": 0}}
#     )

# for player in PLAYERS:
#     scores.update_one(
#         {"name": player},
#         {"$set": {"match_stats": []}}
#     )


batsman = True
USER_AGENT = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100'
                            'Safari/537.36'}
BASE_URL = "https://www.cricbuzz.com"
matches_url = BASE_URL+"/cricket-series/3130/indian-premier-league-2020/matches"
soup1 = BeautifulSoup(requests.get(
    matches_url, headers=USER_AGENT).text, "html.parser")
match_url_result = soup1.find_all('a', attrs={'class': 'text-hvr-underline'})

match_data = {}
match_info = ""


def insert_match_data(dict1):
    # print(match_info)
    for key, value in dict1.items():
        player_data = scores.find_one({"name": key})
        total_points = player_data["total_points"]
        total_points += value["total_match_points"]
        stats = player_data["match_stats"]
        stats.append({match_info: value})

        print(scores.update_one(
            {"name": key},
            {"$set": {"match_stats": stats, "total_points": total_points}}
        ))


def calculate_match_points(dict1):
    total_match_point_dict = {}
    for key, value in dict1.items():
        total_match_points = 0
        for k, v in value.items():
            if(TOTAL_PREFIX in k):
                total_match_points += v
            if(k == RUNOUT_CATCH_KEY):
                total_match_points += v * 4
            if(k == RUNOUT_THROW_KEY):
                total_match_points += v * 8
            if(k == RUNOUT_DIRECT_KEY):
                total_match_points += v * 12
            if(k == STUMPING_KEY):
                total_match_points += v * 12
            if(k == CATCH_KEY):
                total_match_points += v * 8
        total_match_point_dict[key] = total_match_points

    for k, v in total_match_point_dict.items():
        stats_dict = match_data[k]
        stats_dict["total_match_points"] = v
        match_data[k] = stats_dict


def pprint(json1):
    print(json.dumps(json1, indent=2))


def update_match_data_dict(name, key):
    player_to_update = PLAYER_NAME_DICT.get(name, name)
    if player_to_update not in PLAYERS:
        return
    player_to_update_dict = match_data.get(player_to_update, {})
    player_to_update_dict[key] = player_to_update_dict.get(key, 0) + 1
    match_data[player_to_update] = player_to_update_dict


def detect_fielding_points(wicket):
    catcher = ""
    runout_thrower = ""
    runout_catcher = ""
    runout_direct = ""
    stumping = ""
    regex = re.search('c (.+?) b', wicket)
    if regex:
        catcher = regex.group(1)
        if(catcher == "and"):
            catcher = wicket[wicket.find("b ")+2: len(wicket)]

        update_match_data_dict(catcher, CATCH_KEY)

    if "run out" in wicket:
        wicket = wicket.replace("run out (", "").replace(")", "")
        if("/" in wicket):
            splitted_wicket = wicket.split("/")
            runout_thrower = splitted_wicket[0]
            runout_catcher = splitted_wicket[1]
            update_match_data_dict(runout_thrower, RUNOUT_THROW_KEY)
            update_match_data_dict(runout_catcher, RUNOUT_CATCH_KEY)
        else:
            runout_direct = wicket
            update_match_data_dict(runout_direct, RUNOUT_DIRECT_KEY)

    if "st " in wicket[:3]:
        regex = re.search('st (.+?) b ', wicket)
        if regex:
            stumping = regex.group(1)
        update_match_data_dict(stumping, STUMPING_KEY)


for match in match_url_result:
    # break
    match_data = {}
    match_info = match.findChildren()[0].text.replace("Mumbai Indians", "MI").replace("Kolkata Knight Riders", "KKR").replace("Chennai Super Kings", "CSK").replace(
        "Chennai Super Kings", "CSK").replace("Rajasthan Royals", "RR").replace("Delhi Capitals", "DC").replace("Kings XI Punjab", "KXIP").replace("Sunrisers Hyderabad", "SRH").replace("Royal Challengers Bangalore", "RCB")

    link = ""
    link = match.get('href')
    link = link.replace("cricket-scores", "cricket-scorecard")
    scorecard_url = BASE_URL + link
    # scorecard_url = "https://www.cricbuzz.com/live-cricket-scorecard/30360/csk-vs-dc-7th-match-indian-premier-league-2020"
    soup2 = BeautifulSoup(requests.get(
        scorecard_url, headers=USER_AGENT).text, "html.parser")
    scorecard_results = soup2.find_all('div', attrs={'class': 'cb-scrd-itms'})

    if(len(scorecard_results) == 0):
        break
    for scorecard in scorecard_results:
        playerScore = scorecard.findChildren()
        if(len(playerScore) != 9):
            continue

        if(len(playerScore[3].text.strip()) > 2):
            batsman = True
        else:
            batsman = False

        if batsman:
            name = playerScore[1].text.replace(
                "(c)", "").replace("(wk)", "").strip()
            wicket = playerScore[3].text.strip()
            runs = int(playerScore[4].text.strip())
            balls = int(playerScore[5].text.strip())
            fours = int(playerScore[6].text.strip())
            sixs = int(playerScore[7].text.strip())
            sr = float(playerScore[8].text.strip())

            detect_fielding_points(wicket)

            name = PLAYER_NAME_DICT.get(name, name)
            if name not in PLAYERS:
                continue

            data = match_data.get(name, {})

            data[RUNS_KEY] = runs
            data[FOURS_KEY] = fours
            data[SIXS_KEY] = sixs
            data[SR_KEY] = sr

            if(runs > 100):
                data[TOTAL_PREFIX + RUNS_KEY] = runs + 16
            elif(runs > 50):
                data[TOTAL_PREFIX + RUNS_KEY] = runs + 8
            elif(runs == 0 and name not in BOWLERS):
                data[TOTAL_PREFIX + RUNS_KEY] = -2
            else:
                data[TOTAL_PREFIX + RUNS_KEY] = runs

            data[TOTAL_PREFIX + FOURS_KEY] = fours
            data[TOTAL_PREFIX + SIXS_KEY] = sixs * 2

            if(balls >= 10 and name not in BOWLERS):
                if sr >= 60 and sr <= 70:
                    data[TOTAL_PREFIX + SR_KEY] = -2
                elif sr >= 50 and sr < 60:
                    data[TOTAL_PREFIX + SR_KEY] = -4
                elif sr < 50:
                    data[TOTAL_PREFIX + SR_KEY] = -6
                else:
                    data[TOTAL_PREFIX + SR_KEY] = 0

            match_data[name] = data
        else:
            name = playerScore[1].text.replace("(c)", "").strip()
            overs = math.ceil(float(playerScore[2].text.strip()))
            maiden = int(playerScore[3].text.strip())
            wicket = int(playerScore[5].text.strip())
            no_balls = int(playerScore[6].text.strip())
            wide = int(playerScore[7].text.strip())
            economy = float(playerScore[8].text.strip())

            name = PLAYER_NAME_DICT.get(name, name)
            if name not in PLAYERS:
                continue

            data = match_data.get(name, {})

            data[MAIDEN_KEY] = maiden
            data[WICKET_KEY] = wicket
            data[ECONOMY_KEY] = economy

            if(wicket >= 5):
                data[TOTAL_PREFIX + WICKET_KEY] = (25 * wicket) + 16
            elif(wicket == 4):
                data[TOTAL_PREFIX + WICKET_KEY] = (25 * wicket) + 8
            else:
                data[TOTAL_PREFIX + WICKET_KEY] = (25 * wicket)

            data[TOTAL_PREFIX + MAIDEN_KEY] = 8 * maiden

            if(overs >= 2):
                if(economy >= 11):
                    data[TOTAL_PREFIX + ECONOMY_KEY] = -6
                elif(economy > 10 and economy < 11):
                    data[TOTAL_PREFIX + ECONOMY_KEY] = -4
                elif(economy >= 9 and economy < 10):
                    data[TOTAL_PREFIX + ECONOMY_KEY] = -2
                elif(economy >= 5 and economy <= 6):
                    data[TOTAL_PREFIX + ECONOMY_KEY] = 2
                elif(economy > 4 and economy < 5):
                    data[TOTAL_PREFIX + ECONOMY_KEY] = 4
                elif(economy <= 4):
                    data[TOTAL_PREFIX + ECONOMY_KEY] = 6

            match_data[name] = data

    calculate_match_points(match_data)
    insert_match_data(match_data)
    # pprint(match_data)
    # print("==========================")
