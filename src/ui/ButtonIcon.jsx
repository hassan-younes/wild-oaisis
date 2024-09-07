import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  min-width: 1rem;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  ${(props)=>props.type==="toggle" && css`
  display: flex;
  align-items: center;
  border-radius: 60px;
  justify-content: center;
  gap: 1rem;
  ` }
  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
