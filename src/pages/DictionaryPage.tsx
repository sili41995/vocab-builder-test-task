import Dashboard from '@/components/Dashboard';
import MainSection from '@/components/MainSection';
import WordsPagination from '@/components/WordsPagination';
import WordsTable from '@/components/WordsTable';
import { SearchParamsKeys } from '@/constants';
import { useSetSearchParams } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getOwnWords } from '@/redux/words/operations';
import { selectTotalPages, selectWords } from '@/redux/words/selectors';
import { FC, useEffect } from 'react';

const DictionaryPage: FC = () => {
  const { searchParams } = useSetSearchParams();
  const words = useAppSelector(selectWords);
  const totalPages = useAppSelector(selectTotalPages);
  // const perPage = useAppSelector(selectPerPage);
  const page = searchParams.get(SearchParamsKeys.page) ?? '1';
  const keyword = searchParams.get(SearchParamsKeys.keyword) ?? '';
  const category = searchParams.get(SearchParamsKeys.category) ?? '';
  const dispatch = useAppDispatch();
  const shouldShowWordsPagination = page && totalPages;
  const isIrregular = searchParams.get(SearchParamsKeys.isIrregular) ?? '';

  useEffect(() => {
    const promise = dispatch(
      getOwnWords({
        page: Number(page),
        keyword,
        category,
        isIrregular,
      })
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, keyword, page, category, isIrregular]);

  return (
    <MainSection>
      <Dashboard />
      <WordsTable words={words} />
      {shouldShowWordsPagination && (
        <WordsPagination currentPage={Number(page)} totalPages={totalPages} />
      )}
    </MainSection>
  );
};

export default DictionaryPage;
