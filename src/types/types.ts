import { PagePaths } from '@/constants';
import { ChangeEvent, MouseEvent } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

export interface IUserState {
  name: null | string;
  email: null | string;
}

export interface IAuthState {
  user: IUserState;
  token: null | string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface IWord {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner?: string;
  progress?: number;
}

export type NewWord = Pick<IWord, 'en' | 'ua' | 'category' | 'isIrregular'>;

export type Words = IWord[];

export type Filters = string[];

export interface IWordsState {
  items: Words;
  totalPages: number | null;
  page: number | null;
  perPage: number | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  categories: Filters;
}

export interface IState {
  words: IWordsState;
  auth: IAuthState;
}

export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export type Credentials = Omit<INewUser, 'name'>;

export interface IAuthRes {
  email: string;
  name: string;
  token: string;
}

export interface INavLink {
  title: string;
  path: PagePaths;
}

export type NavLinks = Readonly<INavLink[]>;

export interface ICurrentUser extends IAuthRes {
  _id: string;
}

// export interface IFilter {
//   word: string;
//   category: string;
// }

export type ChangeEvt = ChangeEvent<HTMLInputElement>;

export interface IUpdateSearchParamsProps {
  key: string;
  value: string;
}

export interface IUseSetSearchParams {
  updateSearchParams: ({ key, value }: IUpdateSearchParamsProps) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export type InputClick = MouseEvent<HTMLInputElement>;

export interface IWordsInfo {
  results: Words;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface IFetchAllWordsProps {
  signal: AbortSignal;
  page: number;
}

export interface IGetWordsPaginationSettings {
  isValidPage: boolean;
  firstPage: number;
  lastPage: number;
  isBackNavBtnDisable: boolean;
  isNextNavBtnDisable: boolean;
  isShowNextTemplateBtn: boolean;
  isShowLastPageBtn: boolean;
  isShowFirstPageBtn: boolean;
  isShowPrevTemplateBtn: boolean;
}

export interface IGetWordsPaginationSettingsProps {
  pageNumbers: number[];
  currentPage: number;
  step: number;
}

export type BtnClickEvent = MouseEvent<HTMLButtonElement>;

export interface IOnPageBtnClickProps {
  e: BtnClickEvent;
  page: number;
}

export interface ISetBtnDisplayProps {
  currentPage: number | undefined;
  page: number | undefined;
  step: number | undefined;
}

export interface IDeleteWord {
  message: string;
  id: string;
}
