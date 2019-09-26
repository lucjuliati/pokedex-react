import React, { Component } from 'react'
import './listaPokemon.css'
import loader from '../../recursos/loader.gif'
import { Link } from 'react-router-dom'



export class CardPokemon extends Component {

    state = {
        nome: '',
        imgUrl: '',
        pokemonId: '',
        imgLoading: true,
        toManyRequests: false
    }

    componentDidMount() {
        const { nome, url } = this.props
        const pokemonId = url.split('/')[url.split('/').length - 2]
        const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`
        this.setState({
            nome,
            imgUrl,
            pokemonId,
        })
    }

    render() {
        return (
            <Link to={`pokemon/${this.state.pokemonId}`} pokemonid={this.pokemonId}>
                <div className="CardPokemon">
                    <div className="cartao">
                        <h4 className="titulo-cartao">#{this.state.pokemonId}</h4>
                        <div className="corpo-cartao">
                            {this.state.imgLoading ? (<img src={loader} style={{ width: '50px' }} alt="" />) : null}
                            <img
                                alt=""
                                src={this.state.imgUrl}
                                onLoad={() => this.setState({ imgLoading: false })}
                                onError={() => this.setState({ toManyRequests: true })}
                                style={
                                    this.state.imgLoading ? { display: 'none', } : { display: 'block' }
                                }
                            />
                            <p>{this.state.nome}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default CardPokemon
