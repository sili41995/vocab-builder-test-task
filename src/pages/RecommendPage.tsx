import Dashboard from '@/components/Dashboard';
import MainSection from '@/components/MainSection';
import WordsPagination from '@/components/WordsPagination';
import WordsTable from '@/components/WordsTable';
import { SearchParamsKeys } from '@/constants';
import { useSetSearchParams } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getAllWords } from '@/redux/words/operations';
import { selectTotalPages, selectWords } from '@/redux/words/selectors';
import { FC, useEffect } from 'react';

const RecommendPage: FC = () => {
  const { searchParams } = useSetSearchParams();
  const page = searchParams.get(SearchParamsKeys.page) ?? '1';
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  const totalPages = useAppSelector(selectTotalPages);
  const shouldShowWordsPagination = page && totalPages;

  useEffect(() => {
    const promise = dispatch(getAllWords(Number(page)));

    return () => {
      promise.abort();
    };
  }, [dispatch, page]);

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

export default RecommendPage;
