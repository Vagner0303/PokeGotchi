import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Text, Card, Button } from 'react-native-paper'
import { useBuscarPokemon } from '../utils/useBuscarPokemons'

const Home = ({ route }: any) => {
  // Pega o nome do pokémon enviado pela tela anterior via navigation.navigate
  const { nome } = route.params

  // Chama a API na própria Home, usando o nome recebido
  const { pokemon, carregando } = useBuscarPokemon(nome)

  // Enquanto os dados não chegam (ou se `pokemon` ainda é null),
  // mostra um indicador de carregamento em vez de tentar ler propriedades inexistentes
  if (carregando || !pokemon) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fa3c3cff" />
      </View>
    )
  }

  // A partir daqui, `pokemon` com certeza tem todos os dados preenchidos
  const { name, imagem, tipo, altura, peso } = pokemon

  return (
    <View style={styles.container}>
    
      <Card style={styles.card}>
        <Card.Title
          title={name}
          titleStyle={{ color: '#fff', textTransform: 'capitalize', width: 0 }}
        />
        <Card.Cover source={{ uri: imagem }} style={styles.imagem} />
      </Card>

      <Card style={styles.cardInfo}>
        <Card.Title
          title={name}
          titleStyle={{ color: '#000000ff', fontWeight: '900', textTransform: 'capitalize', fontSize: 19, right: 160, width: 120, top: 4 }}
        />
        <Card.Content>

          <Text style={styles.texto}> {tipo}</Text>
        </Card.Content>
        <Card.Content>

          <Text style={styles.altura}>Altura: {altura} m</Text>
        </Card.Content>
        <Card.Content>

          <Text style={styles.peso}>Peso: {peso} kg</Text>
        </Card.Content>
      </Card>
    <Card style={styles.cuidados}>
        <Text style={styles.Saciedade}> 🍗Saciedade: {}</Text>
        <Text style={styles.Felicidade}> 💖Felicidade: {}</Text>
        <Text style={styles.Energia}> ⚡Energia: {}</Text>
        <Text style={styles.Higiene}> ✨Higiene: {}</Text>
      </Card> 

      <Card style={styles.acoes}> 
        <Text style={styles.atividades}> O QUE FAZER?</Text>
        <Button style={styles.alimentar}> 🍜Alimentar</Button>
        <Button style={styles.brincar}> ⚾Brincar</Button>
        <Button style={styles.dormir}> 💤Dormir</Button>
        <Button style={styles.limpar}> 🛁Limpar</Button>
        <Button style={styles.treinar}> 🦾Treinar +25 EXP</Button>
      </Card>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap:10,
  },
  card: {
    display:'flex',
    backgroundColor: '#fa3c3cff',
    width: 420,
    alignItems: 'center',
    top:10,
    height:300
  },

  cardInfo:{
    display:'flex',
    backgroundColor: '#ffffffff',
    width: 420,
    alignItems: 'center',
    top:10
  },

  imagem: {
    backgroundColor: '#fff',
    width:300
  },
  texto: {
    display:'flex',
    color: '#fff',
    marginTop: 8,
    justifyContent:'center',
    textAlign:'center',
    textTransform: 'uppercase',
    borderRadius:20,
    width:60,
    top:-46,
    left:170,
    padding:5,
    backgroundColor:'#ff7301ff',
    fontWeight:700,
    
  },

  altura: {
    display:'flex',
    color: '#000000ff',
    top:-28,
    right:160
  },

  peso: {
    display:'flex',
    color: '#000000ff',
    top:-45,
    right:45
  },

  cuidados: {
    display: "flex",
    backgroundColor: "white",
    width: 420,
    height: 200,
    gap: 10,
  },



  Saciedade: {
    borderStartColor: "black",
    width: 200,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Felicidade: {
    borderStartColor: "black",
    width: 200,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Energia: {
    borderStartColor: "black",
    width: 200,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Higiene: {
    borderStartColor: "black",
    width: 200,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },

  acoes: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  atividades: {},
  alimentar: {},
  brincar: {},
  dormir: {},
  limpar: {},
  treinar: {}
})