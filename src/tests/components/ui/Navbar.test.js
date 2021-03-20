import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom'

import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {
  
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  }

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Paulo'
    }
  }

  const wrapper = mount(
    
    <AuthContext.Provider value= { contextValue }>
      <MemoryRouter>
        <Router history={ historyMock }>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('debe mostrarse correstamente', () => {
    
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.text-info').text().trim() ).toBe('Paulo');
  })

  test('debe de llamar el logout y usar el history', () => {
    
    wrapper.find('button').prop('onClick')();
    
    expect( contextValue.dispatch ).toHaveBeenLastCalledWith({
      type: types.logout
    });

    expect( historyMock.replace ).toHaveBeenCalledWith('/login');
  })
})
