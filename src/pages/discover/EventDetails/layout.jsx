import { DetailsHeader } from '@/components/discover/atoms';
import { StyledLayoutDetailsDiscover } from '@/styles/discover/containers';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <DetailsHeader />
      <StyledLayoutDetailsDiscover>
        <Outlet />
      </StyledLayoutDetailsDiscover>
    </>
  );
}
