import React, { Component } from 'react'
import CardPokemon from './cardPokemon'
import pokeball from '../../recursos/pokeball.png'
import axios from 'axios'
import './listaPokemon.css'


export class ListaPokemon extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
        pokemon: null
    }

    async componentDidMount() {
        const resposta = await axios.get(this.state.url)
        this.setState({ pokemon: resposta.data['results'] })
    }

    render() {
        return (
            <>
                {this.state.pokemon ? (
                    <div className="lista">
                        {this.state.pokemon.map(pokemon => (
                            <CardPokemon
                                key={pokemon.name}
                                nome={pokemon.name}
                                url={pokemon.url}
                            />
                        ))}
                    </div>
                ) : (
                        <div className="loading">
                            <img src={pokeball} className="loading" alt=""/>
                        </div>
                    )}
            </>
        )
    }
}


export default ListaPokemon
