import { fetcher } from '@/services/api';
import { StyledCategoryContainer } from '@/styles/discover/containers';
import React, { useMemo } from 'react';
import useSWR from 'swr';
import { CategoryButton } from '../atoms';
import { API_ENDPOINTS } from '@/descubreApi';

const MemoizedCategories = React.memo(
  function Categories({ value, handleSetValue }) {
    const {
      data: categories,
      error: categoryError,
      isLoading: categoryLoading,
    } = useSWR(API_ENDPOINTS.GET_OFFER_CATALOG, fetcher);

    const categoryList = useMemo(() => {
      if (categoryLoading) return null;
      return categories.map((cat, index) => (
        <CategoryButton
          key={`${index}-${cat.id}`}
          action={() => handleSetValue('category', cat.id)}
          category={cat.name}
          active={value === cat.id}
        />
      ));
    }, [categories, handleSetValue, value, categoryLoading]);

    return (
      <StyledCategoryContainer>
        <CategoryButton
          action={() => handleSetValue('category', '')}
          category={'all'}
          active={value === ''}
        />
        {categoryList}
      </StyledCategoryContainer>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.handleSetValue === nextProps.handleSetValue
    );
  },
);

export default MemoizedCategories;
