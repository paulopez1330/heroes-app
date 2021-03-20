import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter } from 'react-router';

describe('Pruebas en <LoginScreen />', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  }

  const historyMock = {
    replace: jest.fn()
  }

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter>
        <LoginScreen history={ historyMock } />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('debe mostrarse correctamente', () => {
    
    expect( wrapper ).toMatchSnapshot();
  })

  test('debe realizar el dispatch y la navegacion', () => {
    
    wrapper.find('button').prop('onClick')();
    
    expect( historyMock.replace ).toHaveBeenCalledTimes(1);
    expect( contextValue.dispatch ).toHaveBeenCalledTimes(1);
  })

})
