import React from "react";
// import {withStyles} from "@material-ui/core/styles";

// const styles  = ({

//     root: {
//         backgroundColor: 'darkgray',
//         color: 'white',
//         textAlign: 'center',
//         padding: '2%'
//     }
// });
const Footer = props => {
  // const { classes } = props
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};
// export default withStyles(styles)(Footer)
export default Footer;
