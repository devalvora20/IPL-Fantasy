from bs4 import BeautifulSoup
import requests
import pymongo
from bson.objectid import ObjectId
import re
import json

MONGO_PASSWORD = "deval"
MONGO_DB_NAME = "ipl_fantasy"
PLAYERS = ["Kohli", "Rohit", "David Warner", "de Villiers", "Buttler", "Steven Smith", "Lokesh Rahul", "Andre Russell", "Hardik Pandya", "Shane Watson",
           "Ravindra Jadeja", "Glenn Maxwell", "Krunal Pandya", "Bravo", "Rashid Khan", "Jasprit Bumrah", "Sunil Narine", "Yuzvendra Chahal", "Mujeeb", "Kagiso Rabada",
           "Bhuvneshwar", "Finch", "Dhawan", "Shreyas Iyer", "Eoin Morgan", "Manish Pandey", "Samson", "Gayle", "Vijay Shankar", "Pollard",
           "Ben Stokes", "Shreyas Gopal", "Kedar Jadhav", "Jofra Archer", "Moeen Ali", "Kuldeep Yadav", "D Chahar", "Umesh Yadav", "Shami", "Rahul Chahar",
           "Khalil Ahmed", "Suryakumar Yadav", "Prithvi Shaw", "Ambati Rayudu", "de Kock", "Jonny Bairstow", "Pant", "MS Dhoni", "Pat Cummins", "Sandeep Sharma", "Jaydev Unadkat", "Prasidh",
           "Imran Tahir", "Navdeep Saini", "Dale Steyn", "Ishant Sharma"]

PLAYER_NAME_DICT = {
    "Bumrah":"Jasprit Bumrah",
    "Rabada": "Kagiso Rabada",
    "Mohammed Shami": "Shami",
    "Bhuvneshwar Kumar": "Bhuvneshwar",
    "jadhav": "Kedar Jadhav",
    "dhoni": "MS Dhoni",
    "Bairstow": "Jonny Bairstow",
    "Umesh": "Umesh Yadav",
    "Steyn": "Dale Steyn",
    "Cummins":"Pat Cummins",
    "Narine":"Sunil Narine",
    "Russel":"Andre Russell",
    "Kieron Pollard":"Pollard",
    "Tahir":"Imran Tahir",
    "Morgan": "Eoin Morgan",
    "Stokes":"Ben Stokes",
    "Khalil":"Khalil Ahmed",
    "Ishant":"Ishant Sharma"

}

client = pymongo.MongoClient("mongodb+srv://deval:deval@cluster0.odhin.mongodb.net/ipl_fantasy>?retryWrites=true&w=majority")
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


def insert_match_data(dict):
    
    for key, value in dict.items():
        player_data = scores.find_one({"name":key})
        stats = player_data["match_stats"]
        stats.append({match_info:value})

        print(scores.update_one(
            {"name": key},
            {"$set": {"match_stats": stats}}
        ))


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
    name = ""
    key = ""
    fielding_data = {}
    regex = re.search('c (.+?) b', wicket)
    if regex:
        catcher = regex.group(1)
        if(catcher == "and"):
            catcher = wicket[wicket.find("b ")+2: len(wicket)]

        update_match_data_dict(catcher, "catch")

    if "run out" in wicket:
        wicket = wicket.replace("run out (", "").replace(")", "")
        if("/" in wicket):
            splitted_wicket = wicket.split("/")
            runout_thrower = splitted_wicket[0]
            runout_catcher = splitted_wicket[1]
            update_match_data_dict(runout_thrower, "runout_throw")
            update_match_data_dict(runout_catcher, "runout_catch")
        else:
            runout_direct = wicket
            update_match_data_dict(runout_direct, "runout_direct")

    if "st " in wicket[:3]:
        regex = re.search('st (.+?) b ', wicket)
        if regex:
            stumping = regex.group(1)
        update_match_data_dict(stumping, "stumping")


for match in match_url_result:
    # break
    match_data = {}
    match_info = match.findChildren()[0].text.replace("Mumbai Indians", "MI").replace("Kolkata Knight Riders", "KKR").replace("Chennai Super Kings", "CSK").replace(
        "Chennai Super Kings", "CSK").replace("Delhi Capitals", "DC").replace("Kings XI Punjab", "KXIP").replace("Sunrisers Hyderabad", "SRH").replace("Royal Challengers Bangalore", "RCB")

    link = ""
    link = match.get('href')
    link = link.replace("cricket-scores", "cricket-scorecard")
    scorecard_url = BASE_URL + link
    # scorecard_url = "https://www.cricbuzz.com/live-cricket-scorecard/30354/kkr-vs-mi-5th-match-indian-premier-league-2020"
    soup2 = BeautifulSoup(requests.get(
        scorecard_url, headers=USER_AGENT).text, "html.parser")
    scorecard_results = soup2.find_all('div', attrs={'class': 'cb-scrd-itms'})

    if(len(scorecard_results)==0):
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
            runs = playerScore[4].text.strip()
            fours = playerScore[6].text.strip()
            sixs = playerScore[7].text.strip()
            sr = playerScore[8].text.strip()

            detect_fielding_points(wicket)

            name = PLAYER_NAME_DICT.get(name, name)
            if name not in PLAYERS:
                continue

            data = match_data.get(name, {})

            data["runs"] = runs
            data["fours"] = fours
            data["sixs"] = sixs
            data["sr"] = sr

            match_data[name] = data
        else:
            # print(" Bowling ********************************************")
            name = playerScore[1].text.replace("(c)", "").strip()
            maiden = playerScore[3].text.strip()
            wicket = playerScore[5].text.strip()
            no_balls = playerScore[6].text.strip()
            wide = playerScore[7].text.strip()
            economy = playerScore[8].text.strip()

            name = PLAYER_NAME_DICT.get(name, name)
            if name not in PLAYERS:
                continue

            data = match_data.get(name, {})

            data["maiden"] = maiden
            data["wicket"] = wicket
            data["no_ball"] = no_balls
            data["wide"] = wide
            data["economy"] = economy

            match_data[name] = data
    insert_match_data(match_data)
    # pprint(match_data)
    # print("==========================")
