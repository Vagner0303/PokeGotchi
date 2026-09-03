import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, Card } from 'react-native-paper'

const Home = ({ route }: any) => {
  const { nome, imagem, tipo, altura, peso, pokebola, nivel } = route.params

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
          titleStyle={{ color: '#fff', textTransform: 'capitalize', fontSize:19, right:160, width:120, top:4}}
        />
        
        <Card.Content>
          <Text style={styles.texto}> {tipo}</Text>
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
    backgroundColor: '#050e3fff',
    width: 420,
    alignItems: 'center',
    top:10,
    height:300
  },

  cardInfo:{
    display:'flex',
    backgroundColor: '#050e3fff',
    width: 420,
    alignItems: 'center',
    top:10
  },

  imagem: {
    backgroundColor: '#fff',
    width:100
  },
  texto: {
    display:'flex',
    color: '#fff',
    marginTop: 8,
   justifyContent:'center',
    textTransform: 'capitalize',
    borderRadius:10,
    width:50,
    top:-46,
    left:160,
    padding:5,
    backgroundColor:'red'
    
  },
})