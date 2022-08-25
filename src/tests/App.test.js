import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Table from '../components/Table'
import renderWithContext from './helpers/renderWithContext';
import testData from '../../cypress/mocks/testData';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('test the table component', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
  });

  test('1 - tests if it has the basic structure before the fetch', () => {
    renderWithContext(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();

    const population = screen.getByRole("option", { name: /population/i });
    expect(population).toBeInTheDocument();
    const orbital_period = screen.getByRole("option", { name: /orbital_period/i });
    expect(orbital_period).toBeInTheDocument();
    const diameter = screen.getByRole("option", { name: /diameter/i });
    expect(diameter).toBeInTheDocument();
    const rotation_period = screen.getByRole("option", { name: /rotation_period/i });
    expect(rotation_period).toBeInTheDocument();
    const surface_water = screen.getByRole("option", { name: /surface_water/i });
    expect(surface_water).toBeInTheDocument();


    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();

    const maiorQue = screen.getByRole("option", { name: /maior que/i });
    expect(maiorQue).toBeInTheDocument();
    const menorQue = screen.getByRole("option", { name: /menor que/i });
    expect(menorQue).toBeInTheDocument();
    const igualA = screen.getByRole("option", { name: /igual a/i });
    expect(igualA).toBeInTheDocument();


    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();

    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();

    const buttonRemoveFilters = screen.getByTestId('button-remove-filters')
    expect(buttonRemoveFilters).toBeInTheDocument()
    });
  test('2 - check if the fetch was done', async () => {
    renderWithContext(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await waitFor(() => 'https://swapi-trybe.herokuapp.com/api/planets/');
  });
  test('3 - tests if it completes the table after the fetch', async () => {
    renderWithContext(<App/>);
    const YavinIV = await screen.findByText('Yavin IV')
    const Tatooine = await screen.findByText('Tatooine');
    
    expect(YavinIV).toBeInTheDocument();
    expect(Tatooine).toBeInTheDocument();
  });
  test('4 - test if name filter works' , async () => {
    renderWithContext(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const nameFilter = screen.getByTestId('name-filter');
    const Tatooine = await screen.findByText('Tatooine');

    userEvent.type(nameFilter, 'Yavin Iv');
    const YavinIV = await screen.findByText('Yavin IV')
    expect(YavinIV).toBeInTheDocument();
    
    expect(Tatooine).not.toBeInTheDocument();
    // const a = screen.getByTestId('dasdas')
  });
  test('5 - test whether to add filters and remove', async () => {
    renderWithContext(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const Tatooine = await screen.findByText('Tatooine');
    const YavinIV = await screen.findByText('Yavin IV')
    const columnFilter = screen.getByTestId('column-filter');

    const comparisonFilter = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(columnFilter, 'population') 
    userEvent.selectOptions(comparisonFilter, 'menor que') 


    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '1001');

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(columnFilter, 'surface_water') 
    userEvent.selectOptions(comparisonFilter, 'menor que') 

    userEvent.type(valueFilter, '1001');

    userEvent.click(buttonFilter);
    
    const filter1 = screen.getByText("population menor que 01001");
    const filter2 = screen.getByText('surface_water menor que 01001');
    const remove = screen.getAllByRole("button", { name: /remove/i })[1];
    
    expect(YavinIV).toBeInTheDocument();
    expect(Tatooine).not.toBeInTheDocument();
    expect(filter1).toBeInTheDocument();
    expect(filter2).toBeInTheDocument();

    userEvent.click(remove)

    const buttonRemoveFilters = screen.getByTestId('button-remove-filters')
    userEvent.click(buttonRemoveFilters)

    expect(filter1).not.toBeInTheDocument();
    expect(filter2).not.toBeInTheDocument();

  });
  test('5 - test if add all filter types', async () => {
    renderWithContext(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const columnFilter = screen.getByTestId('column-filter');

    const comparisonFilter = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(columnFilter, 'population') 
    userEvent.selectOptions(comparisonFilter, 'maior que') 


    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '1001');

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    userEvent.selectOptions(columnFilter, 'surface_water') 
    userEvent.selectOptions(comparisonFilter, 'igual a') 

    userEvent.type(valueFilter, '1001');

    userEvent.click(buttonFilter);
  })
});
