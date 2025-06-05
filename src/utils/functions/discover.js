export default function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-panel-${index}`,
  };
}
