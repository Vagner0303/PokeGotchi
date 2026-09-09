import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Text, Card, Button, ProgressBar } from 'react-native-paper'
import { useBuscarPokemon } from '../utils/useBuscarPokemons'
import { usePokemonStatus } from '../utils/usePokemonStatus'


// Cria a tela principal do Pokémon
const Home = ({ route }: any) => {

  // Pega o nome do Pokémon enviado pela tela anterior
  const { nome } = route.params


  // Busca as informações do Pokémon na API
  const { pokemon, carregando } = useBuscarPokemon(nome)


  // Pega os status e as ações do Pokémon
  const {
    status,
    carregando: carregandoStatus,
    alimentar,
    brincar,
    dormir,
    limpar,
    treinar,
  } = usePokemonStatus(nome)


  // Mostra uma tela de carregamento enquanto os dados não estiverem prontos
  if (carregando || !pokemon || carregandoStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fa3c3c" />
      </View>
    )
  }


  // Pega as informações principais do Pokémon
  const { name, imagem, tipo, altura, peso } = pokemon

  return (
    <View style={styles.container}>

      <Card style={styles.card}>
        <Card.Title
          title={name}
          titleStyle={{
            color: '#fff',
            textTransform: 'capitalize',
            width: 100,
            left: 90,
          }}
        />

        <Card.Cover
          source={{ uri: imagem }}
          style={styles.imagem}
        />
      </Card>

      <Card style={styles.cardInfo}>

        <Card.Title
          title={name}
          titleStyle={{
            color: '#000',
            fontWeight: '900',
            textTransform: 'capitalize',
            fontSize: 19,
            right: 140,
            width: 140,
            top: 4,
          }}
        />

        <Card.Content>
          <Text style={styles.texto}>{tipo}</Text>
        </Card.Content>

        <Card.Content>
          <Text style={styles.altura}>
            Altura: {altura} m
          </Text>
        </Card.Content>

        <Card.Content>
          <Text style={styles.peso}>
            Peso: {peso} kg
          </Text>
        </Card.Content>

        <Card.Content>
          <Text style={styles.nivel}>
            Nivel: {status.nivel}
          </Text>
        </Card.Content>

        <Card.Content>
          <Text style={styles.xp}>
            {status.xp} / 100 XP
          </Text>
        </Card.Content>

      </Card>

      <Card style={styles.cuidados}>

        <View style={styles.linhaStatus}>
          <Text style={styles.rotuloStatus}>
            🍗 Saciedade
          </Text>

          <ProgressBar
            progress={status.saciedade / 100}
            color="#1da51d"
            style={styles.barra}
          />
        </View>

        <View style={styles.linhaStatus}>
          <Text style={styles.rotuloStatus}>
            💖 Felicidade
          </Text>

          <ProgressBar
            progress={status.felicidade / 100}
            color="#e2218c"
            style={styles.barra}
          />
        </View>

        <View style={styles.linhaStatus}>
          <Text style={styles.rotuloStatus}>
            ⚡ Energia
          </Text>

          <ProgressBar
            progress={status.energia / 100}
            color="#af4ce9"
            style={styles.barra}
          />
        </View>

        <View style={styles.linhaStatus}>
          <Text style={styles.rotuloStatus}>
            ✨ Higiene
          </Text>

          <ProgressBar
            progress={status.higiene / 100}
            color="#21a5e2"
            style={styles.barra}
          />
        </View>

        <View style={styles.linhaStatus}>
          <Text style={styles.rotuloStatus}>
            🍖 Fome
          </Text>

          <ProgressBar
            progress={status.fome / 100}
            color="#e21818"
            style={styles.barra}
          />
        </View>

      </Card>

      <Card style={styles.acoes}>

        <Text style={styles.atividades}>
          O QUE FAZER?
        </Text>

        <View style={styles.separacao}>

          <Button
            style={styles.alimentar}
            onPress={alimentar}
          >
            <Text style={styles.txtbtn}>
              🍜 Alimentar
            </Text>
          </Button>

          <Button
            style={styles.brincar}
            onPress={brincar}
          >
            <Text style={styles.txtbtn}>
              ⚾ Brincar
            </Text>
          </Button>

        </View>

        <View style={styles.separacao}>

          <Button
            style={styles.dormir}
            onPress={dormir}
          >
            <Text style={styles.txtbtn}>
              💤 Dormir
            </Text>
          </Button>

          <Button
            style={styles.limpar}
            onPress={limpar}
          >
            <Text style={styles.txtbtn}>
              🛁 Limpar
            </Text>
          </Button>

        </View>

        <Button
          style={styles.treinar}
          onPress={treinar}
        >
          <Text style={styles.txtbtn}>
            🦾 Treinar +25 EXP
          </Text>
        </Button>

      </Card>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  card: {
    display: 'flex',
    backgroundColor: '#fa3c3c',
    width: 420,
    alignItems: 'center',
    top: 10,
    height: 250,
  },

  cardInfo: {
    display: 'flex',
    backgroundColor: '#fff',
    width: 420,
    alignItems: 'center',
    top: 10,
  },

  separacao: {
    flexDirection: 'row',
  },

  imagem: {
    backgroundColor: '#fff',
    width: 300,
  },

  texto: {
    display: 'flex',
    color: '#fff',
    marginTop: 8,
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    borderRadius: 20,
    width: 60,
    top: -46,
    left: 190,
    padding: 5,
    backgroundColor: '#ff7301',
    fontWeight: '700',
  },

  altura: {
    display: 'flex',
    color: '#000',
    top: -28,
    right: 140,
  },

  peso: {
    display: 'flex',
    color: '#000',
    top: -45,
    right: 45,
  },

  cuidados: {
    display: 'flex',
    backgroundColor: '#fff',
    width: 420,
    padding: 10,
    gap: 8,
    top: 10,
  },

  linhaStatus: {
    width: '100%',
  },

  rotuloStatus: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },

  barra: {
    height: 10,
    borderRadius: 6,
  },

  acoes: {
    backgroundColor: '#fff',
    width: 420,
    top: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 240,
  },

  atividades: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },

  alimentar: {
    backgroundColor: '#e21818',
    width: 150,
    margin: 10,
    borderRadius: 15,
  },

  brincar: {
    backgroundColor: '#1da51d',
    width: 150,
    margin: 10,
    borderRadius: 15,
  },

  dormir: {
    backgroundColor: '#af4ce9',
    width: 150,
    margin: 10,
    borderRadius: 15,
  },

  limpar: {
    backgroundColor: '#21a5e2',
    width: 150,
    margin: 10,
    borderRadius: 15,
  },

  treinar: {
    backgroundColor: '#234fdf',
    width: '100%',
    marginTop: 10,
    borderRadius: 15,
  },

  txtbtn: {
    color: '#fff',
    fontWeight: '900',
  },

  nivel: {
    color: '#000',
  },

  xp: {
    color: '#000',
  },
})
