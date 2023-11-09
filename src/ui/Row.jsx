import { css, styled } from 'styled-components';

const vertical = css`
  flex-direction: column;
  gap: 1.6rem;
`;

const horizontal = css`
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  ${(props) => props.type === 'vertical' && vertical}
  ${(props) => props.type === 'horizontal' && horizontal}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
