
import { useEffect, useState } from 'react'
import { buscarListaPokemons, buscarPokemonPorNome } from '../services/pokemonApi'
import { PokemonInfo } from '../types/pokemon'

// Função que faz a busca e controla o carregamento
function useCarregarPokemon<T>(
    buscar: () => Promise<T>, // Função que busca os dados
    valorInicial: T,           // Valor inicial
    deps: React.DependencyList // Define quando fazer a busca novamente
) {

    // Guarda os dados
    const [dados, setDados] = useState<T>(valorInicial)

    // Diz se está carregando
    const [carregando, setCarregando] = useState(true)


    // Executa a busca
    useEffect(() => {

        async function carregar() {
            try {

                // Começa o carregamento
                setCarregando(true)

                // Faz a busca
                const resultado = await buscar()

                // Guarda os dados
                setDados(resultado)

            } catch (erro) {

                // Mostra o erro
                console.log('Erro:', erro)

            } finally {

                // Termina o carregamento
                setCarregando(false)
            }
        }

        carregar()

    }, deps)


    // Retorna os dados e o carregamento
    return { dados, carregando }
}


// Busca os 3 Pokémon
export function useBuscarListaPokemons() {

    const { dados, carregando } = useCarregarPokemon<PokemonInfo[]>(
        buscarListaPokemons,

        // Começa com uma lista vazia
        [],

        // Executa apenas uma vez
        []
    )

    return { pokemons: dados, carregando }
}


// Busca um Pokémon
export function useBuscarPokemon(nomeOuId: string | number) {

    const { dados, carregando } = useCarregarPokemon<PokemonInfo | null>(

        // Busca pelo nome ou ID
        () => buscarPokemonPorNome(nomeOuId),

        // Começa sem Pokémon
        null,

        // Busca novamente se o nome ou ID mudar
        [nomeOuId]
    )

    return { pokemon: dados, carregando }
}