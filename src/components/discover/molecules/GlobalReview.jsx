import { flex } from '@/styles/globals/mixins';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../shared/atoms/Button';
import { styled as materialStyled } from '@mui/material/styles';
import BottomSheetModal from '@/components/shared/atoms/BottomSheetModal';
import ReviewForm from '../atoms/ReviewForm';
import { StyledDetailOwnerLabel } from '@/styles/discover/texts';

const StyledGlobalReviewContainer = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #f9f4e0;
  border-radius: 16px;
  ${flex({})}
`;

const StyledGlobalReviewRate = styled.div`
  ${flex({
    alignItems: 'flex-start'
  })}
`;

const StyledQualification = styled.p`
  font-weight: 600;
  font-size: 32px;
  margin: 0;
  line-height: normal;
  & > span {
    font-weight: 600;
    font-size: 16px;
    margin: 0;
    line-height: normal;
  }
`;

const StyledRating = materialStyled(Rating)({
  '& span.MuiRating-icon > svg.MuiSvgIcon-root': {
    fontSize: '17px'
  },
});

export default function GlobalReview({data}) {

  const [open, setOpen] = useState(false);
  return (
    <StyledGlobalReviewContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%'}}>
        <StyledGlobalReviewRate>
          <StyledQualification>
            {data?.reviews?.[0]?.rating || 3.6} <span>{' / 5'}</span>
          </StyledQualification>
          <StyledRating name='read-only' value={data?.reviews?.[0]?.rating || 3.6} precision={0.5} readOnly style={{color:'#FFD942'}} />
        </StyledGlobalReviewRate>
        <Button type='button' variant='outlined' shape='pill' padding='3px 34px' onClick={() => setOpen(true)}>
          Escribir reseña
        </Button>        
      </div>
      <div style={{ display: 'flex', width: '100%', marginTop: '16px'}}>
        <StyledDetailOwnerLabel>Basado en {data?.reviews?.length || 2} reseñas</StyledDetailOwnerLabel>
      </div>
      <BottomSheetModal isOpen={open} onClose={() => setOpen(false)}>
        <ReviewForm handleClose={() => setOpen(false)} data = {data}/>
      </BottomSheetModal>
    </StyledGlobalReviewContainer>
  );
}
