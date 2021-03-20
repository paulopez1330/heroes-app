import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('Prueba en authREDUCER', () => {
  
  const userDefault = {
    name:'paulo'
  }

  test('debe retornar el estado por defecto ', () => {
    
    const state = authReducer({ logged: false }, {});
    expect( state ).toEqual( { logged: false } );
  })
  
  test('debe autenticar y cololar el name del estado', () => {
    
    const state = authReducer({ logged: false }, {
      type: types.login,
      payload:{
        name:'Paulo'
      }
    });

    expect( state).toEqual({
      logged: true,
      name:'Paulo'
    });

  })

  test('debe borrar el name del usuario y logger false', () => {
    
    const state = authReducer({ logged: true }, {
      type: types.logout,
    });

    expect( state ).toEqual({
      logged: false,
    });
  })

})
