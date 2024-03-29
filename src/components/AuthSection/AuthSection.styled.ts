import styled from '@emotion/styled';

export const Section = styled.section`
  padding-top: ${({ theme }) => theme.spacing(10)};
  padding-bottom: ${({ theme }) => theme.spacing(10)};

  & > div {
    display: flex;
    gap: ${({ theme }) => theme.spacing(20)};
  }
`;
