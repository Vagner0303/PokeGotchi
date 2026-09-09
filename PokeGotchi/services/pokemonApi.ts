import { PokemonInfo } from '../types/pokemon'


// Busca um Pokémon pelo nome ou ID
export async function buscarPokemonPorNome(
    nomeOuId: string | number
): Promise<PokemonInfo> {

    // Faz a busca na API
    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`
    )

    // Converte a resposta para JSON
    const dados = await resposta.json()

    // Retorna apenas as informações que vamos usar
    return {
        name: dados.name,
        imagem: dados.sprites.front_default,
        tipo: dados.types[0]?.type?.name ?? 'desconhecido',
        altura: dados.height / 10,
        peso: dados.weight / 10,
    }
}


// Busca os 3 Pokémon diferentes
export async function buscarListaPokemons(): Promise<PokemonInfo[]> {

    // Define os 3 Pokémon que serão buscados
    const nomes = ['bulbasaur', 'charmander', 'squirtle']

    // Faz as 3 buscas
    return Promise.all(

        // Passa por cada nome e busca o Pokémon
        nomes.map((nome) => buscarPokemonPorNome(nome))
    )
}