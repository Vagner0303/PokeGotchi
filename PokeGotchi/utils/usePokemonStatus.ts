import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PokemonStatus, STATUS_INICIAL } from '../types/pokemonStatus'


// Define a velocidade que os status diminuem ou aumentam com o tempo
const TAXA = {
  fome: 5,
  saciedade: -3,
  felicidade: -2,
  energia: -3,
  higiene: -2,
}


// Impede que os status fiquem abaixo de 0 ou acima de 100
const clamp = (valor: number) =>
  Math.max(0, Math.min(100, valor))


// Cria uma chave para salvar os dados de cada Pokémon separadamente
const chave = (nome: string) =>
  `@pokemon_status_${nome}`


// Atualiza os status automaticamente de acordo com o tempo que passou
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


// Hook responsável por controlar toda a vida e os status do Pokémon
export function usePokemonStatus(nome: string) {

  // Guarda os status atuais do Pokémon
  const [status, setStatus] = useState<PokemonStatus>({
    ...STATUS_INICIAL,
    ultimaAtualizacao: Date.now(),
  })


  // Controla o carregamento dos dados salvos
  const [carregando, setCarregando] = useState(true)


  // Carrega os dados do Pokémon salvos no celular
  useEffect(() => {
    AsyncStorage.getItem(chave(nome)).then((dados) => {
      if (dados) {
        setStatus(atualizarTempo(JSON.parse(dados)))
      }

      setCarregando(false)
    })
  }, [nome])


  // Atualiza os status em tempo real a cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setStatus((atual) => atualizarTempo(atual))
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])


  // Salva o progresso do Pokémon automaticamente a cada 10 segundos
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


  // Função usada para aplicar mudanças nos status e salvar os dados
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


  // Alimenta o Pokémon, diminuindo a fome e aumentando a saciedade
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


  // Brincar aumenta a felicidade, mas gasta energia e aumenta a fome
  function brincar() {
    acao({
      felicidade: clamp(status.felicidade + 20),
      energia: clamp(status.energia - 10),
      fome: clamp(status.fome + 5),
    })
  }


  // Dormir recupera energia, mas diminui um pouco a higiene
  function dormir() {
    acao({
      energia: clamp(status.energia + 40),
      higiene: clamp(status.higiene - 5),
    })
  }


  // Limpar aumenta a higiene do Pokémon
  function limpar() {
    acao({
      higiene: clamp(status.higiene + 30),
    })
  }


  // Treinar aumenta o XP, pode subir o nível e gasta energia
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


  // Disponibiliza os status e as ações para a Home
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