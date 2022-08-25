import React from 'react';
import { render } from '@testing-library/react';
import MyProvider from '../../provider';

const renderWithContext = (component) => {
  return ({
    ...render(
        <MyProvider>
          {component}
        </MyProvider>
    ),
    history,
  });
};
export default renderWithContext;