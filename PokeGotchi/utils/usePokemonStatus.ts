import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PokemonStatus, STATUS_INICIAL } from '../types/pokemonStatus'

const TAXA = {
  fome: 5,
  saciedade: -3,
  felicidade: -2,
  energia: -3,
  higiene: -2,
}

const clamp = (valor: number) =>
  Math.max(0, Math.min(100, valor))

const chave = (nome: string) =>
  `@pokemon_status_${nome}`

function atualizarTempo(status: PokemonStatus) {
  const minutos =
    (Date.now() - status.ultimaAtualizacao) / 60000

  return {
    ...status,
    fome: clamp(status.fome + TAXA.fome * minutos),
    saciedade: clamp(status.saciedade + TAXA.saciedade * minutos),
    felicidade: clamp(status.felicidade + TAXA.felicidade * minutos),
    energia: clamp(status.energia + TAXA.energia * minutos),
    higiene: clamp(status.higiene + TAXA.higiene * minutos),
  }
}

export function usePokemonStatus(nome: string) {
  const [status, setStatus] = useState<PokemonStatus>({
    ...STATUS_INICIAL,
    ultimaAtualizacao: Date.now(),
  })

  const [carregando, setCarregando] = useState(true)

  // Carrega os dados salvos
  useEffect(() => {
    AsyncStorage.getItem(chave(nome)).then((dados) => {
      if (dados) {
        setStatus(atualizarTempo(JSON.parse(dados)))
      }

      setCarregando(false)
    })
  }, [nome])

  // Atualiza os números a cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setStatus((atual) => atualizarTempo(atual))
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  // Salva a cada 10 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setStatus((atual) => {
        const novo = {
          ...atualizarTempo(atual),
          ultimaAtualizacao: Date.now(),
        }

        AsyncStorage.setItem(
          chave(nome),
          JSON.stringify(novo)
        )

        return novo
      })
    }, 10000)

    return () => clearInterval(intervalo)
  }, [nome])

  // Executa uma ação
  function acao(mudancas: Partial<PokemonStatus>) {
    setStatus((atual) => {
      const novo = {
        ...atualizarTempo(atual),
        ...mudancas,
        ultimaAtualizacao: Date.now(),
      }

      AsyncStorage.setItem(
        chave(nome),
        JSON.stringify(novo)
      )

      return novo
    })
  }

  function alimentar() {
    setStatus((atual) => {
      const novo = {
        ...atualizarTempo(atual),
        fome: clamp(atual.fome - 30),
        saciedade: clamp(atual.saciedade + 25),
        ultimaAtualizacao: Date.now(),
      }

      AsyncStorage.setItem(chave(nome), JSON.stringify(novo))
      return novo
    })
  }

  function brincar() {
    acao({
      felicidade: clamp(status.felicidade + 20),
      energia: clamp(status.energia - 10),
      fome: clamp(status.fome + 5),
    })
  }

  function dormir() {
    acao({
      energia: clamp(status.energia + 40),
      higiene: clamp(status.higiene - 5),
    })
  }

  function limpar() {
    acao({
      higiene: clamp(status.higiene + 30),
    })
  }

  function treinar() {
    setStatus((atual) => {
      let xp = atual.xp + 25
      let nivel = atual.nivel

      if (xp >= 100) {
        xp -= 100
        nivel++
      }

      const novo = {
        ...atualizarTempo(atual),
        xp,
        nivel,
        energia: clamp(atual.energia - 20),
        fome: clamp(atual.fome + 10),
        ultimaAtualizacao: Date.now(),
      }

      AsyncStorage.setItem(
        chave(nome),
        JSON.stringify(novo)
      )

      return novo
    })
  }

  return {
    status,
    carregando,
    alimentar,
    brincar,
    dormir,
    limpar,
    treinar,
  }
}
