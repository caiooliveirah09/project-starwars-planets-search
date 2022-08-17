import React, { useContext } from 'react';
import MyContext from '../context';

export default function Table() {
  const { planets } = useContext(MyContext);
  return (
    <table>
      <thead>
        <tr>
          { planets && Object.keys(planets[0]).map((keys) => (
            <th key={ keys }>{ keys }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { planets && planets.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited}</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
