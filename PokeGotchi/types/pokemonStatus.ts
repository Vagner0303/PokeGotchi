// Define quais informações o Pokémon possui
export interface PokemonStatus {
  fome: number
  saciedade: number
  felicidade: number
  energia: number
  higiene: number
  nivel: number
  xp: number
  ultimaAtualizacao: number
}


// Define os valores iniciais do Pokémon
export const STATUS_INICIAL: PokemonStatus = {

  fome: 0,
  saciedade: 100,
  felicidade: 100,
  energia: 100,
  higiene: 100,
  nivel: 1,
  xp: 0,

  // Guarda o horário atual
  ultimaAtualizacao: Date.now(),

}