console.log("Pokemon Journey Begins...")

const encounterButton = document.getElementById("pokemonEncounterButton");
const pokemonRenderArea = document.getElementById("encounterPokemonArea");
const pokemonContainerDiv = document.getElementById("pokemonContainer");
const encounterGroupButton = document.getElementById("pokemonGroupEncounterButton");

function renderPokemonData(pokemonData){
    if (!pokemonData.name){
        return;
    }
    // This div has class now
    pokemonContainerDiv.classList += "pokemonCardEntry";

    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainerDiv.appendChild(pokemonHeading);

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.image;
    pokemonContainerDiv.appendChild(pokemonImage);

    let pokemonTypesHeading = document.createElement("h3");
    pokemonTypesHeading.innerText = "Types: ";
    pokemonContainerDiv.appendChild(pokemonTypesHeading);

    let pokemonTypesList = document.createElement("ul");
    // Loop through the array of pokemonData
    pokemonData.types.forEach((typeObject) => {
        // Create li element for each type
        let pokemonTypesListItem = document.createElement("li");
        // Add name to li
        pokemonTypesListItem.innerText = typeObject.type.name;
        // Append it to the ul
        pokemonTypesList.appendChild(pokemonTypesListItem);
    });
    pokemonContainerDiv.appendChild(pokemonTypesList);

    let pokemonAudioButton = document.createElement("button");
    pokemonAudioButton.innerText = "Play Sound"
    pokemonAudioButton.addEventListener("click", () => {
        let pokemonAudioObject = new Audio(pokemonData.cries);
        pokemonAudioObject.play();
    });
    pokemonContainerDiv.appendChild(pokemonAudioButton);

    pokemonRenderArea.appendChild(pokemonContainerDiv);
};

function getRandomPokemon(){
    // Random number between 1 and 1025 (max number of pokemon)
    return Math.ceil(Math.random() * 1025);
}

async function getPokemon(){
        console.log("Looking for a wild Pokemon");

        let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemon());
        let apiData = await apiResponse.json();

        // Fetch name, type, image, cry
        // let pokemonName = apiData.name;
        return {
            name: apiData.name,
            types: apiData.types,
            image: apiData.sprites.other.home.front_default,
            cries: apiData.cries.latest
        }

}

// encounterButton.addEventListener("click", getPokemon);

encounterButton.addEventListener("click", async (event) => {
    console.log("Doing something...");
    let pokemonResult = await getPokemon();
    
    console.log(pokemonResult);

    renderPokemonData(pokemonResult);
});

encounterGroupButton.addEventListener("click", async () => {
    pokemonRenderArea.innerText = "";
    // From what we've learnt so far
    // let pokemonResult1 = await getPokemon();
    // renderPokemonData(pokemonResult1);
    // let pokemonResult2 = await getPokemon();
    // renderPokemonData(pokemonResult2);
    // let pokemonResult3 = await getPokemon();
    // renderPokemonData(pokemonResult3);

    let multiplePokemonResults = await Promise.all([
        getPokemon(),
        getPokemon(),
        getPokemon(),
        getPokemon(),
        getPokemon(),
        getPokemon()
    ]);

    // Check if the output is as expected
    console.log(multiplePokemonResults);

    // Lengthier version of the above code
    multiplePokemonResults.forEach(renderPokemonData);
    // multiplePokemonResults.forEach((pokemonResult) => {
    //     renderPokemonData(pokemonResult);
    // });
});

