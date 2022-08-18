import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context';

export default function Table() {
  const { planets, keys } = useContext(MyContext);
  const [filterByName, setFilterByName] = useState();
  const [newPlanets, setNewPlanets] = useState([]);

  useEffect(() => {
    setNewPlanets(planets);
  }, [planets]);

  useEffect(() => {
    if (planets) {
      const filtered = planets.filter((p) => p.name.toLowerCase()
        .includes(filterByName.toLowerCase()));
      setNewPlanets(filtered);
    }
  }, [filterByName]);

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target }) => { setFilterByName(target.value); } }
      />
      <table>
        <thead>
          <tr>
            { keys && keys.map((key) => (
              <th key={ key }>{ key }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { planets.length > 0 && newPlanets.map((p) => (
            <tr key={ p.name }>
              <td>{ p.name }</td>
              <td>{ p.rotation_period }</td>
              <td>{ p.orbital_period }</td>
              <td>{ p.diameter }</td>
              <td>{ p.climate }</td>
              <td>{ p.gravity }</td>
              <td>{ p.terrain }</td>
              <td>{ p.surface_water }</td>
              <td>{ p.population }</td>
              <td>{ p.films }</td>
              <td>{ p.created }</td>
              <td>{ p.edited}</td>
              <td>{ p.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
