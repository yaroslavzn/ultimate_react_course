import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useColorTheme } from '../../context/ColorThemeContext';

const ColorThemeToggle = () => {
  const { isDarkMode, isLightMode, setDarkMode, setLightMode } =
    useColorTheme();

  const changeColorThemeHandler = () => {
    if (isDarkMode) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  return (
    <ButtonIcon onClick={changeColorThemeHandler}>
      {isLightMode && <HiOutlineMoon />}
      {isDarkMode && <HiOutlineSun />}
    </ButtonIcon>
  );
};

export default ColorThemeToggle;
