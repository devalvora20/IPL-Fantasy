const express = require('express');
const app = express();
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://deval:deval@cluster0.odhin.mongodb.net/ipl_fantasy>?retryWrites=true&w=majority";
const returnDummy = true
const dummyData =
{
    "Kohli": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runs": 14,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 107.69,
                    "total_points_runs": 14,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "catch": 2,
                    "total_match_points": 30
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 20,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 1
                }
            }
        ],
        "totalPoints": 31
    },
    "Rohit": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 12,
                    "fours": 2,
                    "sixs": 0,
                    "sr": 120,
                    "total_points_runs": 12,
                    "total_points_fours": 2,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 14
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 80,
                    "fours": 3,
                    "sixs": 6,
                    "sr": 148.15,
                    "total_points_runs": 88,
                    "total_points_fours": 3,
                    "total_points_sixs": 12,
                    "total_points_sr": 0,
                    "total_match_points": 103
                }
            }
        ],
        "totalPoints": 117
    },
    "David Warner": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runs": 6,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 100,
                    "total_points_runs": 6,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_match_points": 7
                }
            }
        ],
        "totalPoints": 7
    },
    "de Villiers": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runs": 51,
                    "fours": 4,
                    "sixs": 2,
                    "sr": 170,
                    "total_points_runs": 59,
                    "total_points_fours": 4,
                    "total_points_sixs": 4,
                    "total_points_sr": 0,
                    "total_match_points": 67
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "catch": 1,
                    "runs": 28,
                    "fours": 4,
                    "sixs": 1,
                    "sr": 155.56,
                    "total_points_runs": 28,
                    "total_points_fours": 4,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 42
                }
            }
        ],
        "totalPoints": 109
    },
    "Buttler": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Steven Smith": {
        "stats": [
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "runs": 69,
                    "fours": 4,
                    "sixs": 4,
                    "sr": 146.81,
                    "total_points_runs": 77,
                    "total_points_fours": 4,
                    "total_points_sixs": 8,
                    "total_points_sr": 0,
                    "total_match_points": 89
                }
            }
        ],
        "totalPoints": 89
    },
    "Lokesh Rahul": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runout_throw": 1,
                    "runout_catch": 1,
                    "catch": 1,
                    "runs": 21,
                    "fours": 2,
                    "sixs": 1,
                    "sr": 110.53,
                    "total_points_runs": 21,
                    "total_points_fours": 2,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 45
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "runs": 132,
                    "fours": 14,
                    "sixs": 7,
                    "sr": 191.3,
                    "total_points_runs": 148,
                    "total_points_fours": 14,
                    "total_points_sixs": 14,
                    "total_points_sr": 0,
                    "total_match_points": 176
                }
            }
        ],
        "totalPoints": 221
    },
    "Andre Russell": {
        "stats": [
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 11,
                    "fours": 2,
                    "sixs": 0,
                    "sr": 100,
                    "total_points_runs": 11,
                    "total_points_fours": 2,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 13
                }
            }
        ],
        "totalPoints": 13
    },
    "Hardik Pandya": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 14,
                    "fours": 0,
                    "sixs": 2,
                    "sr": 140,
                    "total_points_runs": 14,
                    "total_points_fours": 0,
                    "total_points_sixs": 4,
                    "total_points_sr": 0,
                    "total_match_points": 18
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 18,
                    "fours": 2,
                    "sixs": 1,
                    "sr": 138.46,
                    "total_points_runs": 18,
                    "total_points_fours": 2,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "catch": 3,
                    "total_match_points": 46
                }
            }
        ],
        "totalPoints": 64
    },
    "Shane Watson": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 4,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 80,
                    "total_points_runs": 4,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_match_points": 5
                }
            },
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "runs": 33,
                    "fours": 1,
                    "sixs": 4,
                    "sr": 157.14,
                    "total_points_runs": 33,
                    "total_points_fours": 1,
                    "total_points_sixs": 8,
                    "total_points_sr": 0,
                    "total_match_points": 42
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "runs": 14,
                    "fours": 1,
                    "sixs": 1,
                    "sr": 87.5,
                    "total_points_runs": 14,
                    "total_points_fours": 1,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 17
                }
            }
        ],
        "totalPoints": 64
    },
    "Ravindra Jadeja": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 2,
                    "economy": 10.5,
                    "total_points_wicket": 50,
                    "total_points_maiden": 0,
                    "total_points_economy": -4,
                    "runs": 10,
                    "fours": 2,
                    "sixs": 0,
                    "sr": 200,
                    "total_points_runs": 10,
                    "total_points_fours": 2,
                    "total_points_sixs": 0,
                    "total_match_points": 58
                }
            },
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 10,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 50,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 1
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 11,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -6,
                    "runs": 12,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 133.33,
                    "total_points_runs": 12,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_match_points": 7
                }
            }
        ],
        "totalPoints": 66
    },
    "Glenn Maxwell": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 25,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 1
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 5,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": 2,
                    "total_match_points": 27
                }
            }
        ],
        "totalPoints": 28
    },
    "Krunal Pandya": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 3,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 100,
                    "total_points_runs": 3,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 9.2,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "total_match_points": 26
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 33.33,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 10,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_match_points": 1
                }
            }
        ],
        "totalPoints": 27
    },
    "Bravo": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Rashid Khan": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 7.8,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "runs": 6,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 120,
                    "total_points_runs": 6,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_match_points": 15
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 6.2,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_match_points": 25
                }
            }
        ],
        "totalPoints": 40
    },
    "Jasprit Bumrah": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 5,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 166.67,
                    "total_points_runs": 5,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 10.8,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": -4,
                    "total_match_points": 26
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 2,
                    "economy": 8,
                    "total_points_wicket": 50,
                    "total_points_maiden": 0,
                    "total_match_points": 50
                }
            }
        ],
        "totalPoints": 76
    },
    "Sunil Narine": {
        "stats": [
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runout_throw": 1,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 5.5,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": 2,
                    "runs": 9,
                    "fours": 0,
                    "sixs": 1,
                    "sr": 90,
                    "total_points_runs": 9,
                    "total_points_fours": 0,
                    "total_points_sixs": 2,
                    "total_match_points": 46
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 7.8,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": 0,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 0
                }
            }
        ],
        "totalPoints": 46
    },
    "Yuzvendra Chahal": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 3,
                    "economy": 4.5,
                    "total_points_wicket": 75,
                    "total_points_maiden": 0,
                    "total_points_economy": 4,
                    "total_match_points": 79
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 6.2,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 33.33,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 26
                }
            }
        ],
        "totalPoints": 105
    },
    "Mujeeb": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Kagiso Rabada": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": 0,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 2,
                    "economy": 7,
                    "total_points_wicket": 50,
                    "total_points_maiden": 0,
                    "total_match_points": 58
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 3,
                    "economy": 6.5,
                    "total_points_wicket": 75,
                    "total_points_maiden": 0,
                    "total_match_points": 83
                }
            }
        ],
        "totalPoints": 141
    },
    "Bhuvneshwar": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 6.2,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": 0,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 0
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 9.7,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "total_match_points": -2
                }
            }
        ],
        "totalPoints": -2
    },
    "Finch": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runs": 29,
                    "fours": 1,
                    "sixs": 2,
                    "sr": 107.41,
                    "total_points_runs": 29,
                    "total_points_fours": 1,
                    "total_points_sixs": 4,
                    "total_points_sr": 0,
                    "total_match_points": 34
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "catch": 1,
                    "runs": 20,
                    "fours": 3,
                    "sixs": 0,
                    "sr": 95.24,
                    "total_points_runs": 20,
                    "total_points_fours": 3,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 31
                }
            }
        ],
        "totalPoints": 65
    },
    "Dhawan": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": -2,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": -2
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "runs": 35,
                    "fours": 3,
                    "sixs": 1,
                    "sr": 129.63,
                    "total_points_runs": 35,
                    "total_points_fours": 3,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 40
                }
            }
        ],
        "totalPoints": 38
    },
    "Shreyas Iyer": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runs": 39,
                    "fours": 0,
                    "sixs": 3,
                    "sr": 121.88,
                    "total_points_runs": 39,
                    "total_points_fours": 0,
                    "total_points_sixs": 6,
                    "total_points_sr": 0,
                    "catch": 1,
                    "total_match_points": 53
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "runs": 26,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 118.18,
                    "total_points_runs": 26,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 27
                }
            }
        ],
        "totalPoints": 80
    },
    "Eoin Morgan": {
        "stats": [
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runout_catch": 1,
                    "runs": 16,
                    "fours": 1,
                    "sixs": 1,
                    "sr": 80,
                    "total_points_runs": 16,
                    "total_points_fours": 1,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 23
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "runs": 42,
                    "fours": 3,
                    "sixs": 2,
                    "sr": 144.83,
                    "total_points_runs": 42,
                    "total_points_fours": 3,
                    "total_points_sixs": 4,
                    "total_points_sr": 0,
                    "total_match_points": 49
                }
            }
        ],
        "totalPoints": 72
    },
    "Manish Pandey": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runout_throw": 1,
                    "runs": 34,
                    "fours": 3,
                    "sixs": 1,
                    "sr": 103.03,
                    "total_points_runs": 34,
                    "total_points_fours": 3,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 47
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "runs": 51,
                    "fours": 3,
                    "sixs": 2,
                    "sr": 134.21,
                    "total_points_runs": 59,
                    "total_points_fours": 3,
                    "total_points_sixs": 4,
                    "total_points_sr": 0,
                    "total_match_points": 66
                }
            }
        ],
        "totalPoints": 113
    },
    "Samson": {
        "stats": [
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "runs": 74,
                    "fours": 1,
                    "sixs": 9,
                    "sr": 231.25,
                    "total_points_runs": 82,
                    "total_points_fours": 1,
                    "total_points_sixs": 18,
                    "total_points_sr": 0,
                    "catch": 2,
                    "stumping": 2,
                    "total_match_points": 141
                }
            }
        ],
        "totalPoints": 141
    },
    "Gayle": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Vijay Shankar": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 10.5,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": -4,
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": -2,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 19
                }
            }
        ],
        "totalPoints": 19
    },
    "Pollard": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 18,
                    "fours": 1,
                    "sixs": 1,
                    "sr": 128.57,
                    "total_points_runs": 18,
                    "total_points_fours": 1,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 21
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 13,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 185.71,
                    "total_points_runs": 13,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 7,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_match_points": 47
                }
            }
        ],
        "totalPoints": 68
    },
    "Ben Stokes": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Shreyas Gopal": {
        "stats": [
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 9.5,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "total_match_points": 23
                }
            }
        ],
        "totalPoints": 23
    },
    "Kedar Jadhav": {
        "stats": [
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "catch": 1,
                    "runout_catch": 1,
                    "runs": 22,
                    "fours": 3,
                    "sixs": 0,
                    "sr": 137.5,
                    "total_points_runs": 22,
                    "total_points_fours": 3,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 37
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "runs": 26,
                    "fours": 3,
                    "sixs": 0,
                    "sr": 123.81,
                    "total_points_runs": 26,
                    "total_points_fours": 3,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 29
                }
            }
        ],
        "totalPoints": 66
    },
    "Jofra Archer": {
        "stats": [
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "runs": 27,
                    "fours": 0,
                    "sixs": 4,
                    "sr": 337.5,
                    "total_points_runs": 27,
                    "total_points_fours": 0,
                    "total_points_sixs": 8,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 6.5,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_match_points": 60
                }
            }
        ],
        "totalPoints": 60
    },
    "Moeen Ali": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Kuldeep Yadav": {
        "stats": [
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 9.8,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 50,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": -1
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 7.5,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_match_points": 0
                }
            }
        ],
        "totalPoints": -1
    },
    "D Chahar": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 2,
                    "economy": 8,
                    "total_points_wicket": 50,
                    "total_points_maiden": 0,
                    "total_match_points": 50
                }
            },
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "catch": 2,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 7.8,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_match_points": 41
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 9.5,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "total_match_points": -2
                }
            }
        ],
        "totalPoints": 89
    },
    "Umesh Yadav": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runout_direct": 1,
                    "runout_throw": 1,
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 12,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -6,
                    "total_match_points": 14
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 11.7,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -6,
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": 0,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": -6
                }
            }
        ],
        "totalPoints": 8
    },
    "Shami": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 3,
                    "economy": 3.8,
                    "total_points_wicket": 75,
                    "total_points_maiden": 0,
                    "total_points_economy": 6,
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": 0,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 89
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 4.7,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": 4,
                    "total_match_points": 29
                }
            }
        ],
        "totalPoints": 118
    },
    "Rahul Chahar": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 2,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 50,
                    "total_points_runs": 2,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 9,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "total_match_points": 33
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 2,
                    "economy": 6.5,
                    "total_points_wicket": 50,
                    "total_points_maiden": 0,
                    "total_match_points": 50
                }
            }
        ],
        "totalPoints": 83
    },
    "Khalil Ahmed": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Suryakumar Yadav": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 17,
                    "fours": 2,
                    "sixs": 0,
                    "sr": 106.25,
                    "total_points_runs": 17,
                    "total_points_fours": 2,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 19
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 47,
                    "fours": 6,
                    "sixs": 1,
                    "sr": 167.86,
                    "total_points_runs": 47,
                    "total_points_fours": 6,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 55
                }
            }
        ],
        "totalPoints": 74
    },
    "Prithvi Shaw": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runs": 5,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 55.56,
                    "total_points_runs": 5,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "catch": 2,
                    "total_match_points": 22
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "runs": 64,
                    "fours": 9,
                    "sixs": 1,
                    "sr": 148.84,
                    "total_points_runs": 72,
                    "total_points_fours": 9,
                    "total_points_sixs": 2,
                    "total_points_sr": 0,
                    "total_match_points": 83
                }
            }
        ],
        "totalPoints": 105
    },
    "Ambati Rayudu": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 71,
                    "fours": 6,
                    "sixs": 3,
                    "sr": 147.92,
                    "total_points_runs": 79,
                    "total_points_fours": 6,
                    "total_points_sixs": 6,
                    "total_points_sr": 0,
                    "total_match_points": 91
                }
            }
        ],
        "totalPoints": 91
    },
    "de Kock": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "runs": 33,
                    "fours": 5,
                    "sixs": 0,
                    "sr": 165,
                    "total_points_runs": 33,
                    "total_points_fours": 5,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 38
                }
            },
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 33.33,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "catch": 2,
                    "stumping": 1,
                    "total_match_points": 29
                }
            }
        ],
        "totalPoints": 67
    },
    "Jonny Bairstow": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "runout_catch": 1,
                    "runout_direct": 1,
                    "runs": 61,
                    "fours": 6,
                    "sixs": 2,
                    "sr": 141.86,
                    "total_points_runs": 69,
                    "total_points_fours": 6,
                    "total_points_sixs": 4,
                    "total_points_sr": 0,
                    "total_match_points": 95
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "runs": 5,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 50,
                    "total_points_runs": 5,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_points_sr": -4,
                    "total_match_points": 1
                }
            }
        ],
        "totalPoints": 96
    },
    "Pant": {
        "stats": [
            {
                "match": "DC vs KXIP, 2nd Match",
                "match_stats": {
                    "runs": 31,
                    "fours": 4,
                    "sixs": 0,
                    "sr": 106.9,
                    "total_points_runs": 31,
                    "total_points_fours": 4,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "catch": 1,
                    "total_match_points": 43
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "runs": 37,
                    "fours": 5,
                    "sixs": 0,
                    "sr": 148,
                    "total_points_runs": 37,
                    "total_points_fours": 5,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "catch": 2,
                    "runout_throw": 1,
                    "total_match_points": 66
                }
            }
        ],
        "totalPoints": 109
    },
    "MS Dhoni": {
        "stats": [
            {
                "match": "MI vs CSK, 1st Match",
                "match_stats": {
                    "catch": 2,
                    "runs": 0,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 0,
                    "total_points_runs": -2,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": 14
                }
            },
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "catch": 1,
                    "runs": 29,
                    "fours": 0,
                    "sixs": 3,
                    "sr": 170.59,
                    "total_points_runs": 29,
                    "total_points_fours": 0,
                    "total_points_sixs": 6,
                    "total_points_sr": 0,
                    "total_match_points": 43
                }
            },
            {
                "match": "CSK vs DC, 7th Match",
                "match_stats": {
                    "stumping": 1,
                    "catch": 1,
                    "runs": 15,
                    "fours": 2,
                    "sixs": 0,
                    "sr": 125,
                    "total_points_runs": 15,
                    "total_points_fours": 2,
                    "total_points_sixs": 0,
                    "total_points_sr": 0,
                    "total_match_points": 37
                }
            }
        ],
        "totalPoints": 94
    },
    "Pat Cummins": {
        "stats": [
            {
                "match": "KKR vs MI, 5th Match",
                "match_stats": {
                    "catch": 2,
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 16.3,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -6,
                    "runs": 33,
                    "fours": 1,
                    "sixs": 4,
                    "sr": 275,
                    "total_points_runs": 33,
                    "total_points_fours": 1,
                    "total_points_sixs": 8,
                    "total_match_points": 52
                }
            },
            {
                "match": "KKR vs SRH, 8th Match",
                "match_stats": {
                    "runout_throw": 1,
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 4.8,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": 4,
                    "total_match_points": 37
                }
            }
        ],
        "totalPoints": 89
    },
    "Sandeep Sharma": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 9,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "runs": 9,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 150,
                    "total_points_runs": 9,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_match_points": 8
                }
            }
        ],
        "totalPoints": 8
    },
    "Jaydev Unadkat": {
        "stats": [
            {
                "match": "RR vs CSK, 4th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 11,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -6,
                    "total_match_points": -6
                }
            }
        ],
        "totalPoints": -6
    },
    "Prasidh": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Imran Tahir": {
        "stats": [

        ],
        "totalPoints": 0
    },
    "Navdeep Saini": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "catch": 1,
                    "maiden": 0,
                    "wicket": 2,
                    "economy": 6.2,
                    "total_points_wicket": 50,
                    "total_points_maiden": 0,
                    "total_match_points": 58
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 9.2,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "runs": 6,
                    "fours": 1,
                    "sixs": 0,
                    "sr": 85.71,
                    "total_points_runs": 6,
                    "total_points_fours": 1,
                    "total_points_sixs": 0,
                    "total_match_points": 5
                }
            }
        ],
        "totalPoints": 63
    },
    "Dale Steyn": {
        "stats": [
            {
                "match": "SRH vs RCB, 3rd Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 1,
                    "economy": 9,
                    "total_points_wicket": 25,
                    "total_points_maiden": 0,
                    "total_points_economy": -2,
                    "total_match_points": 23
                }
            },
            {
                "match": "KXIP vs RCB, 6th Match",
                "match_stats": {
                    "maiden": 0,
                    "wicket": 0,
                    "economy": 14.2,
                    "total_points_wicket": 0,
                    "total_points_maiden": 0,
                    "total_points_economy": -6,
                    "runs": 1,
                    "fours": 0,
                    "sixs": 0,
                    "sr": 50,
                    "total_points_runs": 1,
                    "total_points_fours": 0,
                    "total_points_sixs": 0,
                    "total_match_points": -5
                }
            }
        ],
        "totalPoints": 18
    },
    "Ishant Sharma": {
        "stats": [

        ],
        "totalPoints": 0
    }
}


app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type ,Accept , Authorization");
    response.setHeader("Acces-Control-Allow-Methods", "GET , POST , PATCH , DELETE ,PUT, OPTIONS");
    next();
});

app.get('/test', (req, res) => {
    res.send({ "Success": "true" });
});

app.get('/get-all-stats', async (req, res) => {
    if (returnDummy) {
        res.send({ "stats": dummyData });
    }
    let player_stats = {}

    try {
        const stats = await getAllStats();
        while (await stats.hasNext()) {
            const player = await stats.next();
            let temp = { "stats": player["match_stats"], "totalPoints": player["total_points"] };
            player_stats[player["name"]] = temp;
        }
        res.send({ "stats": player_stats });
    } catch (error) {
        console.log(error);
    }
});

async function getAllStats() {
    let all_player_stats;
    let client;
    try {
        client = new MongoClient(uri)
        const db = await client.connect();
        const dbo = db.db("ipl_fantasy");
        all_player_stats = await dbo.collection("scores").find({})
    }
    catch (e) {
        console.log(e);
    }
    finally {
        // client.close();
    }
    return all_player_stats;
}

let port = process.env.PORT || 8081;
app.listen(port, () => console.log('app listening on port 8081'));