import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,    
  };

  constructor() {
    super();

    console.log('constructor()');

    this.updatePlanet();
    setInterval(this.updatePlanet, 10000);
  }

componentDidMount() {
  console.log('componentDidMount()');
}

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
    });
  };  

  onError = () => {
    this.setState({
      error: true,
      loading:false
    })
  };

  updatePlanet = () => {
    const id =  Math.floor(Math.random() * 50) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {

    console.log('render(0)');

    const { planet, loading, error } = this.state;

    // Можно и так до эрор
    // const content = loading ? <Spinner /> : <PlanetView planet={planet} />;

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet ={planet} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
   

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population,
    rotationPeriod, diameter, terrain } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
        alt={`Img of ${name} does not exists`}
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name} {id}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Climate</span>
            <span>{terrain}</span>
          </li>
        </ul>
      </div>

    </React.Fragment>
  )
};