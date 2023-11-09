import styled from 'styled-components';
import { useColorTheme } from '../context/ColorThemeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isLightMode } = useColorTheme();
  const logoSrc = isLightMode ? 'logo-light.png' : 'logo-dark.png';

  return (
    <StyledLogo>
      <Img src={`/img/${logoSrc}`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
