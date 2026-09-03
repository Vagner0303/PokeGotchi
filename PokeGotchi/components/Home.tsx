import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, Card } from 'react-native-paper'

const Home = ({ route }: any) => {
  const { nome, imagem, tipo, altura, peso } = route.params

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={nome}
          titleStyle={{ color: '#fff', textTransform: 'capitalize', width:0 }}
        />
        <Card.Cover source={{ uri: imagem }} style={styles.imagem} />
        

      </Card>
      <Card style={styles.cardInfo}>
        <Card.Title
          title={nome}
          titleStyle={{ color: '#000000ff', fontWeight:900, textTransform: 'capitalize', fontSize:19, right:160, width:120, top:4}}
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
    backgroundColor:'red',
    
   
  },

  peso: {
    display:'flex',
    color: '#000000ff',
    backgroundColor:'red',
    
  }
})