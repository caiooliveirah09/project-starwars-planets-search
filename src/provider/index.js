import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context';
import Api from '../services/fetch';

export default function MyProvider({ children }) {
  const [planets, setPlanets] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await Api();
      const data = response.results;
      data.map((planet) => delete planet.residents);
      setPlanets(data);
    }
    fetch();
  }, []);

  return (
    <MyContext.Provider value={ { planets, setPlanets } }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
