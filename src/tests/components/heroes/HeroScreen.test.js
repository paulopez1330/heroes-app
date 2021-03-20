import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from "../../../components/heroes/HeroScreen";
import { MemoryRouter } from 'react-router';
import { Route } from "react-router-dom";

describe('Pruebas en <HeroScreen />', () => {
  
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  }

  test('debe de mostrarse redirect si no hay argumentos en la url', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history= { historyMock } />
      </MemoryRouter>
    );

    expect( wrapper.find('Redirect').exists() ).toBe(true);
  })

  test('debe de mostrar un hero si el parametro existe', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroId" component={ HeroScreen } />
      </MemoryRouter>
    );
    
    expect( wrapper.find('.row').exists() ).toBe(true);
  })

  test('debe regresar a la pantalla anterior con push', () => {

    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroId"
          component={ () => <HeroScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();

    expect( historyMock.push ).toHaveBeenCalledWith('/');
    expect( historyMock.goBack ).not.toHaveBeenCalled();
  })

  test('debe regresar a la pantalla anterior con goback', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroId"
          component={ () => <HeroScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();

    expect( historyMock.push ).toHaveBeenCalledTimes(0);
    expect( historyMock.goBack ).toHaveBeenCalled();
  })

  test('debe de llamar al redirect si el hero no existe', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider1245']}>
        <Route
          path="/hero/:heroId"
          component={ () => <HeroScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    );

    expect( wrapper.text() ).toBe( '' );

  }) 
})
