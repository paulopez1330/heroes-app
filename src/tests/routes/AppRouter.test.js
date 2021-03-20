import React from 'react';
import { mount } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';

describe('pruebas en <AppRouter />', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  }

  test('debe demostrar el login si no esta autenticado', () => {  

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter
          isAuthenticated={ false }
        />
      </AuthContext.Provider>
    );
    
    expect( wrapper ).toMatchSnapshot();

  })

  test('debe demostrar el componente de marvel si esta auntenticado', () => {  

    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name:'Paulo'
      }
    }

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter
          isAuthenticated={ false }
        />
      </AuthContext.Provider>
    );
    
    expect( wrapper.find('.navbar').exists() ).toBe( true );

  })

})
