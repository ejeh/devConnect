import React from "react";
import { Tab, Tabs, Paper } from "@material-ui/core";

const Footer = ({ muscles, category, onSelect }) => {
  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0;

  const onIndexSelect = () => (e, index) => {
    onSelect(index === 0 ? "" : muscles[index - 1]);
  };
  return (
    <div>
      <Paper>
        <Tabs
          value={index}
          indicatorColor="primary"
          textColor="primary"
          centered={true}
          onChange={onIndexSelect}
        >
          <Tab label="All" />

          {muscles.map(group => (
            <Tab label={group} />
          ))}
        </Tabs>
      </Paper>
    </div>
  );
};
export default Footer;
