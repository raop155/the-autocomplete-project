import styled from "styled-components";

export const StyledAutocomplete = styled.div`
  display: block;
  width: 100%;
`;

export const StyledAutocompleteContent = styled.div`
  position: relative;
  box-shadow: 2.5px 2.5px 2.5px var(--grey-3);
  margin-top: var(--space-sm);
  width: 100%;

  & > ul {
    position: absolute;
    border: 1px solid var(--primary);
    width: 100%;
    margin: 0;
    padding: 0;
    max-height: 205px;
    overflow-y: auto;
    overflow-x: none;

    & > li {
      cursor: pointer;
      list-style-type: none;
      padding: var(--space);
      background-color: var(--white);
      border: 1px solid transparent;

      &:hover {
        color: var(--secondary);
        background-color: var(--grey-4);
        border-left: 1px solid var(--primary);
        border-right: 1px solid var(--primary);
      }

      &:focus {
        outline: none;
        background-color: var(--tertiary);
        border-left: 1px solid var(--primary);
        border-right: 1px solid var(--primary);
      }

      &:last-child {
        border-bottom: 1px solid var(--primary);
      }
    }

    & li + li {
      border-top: 1px solid var(--primary);
    }
  }
`;
