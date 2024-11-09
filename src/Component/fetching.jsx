export const fetchPokemon = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=12"; // URL to get list of Pokémon

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  // Fetch additional Pokémon data for images
  const promises = data.results.map(async (item) => {
    const res = await fetch(item.url); // Fetch each Pokémon's detailed info
    const pokemonData = await res.json();

    return {
      id: item.name, // Unique identifier
      image: pokemonData.sprites.front_default, // Pokémon image
    };
  });

  return Promise.all(promises); // Wait for all fetches to complete
};
