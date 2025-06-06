import { flex } from '@/styles/globals/mixins';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../shared/atoms/Button';
import { styled as materialStyled } from '@mui/material/styles';
import BottomSheetModal from '@/components/shared/atoms/BottomSheetModal';
import ReviewForm from '../atoms/ReviewForm';

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

export default function GlobalReview() {
  const [open, setOpen] = useState(false);
  return (
    <StyledGlobalReviewContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%'}}>
        <StyledGlobalReviewRate>
          <StyledQualification>
            4.9 <span>{' / 5'}</span>
          </StyledQualification>
          <StyledRating name='read-only' value={4.9} precision={0.1} readOnly />
        </StyledGlobalReviewRate>
        <Button type='button' variant='outlined' shape='pill' padding='3px 34px' onClick={() => setOpen(true)}>
          Escribir reseña
        </Button>
      </div>
      <BottomSheetModal isOpen={open} onClose={() => setOpen(false)}>
        <ReviewForm handleClose={() => setOpen(false)} />
      </BottomSheetModal>
    </StyledGlobalReviewContainer>
  );
}
