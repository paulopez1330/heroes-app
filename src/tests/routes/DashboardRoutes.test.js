import React from 'react';
import { mount } from "enzyme";
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';

describe('pruebas en <DashboardRoutes />', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name:'paulo'
    }
  }

  test('debe demostrarse correctamente', () => {  

    const wrapper = mount(
      
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
      
    );
    
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.text-info').text().trim() ).toBe('paulo');

  })

  // test('debe demostrar el componente de marvel si esta auntenticado', () => {  

  //   const contextValue = {
  //     dispatch: jest.fn(),
  //     user: {
  //       logged: true,
  //       name:'Paulo'
  //     }
  //   }

  //   const wrapper = mount(
  //     <AuthContext.Provider value={ contextValue }>
  //       <DashboardRoutes
  //         isAuthenticated={ false }
  //       />
  //     </AuthContext.Provider>
  //   );
    
  //   expect( wrapper.find('.navbar').exists() ).toBe( true );

  // })

})
