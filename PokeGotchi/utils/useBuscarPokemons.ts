import { useEffect, useState } from 'react'
import { buscarVariosPokemons, buscarListaPokemons } from '../services/pokemonApi'
import { PokemonInfo } from '../types/pokemon'

export function useBuscarPokemonsPorNome(nomes: (string | number)[]) {
    const [pokemons, setPokemons] = useState<PokemonInfo[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true)
                const infos = await buscarVariosPokemons(nomes)
                setPokemons(infos)
            } catch (erro) {
                console.log('Deu merda: ', erro)
            } finally {
                setCarregando(false)
            }
        }
        carregar()
    }, [])

    return { pokemons, carregando }
}

export function useBuscarListaPokemons(limit: number = 3) {
    const [pokemons, setPokemons] = useState<PokemonInfo[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true)
                const infos = await buscarListaPokemons(limit)
                setPokemons(infos)
            } catch (erro) {
                console.log('Deu merda: ', erro)
            } finally {
                setCarregando(false)
            }
        }
        carregar()
    }, [limit])

    return { pokemons, carregando }
}