import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { StyledTabs, StyledTabItem, StyledTabsContainer } from '@/styles/discover/containers';

import a11yProps from '@/utils/functions/discover';
import { TabPanel } from '../atoms';

export default function DetailsTabsInfo({ tabs }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledTabsContainer>
      <AppBar sx={{ background: 'none', boxShadow: 'none' }} position="static">
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="Reusable tabs"
          indicatorColor="transparent"
        >
          {tabs.map((tab, index) => (
            <StyledTabItem key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </StyledTabs>
      </AppBar>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index} dir={theme.direction}>
          {tab.content}
        </TabPanel>
      ))}
    </StyledTabsContainer>
  );
}

DetailsTabsInfo.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};
