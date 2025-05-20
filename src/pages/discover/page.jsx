import React from 'react';
import { Categories } from '../../components/discover/molecules';
import {
  StyledPageContainer,
  StyledTopFiltersContainer,
} from '../../styles/discover/containers';
import { useHomeFilters } from '@/hooks/discover';
import { AllView } from '@/components/discover/organisms';
import { SearchInput } from '@/components/discover/atoms';
import Button from '@/components/discover/atoms/Button';
import { WorldIcon } from '@/assets/icons';
import EventsView from '@/components/discover/organisms/EventsView';
import ServiceView from '@/components/discover/organisms/ServiceView';

export default function Discover() {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    data,
    error,
    isLoading,
    watch,
    handleSetValue,
    values,
  } = useHomeFilters();
  return (
    <StyledPageContainer>
      <StyledTopFiltersContainer>
        <SearchInput 
          value={values.searchValue}
          onChange={handleSetValue}
        />
        <Button 
          padding='13px 16px'
          icon={<WorldIcon />}>
          Mapa
        </Button>
      </StyledTopFiltersContainer>
      <Categories
        value={values.categoryValue}
        handleSetValue={handleSetValue}
      />
      {values.categoryValue === '' && <AllView {...{ data }}/>}
      {values.categoryValue === 'Eventos' && <EventsView {...{ data }} />}
      {values.categoryValue === 'Servicios' && <ServiceView {...{ data }} />}
    </StyledPageContainer>
  );
}
