import { css, styled } from 'styled-components';

const h1Styles = css`
  font-size: 3rem;
`;

const h2Styles = css`
  font-size: 2rem;
  font-weight: 600;
`;

const h3Styles = css`
  font-size: 2rem;
  font-weight: 500;
`;

const h4Styles = css`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`;

const Heading = styled.h1`
  line-height: 1.4;
  ${(props) => props.as === 'h1' && h1Styles}
  ${(props) => props.as === 'h2' && h2Styles}
  ${(props) => props.as === 'h3' && h3Styles}
  ${(props) => props.as === 'h4' && h4Styles}
`;

export default Heading;
