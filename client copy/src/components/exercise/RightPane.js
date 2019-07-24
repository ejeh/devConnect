import React from "react";
import { Paper, Typography } from "@material-ui/core";

const RightPane = ({ styles }) => {
  return (
    <div>
      <Paper style={styles.paper}>
        <Typography variant="display1">Welcome</Typography>
      </Paper>
    </div>
  );
};
export default RightPane;
