import { StyledDetailsDirectioncontainer } from '@/styles/discover/containers';
import {
  StyledDetailsDistance,
  StyledDetailTitle,
  StyledNoReviewsContent,
  StyleIconNoReview,
  StyleSubTitleNoReview,
  StyleTitleNoReview,
} from '@/styles/discover/texts';
import React, { useState } from 'react';
import { GlobalReview } from '../molecules';
import { ReviewCard } from '../atoms';
import { FiMessageSquare } from 'react-icons/fi';
import { Button } from '@/components/shared/atoms';
import BottomSheetModal from '@/components/shared/atoms/BottomSheetModal';
import ReviewForm from '../atoms/ReviewForm';

export default function ServiceDetailsReviews({ data }) {
  const reviews = data?.reviews || [];
  console.log("reviews", reviews);
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledDetailsDirectioncontainer>
        <StyledDetailTitle $size={16}>Reseñas de clientes</StyledDetailTitle>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <StyledDetailsDistance>{data?.reviews?.length || 2} reseñas</StyledDetailsDistance>
        ) : (
          <></>
        )}
      </StyledDetailsDirectioncontainer>

      {Array.isArray(reviews) && reviews.length > 0 ? (
        <GlobalReview data={data} />
      ) : (
        <></>
      )}

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
        <StyledNoReviewsContent>
          <StyleIconNoReview>
            <FiMessageSquare size={30} className='club_color_fuente_oro' />
          </StyleIconNoReview>
          <StyleTitleNoReview>
            ¡Sé el primero en opinar!
            <StyleSubTitleNoReview>
              Este servicio aún no tiene reseñas. Comparte tu experiencia y ayuda a otros usuarios a tomar la mejor decisión.
            </StyleSubTitleNoReview>
            <Button type='button' variant='outlined' shape='pill' padding='3px 34px' onClick={() => setOpen(true)}>
              Escribir reseña
            </Button>
            <BottomSheetModal isOpen={open} onClose={() => setOpen(false)}>
              <ReviewForm handleClose={() => setOpen(false)} data={data} />
            </BottomSheetModal>
          </StyleTitleNoReview>

        </StyledNoReviewsContent>
        // <p>No hay reseñas disponibles.</p>
      )}
    </>
  );
}
