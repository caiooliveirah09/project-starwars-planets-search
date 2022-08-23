import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context';

export default function Table() {
  const { planets, keys } = useContext(MyContext);
  const [filterByName, setFilterByName] = useState();
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [newPlanets, setNewPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [finalPlanets, setFinalPlanets] = useState([]);
  const [options, setOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  // component did update planets
  useEffect(() => {
    setNewPlanets(planets);
  }, [planets]);

  // component did update filterByName
  useEffect(() => {
    if (planets) {
      const filtered = planets.filter((p) => p.name.toLowerCase()
        .includes(filterByName.toLowerCase()));
      setNewPlanets(filtered);
    }
  }, [filterByName]);

  useEffect(() => {
    let newNewPlanets = newPlanets;
    let newOptions = options;
    filterByNumericValues.forEach((f) => {
      newNewPlanets = newNewPlanets.filter((planet) => {
        if (f.comparison === 'maior que') {
          return (Number(planet[f.column]) > Number(f.value));
        }
        if (f.comparison === 'menor que') {
          return (Number(planet[f.column]) < Number(f.value));
        }
        return (Number(planet[f.column]) === Number(f.value));
      });
    });
    filterByNumericValues.forEach((f) => {
      newOptions = newOptions.filter((option) => f.column !== option);
    });
    setFinalPlanets(newNewPlanets);
    setOptions(newOptions);
  }, [filterByNumericValues, newPlanets]);

  const addFilter = () => {
    setFilterByNumericValues([...filterByNumericValues, {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    }]);
    setColumnFilter('population');
    setComparisonFilter('maior que');
    setValueFilter('0');
  };

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="name"
        value={ filterByName }
        onChange={ ({ target }) => { setFilterByName(target.value); } }
      />
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ ({ target }) => { setColumnFilter(target.value); } }
      >
        { options.map((opt, i) => <option key={ i } value={ opt }>{opt}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ ({ target }) => { setComparisonFilter(target.value); } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        placeholder="number"
        value={ valueFilter }
        onChange={ ({ target }) => { setValueFilter(target.value); } }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ addFilter }
      >
        add_filter
      </button>
      <table>
        <thead>
          <tr>
            { keys && keys.map((key) => (
              <th key={ key }>{ key }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { planets.length > 0 && finalPlanets.map((p) => (
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
