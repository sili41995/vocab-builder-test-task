import styled from '@emotion/styled';
import { IStyledProps } from './WordsTable.types';

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing(7)};
  padding: 18px;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  border-radius: 15px;
`;

export const Table = styled.table`
  width: 100%;
`;

export const Head = styled.thead``;

export const Row = styled.tr<IStyledProps>`
  display: flex;

  & > td {
    width: ${({ isRecommendPage }) =>
      `calc((100%) / ${isRecommendPage ? 4 : 5})`};
  }

  & > th {
    width: ${({ isRecommendPage }) =>
      `calc((100%) / ${isRecommendPage ? 4 : 5})`};

    &:first-of-type {
      border-top-left-radius: ${({ radius }) => (radius ? radius : 0)}px;
    }

    &:last-of-type {
      border-top-right-radius: ${({ radius }) => (radius ? radius : 0)}px;
    }
  }
`;

export const Header = styled.th`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(133, 170, 159, 0.1);
  border-bottom: 1px solid rgb(219, 219, 219);
  padding: ${({ theme }) => theme.spacing(5)} 22px;
  color: #121417;
  font-family: MacPaw Fixel Display;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;

  &:not(:last-of-type) {
    border-right: 1px solid rgb(219, 219, 219);
  }
`;

export const Title = styled.span``;

export const Body = styled.tbody``;

export const Data = styled.td`
  position: relative;
  border-bottom: 1px solid rgb(219, 219, 219);
  background-color: #fcfcfc;
  padding: 22px;
  color: #121417;
  font-family: MacPaw Fixel Display;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;

  &:not(:last-of-type) {
    border-right: 1px solid rgb(219, 219, 219);
  }

  &:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Progress = styled.p`
  color: #121417;
  font-family: MacPaw Fixel Display;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.36;
`;

export const ActionsBtn = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  color: #121417;
  font-family: MacPaw Fixel Display;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.36;
`;
