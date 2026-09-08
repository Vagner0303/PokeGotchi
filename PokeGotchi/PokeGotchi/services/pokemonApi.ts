import { PokemonInfo } from '../types/pokemon'

// Busca os dados de UM pokémon, por nome ou por ID numérico
export async function buscarPokemonPorNome(nomeOuId: string | number): Promise<PokemonInfo> {
    // Faz a requisição da API
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId}`)
    // Converte a resposta em JSON
    const dados = await resposta.json()

    // Pega as informacoes da API
    return {
        name: dados.name,
        imagem: dados.sprites.front_default,               
        tipo: dados.types[0]?.type?.name ?? 'desconhecido', 
        altura: dados.height / 10,                          // converte para metros
        peso: dados.weight / 10,                            // converte para kg
    }
}

// Busca pokémons a partir de uma lista de nomes ou ID
export async function buscarPokemons(identificadores: (string | number)[]): Promise<PokemonInfo[]> {
    //dispara todas as requisições ao mesmo tempo
    return Promise.all(identificadores.map(buscarPokemonPorNome))
}

// Busca uma lista "genérica" de pokémons (os primeiros N da API, sem nomes específicos)
export async function buscarListaPokemons(limit: number = 3): Promise<PokemonInfo[]> {
    // Busca apenas nome + url resumidos
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    const dados = await resposta.json()

    // Extrai só os nomes retornados
    const nomes = dados.results.map((item: { name: string }) => item.name)

    // Reaproveita a função acima para buscar os detalhes completos de cada nome
    return buscarPokemons(nomes)
}