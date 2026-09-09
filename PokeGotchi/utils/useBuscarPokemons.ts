import { useEffect, useState } from 'react'
import { buscarPokemons, buscarListaPokemons, buscarPokemonPorNome } from '../services/pokemonApi'
import { PokemonInfo } from '../types/pokemon'


function useCarregarPokemon<T>(
    buscar: () => Promise<T>,
    valorInicial: T,
    deps: React.DependencyList
) {
    const [dados, setDados] = useState<T>(valorInicial)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true)
                const resultado = await buscar()
                setDados(resultado)
            } catch (erro) {
                console.log('Deu merda: ', erro)
            } finally {
                setCarregando(false)
            }
        }
        carregar()
    }, deps)

    return { dados, carregando }
}

export function useBuscarPokemonsPorNome(nomes: (string | number)[]) {
    const { dados, carregando } = useCarregarPokemon<PokemonInfo[]>(
        () => buscarPokemons(nomes), [], []
    )
    return { pokemons: dados, carregando }
}

export function useBuscarListaPokemons(limit: number = 3) {
    const { dados, carregando } = useCarregarPokemon<PokemonInfo[]>(
        () => buscarListaPokemons(limit), [], [limit]
    )
    return { pokemons: dados, carregando }
}

export function useBuscarPokemon(nomeOuId: string | number) {
    const { dados, carregando } = useCarregarPokemon<PokemonInfo | null>(
        () => buscarPokemonPorNome(nomeOuId), null, [nomeOuId]
    )
    return { pokemon: dados, carregando }
}