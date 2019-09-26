import React, { Component } from 'react'
import './pokemon.css'
import axios from 'axios'

export class Pokemon extends Component {
   state = {
      nome: '',
      pokemonId: 1,
      imgUrl: '',
      tipos: [],
      habilidades: [],
      stats: {
         hp: '',
         attack: '',
         defense: '',
         spdefense: '',
         spattack: '',
         speed: '',
      },
      totalEv: 0
   }

   async getPokemon(pokemonId) {

      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      const pokemonRes = await axios.get(pokemonUrl)
      const nome = pokemonRes.data.name
      const imgUrl = pokemonRes.data.sprites.front_default


      let { hp, attack, defense, speed, spattack, spdefense } = ''
      let totalEv = 0
      pokemonRes.data.stats.map(stat => {
         switch (stat.stat.name) {
            default: break;
            case 'hp':
               hp = stat['base_stat']
               totalEv += stat['base_stat']
               break;
            case 'attack':
               attack = stat['base_stat']
               totalEv += stat['base_stat']
               break;
            case 'defense':
               defense = stat['base_stat']
               totalEv += stat['base_stat']
               break;
            case 'special-defense':
               spdefense = stat['base_stat']
               totalEv += stat['base_stat']
               break;
            case 'special-attack':
               spattack = stat['base_stat']
               totalEv += stat['base_stat']
               break;
            case 'speed':
               speed = stat['base_stat']
               totalEv += stat['base_stat']
               break;
         }
      }

      )

      const tipos = pokemonRes.data.types.map(tipo => tipo.type.name)
      const habilidades = pokemonRes.data.abilities.map(habilidade => habilidade.ability.name)

      this.setState({
         nome,
         pokemonId,
         imgUrl,
         tipos,
         habilidades,
         stats: {
            hp,
            attack,
            spattack,
            spdefense,
            speed,
            defense
         },
         totalEv,
      })
   }

   async componentDidMount() {
      const { pokemonId } = this.props.match.params
      this.getPokemon(pokemonId)
   }

   redirecionar(para, pokemonId) {
      pokemonId = Number(pokemonId)
      if (para === 'anterior') {
         this.getPokemon(pokemonId - 1)
         pokemonId = Number(pokemonId - 1)
      } else {
         this.getPokemon(pokemonId + 1)
         pokemonId = Number(pokemonId + 1)
      }
      this.props.history.push('/pokemon/' + pokemonId)
   }

   render() {
      const { nome, pokemonId, imgUrl } = this.state
      return (
         <div className="conteudo">
            <div className="row">
               <div className="navegar">
                  {pokemonId > 1 ? (
                     <button onClick={() => this.redirecionar('anterior', pokemonId)}>
                        ⯇ Anterior
                     </button>) : null}
                  <button onClick={() => this.redirecionar('proximo', pokemonId)} style={{ float: "right" }}>
                     Proximo ⯈
                  </button>
               </div>

               <div className="col-md-3">
                  <img className="sprite" src={imgUrl} />
                  <br />
                  {this.state.tipos.map(tipo => (
                     <span key={tipo} className={tipo} style={badge}>
                        {tipo}
                     </span>
                  ))}
               </div>
               <div className="col-md-3">
                  <h1 id="nome">#{pokemonId} {nome}</h1>
                  <div className="stats-nome">
                     HP<br />
                     Defesa<br />
                     Ataque<br />
                     Ataque Especial<br />
                     Defesa Especial<br />
                     Velocidade<br />
                     <b>Total: {this.state.totalEv}</b>
                  </div>
               </div>
               <div className="col-md-6 stats">
                  <div
                     className="progress-bar"
                     style={{ width: `${this.state.stats.hp}%` }}>
                     <span>{this.state.stats.hp}</span>
                  </div>
                  <div
                     className="progress-bar"
                     style={{ width: `${this.state.stats.defense}%` }}>
                     <span>{this.state.stats.defense}</span>
                  </div>
                  <div
                     className="progress-bar"
                     style={{ width: `${this.state.stats.attack}%` }}>
                     <span>{this.state.stats.attack}</span>
                  </div>
                  <div
                     className="progress-bar"
                     style={{ width: `${this.state.stats.spattack}%` }}>
                     <span>{this.state.stats.spattack}</span>
                  </div>
                  <div
                     className="progress-bar"
                     style={{ width: `${this.state.stats.spdefense}%` }}>
                     <span>{this.state.stats.spdefense}</span>

                  </div>
                  <div
                     className="progress-bar"
                     style={{ width: `${this.state.stats.speed}%` }}>
                     <span>{this.state.stats.speed}</span>
                  </div>
               </div>
               <h4 style={{ width: '100%' }}>Habilidades:</h4>

               {this.state.habilidades.map(hab => (
                  <span key={hab}>
                     {hab}
                  </span>
               ))}
            </div>
         </div>
      )
   }
}

const badge = {
   padding: '0px 8px 3px 8px',
   borderRadius: '4px',
   color: '#fff',
   textShadow: '1px 1px #222'
}

export default Pokemon
