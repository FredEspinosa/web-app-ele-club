import { StyledDetailsDirectioncontainer } from '@/styles/discover/containers';
import {
  StyledDetailsDistance,
  StyledDetailTitle,
} from '@/styles/discover/texts';
import React from 'react';
import { GlobalReview } from '../molecules';
import { ReviewCard } from '../atoms';

// export default function ServiceDetailsReviews({data}) {
export default function ServiceDetailsReviews() {
  return (
    <>
      <StyledDetailsDirectioncontainer>
        <StyledDetailTitle $size={16}>Reseñas de clientes</StyledDetailTitle>
        <StyledDetailsDistance>120 reseñas</StyledDetailsDistance>
      </StyledDetailsDirectioncontainer>
      {/* <GlobalReview data={data}/> */}
      <GlobalReview />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </>
  );
}
