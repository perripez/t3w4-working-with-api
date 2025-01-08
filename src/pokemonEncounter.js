console.log("Pokemon Journey Begins...")

const encounterButton = document.getElementById("pokemonEncounterButton")

async function getPokemon(){
        console.log("Looking for a wild Pokemon");

        let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        let apiData = await apiResponse.json();

        // Fetch name, type, image, cry
        // let pokemonName = apiData.name;
        return {
            name: apiData.name,
            types: apiData.types,
            image: apiData.sprites.other.home.front_default,
            cries: apiData.cries.latest
        }

        return pokemonName;
}

// encounterButton.addEventListener("click", getPokemon);

encounterButton.addEventListener("click", async (event) => {
    console.log("Doing something...");
    let pokemonResult = await getPokemon();

    console.log(pokemonResult);
});
