import { StyledDetailsDirectioncontainer } from '@/styles/discover/containers';
import {
  StyledDetailsDistance,
  StyledDetailTitle,
} from '@/styles/discover/texts';
import React from 'react';
import { GlobalReview } from '../molecules';
import { ReviewCard } from '../atoms';

export default function ServiceDetailsReviews({data}) {
  const reviews = data?.reviews || [];
  console.log("reviews", reviews);
  
  return (
    <>
      <StyledDetailsDirectioncontainer>
        <StyledDetailTitle $size={16}>Reseñas de clientes</StyledDetailTitle>
        <StyledDetailsDistance>{data?.reviews?.length || 2} reseñas</StyledDetailsDistance>
      </StyledDetailsDirectioncontainer>
      <GlobalReview data={data}/>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            userName={review.userName}
            rating={review.rating}
            timeSincePublished={review.timeSincePublished}
            comment={review.comment}
            userPhoto={review.userPhoto}
          />
        ))
      ) : (
        <p>No hay reseñas disponibles.</p>
      )}
    </>
  );
}
