import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <>
      <h1>Menu</h1>

      <ul>
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
}

export const loader = async () => {
  const data = await getMenu();

  return data;
};

export default Menu;
