import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import initialState from '@/redux/initialState';
import { IWordsState } from '@/types/types';
import {
  createNewWord,
  getCategories,
  getAllWords,
  getOwnWords,
  deleteWord,
} from './operations';

const contactsState: IWordsState = initialState.words;

const contactsSlice = createSlice({
  name: 'words',
  initialState: contactsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => ({
        ...state,
        categories: payload,
        isLoading: false,
        error: initialState.words.error,
      }))
      .addCase(getAllWords.fulfilled, (state, { payload }) => ({
        ...state,
        items: payload.results,
        isLoading: false,
        error: initialState.words.error,
        page: payload.page,
        perPage: payload.perPage,
        totalPages: payload.totalPages,
      }))
      .addCase(getOwnWords.fulfilled, (state, { payload }) => ({
        ...state,
        items: payload.results,
        isLoading: false,
        error: initialState.words.error,
        page: payload.page,
        perPage: payload.perPage,
        totalPages: payload.totalPages,
      }))
      .addCase(createNewWord.fulfilled, (state, { payload }) => ({
        ...state,
        items: [...state.items, payload],
        isLoading: false,
        error: initialState.words.error,
      }))
      .addCase(deleteWord.fulfilled, (state, { payload }) => ({
        ...state,
        items: state.items.filter(({ _id }) => _id !== payload.id),
        isLoading: false,
        error: initialState.words.error,
      }))
      .addMatcher(
        isAnyOf(
          getCategories.pending,
          getAllWords.pending,
          getOwnWords.pending,
          createNewWord.pending,
          deleteWord.pending
        ),
        (state) => ({
          ...state,
          isLoading: true,
        })
      )
      .addMatcher(
        isAnyOf(
          getCategories.rejected,
          getAllWords.rejected,
          getOwnWords.rejected,
          createNewWord.rejected,
          deleteWord.rejected
        ),
        (state, { payload }) => ({
          ...state,
          isLoading: false,
          error: payload as string,
        })
      );
  },
});

export default contactsSlice.reducer;
