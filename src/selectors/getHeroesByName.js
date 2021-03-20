import { heroes } from '../data/heroes';

export const getHeroesByName= ( name = '' ) => {
  
  if( name ==='') {
    return [];
  }
  
  name = name.toUpperCase();
  return heroes.filter( hero => hero.superhero.toUpperCase().includes( name ));
}
