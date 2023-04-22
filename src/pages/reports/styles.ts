import styled from "styled-components";

type StatusProps = {
  color: 'red' | 'yellow' | 'green';
};
export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => {
    switch (props.color) {
      case 'green':
        return '#52c41a';
      case 'yellow':
        return '#faad14';
      case 'red':
        return '#f5222d';
      default:
        return '#ccc';
    }
  }};
  }
  `