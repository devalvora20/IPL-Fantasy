export class Controller {
    ABHISHEK_TEAM = ["de Villiers", "Suryakumar Yadav", "Gayle", "Ben Stokes", "Glenn Maxwell", "Jasprit Bumrah", "Umesh Yadav", "Sandeep Sharma"];
    ARNAV_TEAM = ["Buttler", "Eoin Morgan", "Pant", "Andre Russell", "Vijay Shankar", "Yuzvendra Chahal", "Khalil Ahmed", "Jaydev Unadkat"];
    DEVAL_TEAM = ["Lokesh Rahul", "Shreyas Iyer", "Jonny Bairstow", "Hardik Pandya", "Shreyas Gopal", "Sunil Narine", "D Chahar", "Imran Tahir"];
    DHAWAN_TEAM = ["Rohit", "Dhawan", "Bravo", "Jofra Archer", "Kagiso Rabada", "Kuldeep Yadav", "Dale Steyn", "Ambati Rayudu"];
    CHINTAN_TEAM = ["Steven Smith", "Finch", "Prithvi Shaw", "Pollard", "Krunal Pandya", "Mujeeb", "Shami", "Pat Cummins"];
    MOHIL_TEAM = ["Kohli", "de Kock", "Manish Pandey", "Ravindra Jadeja", "Kedar Jadhav", "Bhuvneshwar", "Navdeep Saini", "Ishant Sharma"];
    RISHAB_TEAM = ["David Warner", "Samson", "MS Dhoni", "Shane Watson", "Moeen Ali", "Rashid Khan", "Rahul Chahar", "Prasidh"];

    PLAYERS = ["Kohli", "Rohit", "David Warner", "de Villiers", "Buttler", "Steven Smith", "Lokesh Rahul", "Andre Russell", "Hardik Pandya", "Shane Watson",
        "Ravindra Jadeja", "Glenn Maxwell", "Krunal Pandya", "Bravo", "Rashid Khan", "Jasprit Bumrah", "Sunil Narine", "Yuzvendra Chahal", "Mujeeb", "Kagiso Rabada",
        "Bhuvneshwar", "Finch", "Dhawan", "Shreyas Iyer", "Eoin Morgan", "Manish Pandey", "Samson", "Gayle", "Vijay Shankar", "Pollard",
        "Ben Stokes", "Shreyas Gopal", "Kedar Jadhav", "Jofra Archer", "Moeen Ali", "Kuldeep Yadav", "D Chahar", "Umesh Yadav", "Shami", "Rahul Chahar",
        "Khalil Ahmed", "Suryakumar Yadav", "Prithvi Shaw", "Ambati Rayudu", "de Kock", "Jonny Bairstow", "Pant", "MS Dhoni", "Pat Cummins", "Sandeep Sharma", "Jaydev Unadkat", "Prasidh",
        "Imran Tahir", "Navdeep Saini", "Dale Steyn", "Ishant Sharma"]

    BACKEND_URL = "https://agile-brushlands-63159.herokuapp.com";
    constructor() {
        fetch(this.BACKEND_URL + "/get-all-stats")
            .then(response => response.json())
            .then((data) => {
                this.state = { playerStats: data.stats }
                console.log("player stats set");
            });
        // this.state = { message: 'Hello!' };
    }

    getAllData = () => {
        
        let abhishek = { name: "Abhishek" };
        let arnav = { name: "Arnav" };
        let deval = { name: "Deval" };
        let dhawan = { name: "Dhawan" };
        let chintan = { name: "Chintan" };
        let mohil = { name: "Mohil" };
        let rishab = { name: "Rishab" };

        let totalPoints = 0
        let players = []
        for( let player of this.ABHISHEK_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        abhishek["players"] = players
        abhishek["totalPoints"] = totalPoints

        totalPoints = 0
        players = []
        for( let player of this.ARNAV_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        arnav["players"] = players
        arnav["totalPoints"] = totalPoints
        
        totalPoints = 0
        players = []
        for( let player of this.DEVAL_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        deval["players"] = players
        deval["totalPoints"] = totalPoints
        
        totalPoints = 0
        players = []
        for( let player of this.DHAWAN_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        dhawan["players"] = players
        dhawan["totalPoints"] = totalPoints
        
        totalPoints = 0
        players = []
        for( let player of this.CHINTAN_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        chintan["players"] = players
        chintan["totalPoints"] = totalPoints
        
        totalPoints = 0
        players = []
        for( let player of this.RISHAB_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        rishab["players"] = players
        rishab["totalPoints"] = totalPoints

        totalPoints = 0
        players = []
        for( let player of this.MOHIL_TEAM){
            totalPoints += this.state.playerStats[player].totalPoints;
            players.push({"name":player,"stats":this.state.playerStats[player].stats})
        }
        mohil["players"] = players
        mohil["totalPoints"] = totalPoints

        let response = [];
        response.push(abhishek)
        response.push(deval)
        response.push(arnav)
        response.push(chintan)
        response.push(dhawan)
        response.push(rishab)
        response.push(mohil)

        return response;
    }
}