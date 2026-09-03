import * as React from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import { useBuscarPokemonsPorNome } from '../utils/useBuscarPokemons';

const NOMES_POKEMONS = ['bulbasaur', 'charmander', 'squirtle']

export default function EscolhaScreen({ navigation }: any) {
  const { pokemons } = useBuscarPokemonsPorNome(NOMES_POKEMONS)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Escolha um Pokemon</Text>
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} style={styles.card}>
          <Card.Title
            title={pokemon.name}
            titleStyle={{ color: '#ffffffff', textTransform: 'capitalize' }}
          />
          <Card.Cover source={{ uri: pokemon.imagem }} style={styles.imagem} />
          <Card.Actions>
            <Button style={styles.btn} onPress={() => navigation.navigate('Home', {
              nome: pokemon.name,
              imagem: pokemon.imagem,
              tipo: pokemon.tipo,
            })}>
              Escolher
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    top:10
  },
  card: {
    display:'flex',
    marginBottom: 16,
    backgroundColor: '#fa3b0bff',
    width: 130,
    alignItems: 'center',
    top:200,
    right:100,
  },
  imagem: {
    backgroundColor: '#ffffffff',
    width:130,
  },
  titulo: {
    display:'flex',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    top:10,
    left:220,
    backgroundColor: 'blue'
  },

  loading: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    color:'black',
    backgroundColor:'#ffffffff',
    borderRadius:10,
    justifyContent: "center"
  }
})