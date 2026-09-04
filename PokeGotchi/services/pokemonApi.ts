import { PokemonInfo } from '../types/pokemon'

export async function buscarPokemonPorNome(nomeOuId: string | number): Promise<PokemonInfo> {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId}`)
    const dados = await resposta.json()

    /* const nivel =  */
    console.log(dados.height/10)
    return {
        name: dados.name,
        imagem: dados.sprites.front_default,
        tipo: dados.types[0]?.type?.name ?? 'desconhecido',
        altura: dados.height / 10,
        peso: dados.weight /10,
        /* nivel: nivel */
}
    }


export async function buscarPokemons(identificadores: (string | number)[]): Promise<PokemonInfo[]> {
    return Promise.all(identificadores.map(buscarPokemonPorNome))
}

export async function buscarListaPokemons(limit: number = 3): Promise<PokemonInfo[]> {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    const dados = await resposta.json()

    const nomes = dados.results.map((item: { name: string }) => item.name)
    
    return buscarPokemons(nomes)
}
