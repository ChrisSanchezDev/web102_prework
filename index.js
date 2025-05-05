/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    console.log("addGamesToPage function started")

    for (let i = 0; i < games.length; i++) {    

        const game = games[i];

        const gameCard = document.createElement("div"); // create a new div element

        gameCard.classList.add("game-card"); // add the class game-card to the div

        const display = `
            <div class="game-card-content">
                <img class="game-img" src="${game.img}"></img>
                <p>${game.name}</p>
                <p>Donators pledged $${game.pledged.toLocaleString('en-US')}</p>
            </div>
        `;

        gameCard.innerHTML = display;

        const gamesContainer = document.getElementById("games-container");
        gamesContainer.append(gameCard);
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

        console.log("addGamesToPage function finished");
    }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');
console.log(totalContributions);


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
raisedCard.innerHTML =  "$" + totalRaised.toLocaleString('en-US');
console.log("Total raised: " + totalRaised);

const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString('en-US');
console.log("Total games: " + totalGames);


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    console.log("filterUnfundedOnly function started");

    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter( (game) => {
        if (game.pledged < game.goal){
            console.log(game.name + ": " + game.pledged + " < " + game.goal);
            return true;
        }
        return false;
    });

    // Console log to ensure it worked.
    console.log("Unfunded Games: " + listOfUnfundedGames.length)

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);

    console.log("filterUnfundedOnly function finished");
}

// show only games that are fully funded
function filterFundedOnly() {
    console.log("filterFundedOnly function started");
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter( (game) => {
        if (game.pledged > game.goal){
            console.log(game.name + ": " + game.pledged + " > " + game.goal);
            return true;
        }
        return false;
    });

    // Console log to ensure it worked.
    console.log("Funded Games: " + listOfFundedGames.length)

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);

    console.log("filterFundedOnly function started");
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
const allBtn = document.getElementById("all-btn").addEventListener("click",showAllGames);

// add event listeners with the correct functions to each button



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// get num of unfunded games
let numOfUnfundedGames = GAMES_JSON.reduce((acc, game) => {
    return acc + (game.pledged < game.goal ? 1 : 0);
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
let displayStr = `A total of ${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games.
        Currently, ${numOfUnfundedGames == 1 ? numOfUnfundedGames + " game remains" : 
        numOfUnfundedGames + " games remain"} unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
let descCard = document.getElementById("description-container");
descCard.innerHTML = displayStr;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameName = firstGame.name;
firstGameContainer.innerHTML = firstGameName;

// do the same for the runner up item
let secondGameName = secondGame.name;
secondGameContainer.innerHTML = secondGameName;