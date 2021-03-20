import React from 'react';
import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from 'react-router';

describe('pruebas en <PrivateRoute />', () => {

  const props= {
    location: {
      pathname:'marvel'
    }
  }

  Storage.prototype.setItem = jest.fn();

  test('debe mostrar el componente si esta autenticado y guardar localstorage', () => {  

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={ true }
          component={ () => <span>listo!</span> }
          {... props}
        />
      </MemoryRouter>
    );
    
    expect( wrapper.find('span').exists() ).toBe( true );

    expect( localStorage.setItem ).toHaveBeenLastCalledWith('lastPath', 'marvel');

  })

  test('debe de bloquear el componente si no esta autenticado', () => {  

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={ false }
          component={ () => <span>listo!</span> }
          {... props}
        />
      </MemoryRouter>
    );
    
    expect( wrapper.find('span').exists() ).toBe( false );
    expect( localStorage.setItem ).toHaveBeenLastCalledWith('lastPath', 'marvel');
  })  
})
