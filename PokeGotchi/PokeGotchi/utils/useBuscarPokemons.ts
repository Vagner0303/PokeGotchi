import { useEffect, useState } from 'react'
import { buscarPokemons, buscarListaPokemons, buscarPokemonPorNome } from '../services/pokemonApi'
import { PokemonInfo } from '../types/pokemon'

// Hook que busca VÁRIOS pokémons a partir de uma lista de nomes/ids
export function useBuscarPokemonsPorNome(nomes: (string | number)[]) {
    const [pokemons, setPokemons] = useState<PokemonInfo[]>([]) // guarda a lista de resultados
    const [carregando, setCarregando] = useState(true)          // controla o estado de loading

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true)
                const infos = await buscarPokemons(nomes) // busca todos em paralelo
                setPokemons(infos)
            } catch (erro) {
                console.log('Deu merda: ', erro) // log simples de erro
            } finally {
                setCarregando(false) // desliga o loading independente de sucesso ou erro
            }
        }
        carregar()
        // Array vazio [] = roda só uma vez, quando o componente monta
    }, [])

    return { pokemons, carregando }
}

// Hook que busca uma lista "genérica" de pokémons (os N primeiros da PokéAPI)
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
        // [limit] = roda de novo sempre que o limite mudar
    }, [limit])

    return { pokemons, carregando }
}

// Hook que busca UM ÚNICO pokémon (usado na tela Home)
export function useBuscarPokemon(nomeOuId: string | number) {
    const [pokemon, setPokemon] = useState<PokemonInfo | null>(null) // começa como null (ainda não chegou)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true)
                const info = await buscarPokemonPorNome(nomeOuId) // chama a API pra esse pokémon específico
                setPokemon(info)
            } catch (erro) {
                console.log('Deu merda: ', erro)
            } finally {
                setCarregando(false)
            }
        }
        carregar()
        // [nomeOuId] = se o nome/id recebido mudar, busca de novo
    }, [nomeOuId])

    return { pokemon, carregando }
}