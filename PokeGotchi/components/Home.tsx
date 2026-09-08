import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Text, Card, Button } from 'react-native-paper'
import { useBuscarPokemons } from '../utils/useBuscarPokemons'

const Home = ({ route }: any) => {
  // Pega o nome do pokémon enviado pela tela anterior via navigation.navigate
  const { nome } = route.params

  // Chama a API na própria Home, usando o nome recebido
  const { pokemon, carregando } = useBuscarPokemons(nome)

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
          titleStyle={{ display: 'flex', color: '#fff', textTransform: 'capitalize', width: 100, left:90 }}/>

        <Card.Cover source={{ uri: imagem }} style={styles.imagem} />
      </Card>

      <Card style={styles.cardInfo}>
        <Card.Title
          title={name}
          titleStyle={{ color: '#000000ff', fontWeight: '900', textTransform: 'capitalize', fontSize: 19, right: 140, width: 140, top: 4 }}
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

         <Card.Content>

          <Text style={styles.nivel}>Nivel: 5 </Text>
        </Card.Content>

        <Card.Content>
        <Text style={styles.xp}> 
            100 / 100  XP</Text>
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
        <View style={styles.separacao}>
        <Button style={styles.alimentar}><Text style={styles.txtbtn}> 🍜Alimentar</Text></Button>
        <Button style={styles.brincar}><Text style={styles.txtbtn}> ⚾Brincar</Text></Button>
        </View>

          <View style={styles.separacao}>
        <Button style={styles.dormir}><Text style={styles.txtbtn}> 💤Dormir</Text></Button>
        <Button style={styles.limpar}><Text style={styles.txtbtn}> 🛁Limpar</Text></Button>
        </View>
        <Button style={styles.treinar}><Text style={styles.txtbtn}> 🦾Treinar +25 EXP</Text></Button>
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
    height:250
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
    left:190,
    padding:5,
    backgroundColor:'#ff7301ff',
    fontWeight:700,
    
  },

  altura: {
    display:'flex',
    color: '#000000ff',
    top:-28,
    right:140
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
    top:10,
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
    backgroundColor: "white",
    width: 420,
    top:10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height:240
  },
  
  atividades: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  alimentar: {
    backgroundColor: "#e21818ff",
    width: 150,
    margin: 10,
    borderRadius: 15,
    fontSize: 10,
  },
  brincar: {
    backgroundColor: "#1da51dff",
    width: 150,
    margin: 10,
    borderRadius: 15,
    fontSize: 10,
  },
  dormir: {
    backgroundColor: "#af4ce9ff",
    width: 150,
    margin: 10,
    borderRadius: 15,
    fontSize: 10,
  },
  limpar: {
    backgroundColor: "#21a5e2ff",
    width: 150,
    margin: 10,
    borderRadius: 15,
    fontSize: 10,
  },
  treinar: {
    backgroundColor: "#234fdfff",
    width: "100%",
    marginTop: 10,
    borderRadius: 15,
    fontSize: 10,
  },
  txtbtn:{
    color: "white",
    fontWeight: 900,
  },

  separacao:{
    flexDirection: 'row',
  },

  nivel: {color:'black'},

  xp: {color:'black'},
})