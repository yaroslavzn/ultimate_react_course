import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [activeMenuId, setActiveMenuId] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 20 });

  const close = () => setActiveMenuId('');

  return (
    <MenusContext.Provider
      value={{ activeMenuId, setActiveMenuId, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Menu = ({ children }) => {
  return <StyledMenu>{children}</StyledMenu>;
};

const Toggle = ({ id }) => {
  const { setActiveMenuId, close, activeMenuId, setPosition } =
    useContext(MenusContext);

  const clickHandler = (e) => {
    const { x, y, width, height } = e.target.getBoundingClientRect();
    const isActive = id === activeMenuId;

    if (isActive) {
      close();
    } else {
      setPosition({ x: window.innerWidth - x - width - 4, y: y + height + 6 });
      setActiveMenuId(id);
    }
  };

  return (
    <StyledToggle onClick={clickHandler}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};
const List = ({ id, children }) => {
  const { activeMenuId, position, close } = useContext(MenusContext);
  const isActive = id === activeMenuId;
  const ref = useOutsideClick(close);

  if (!isActive) {
    return null;
  }

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);
  return (
    <li>
      <StyledButton
        onClick={() => {
          onClick?.();
          close();
        }}
      >
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
