import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { colors } from "zodiac-ui-components";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { Loader } from "@gnosis.pm/safe-react-components";

const useStyles = makeStyles((theme) => ({
  circle: {
    padding: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    height: 20,
    width: 20,
    background: colors.tan[1000],
  },
  loadingContainer: {
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    height: 20,
    width: 20,
    border: `1px solid ${colors.tan[300]}`,
  },
  errorContainer: {
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    height: 20,
    width: 20,
    border: "1px solid rgba(244, 67, 54, 0.3)",
    background: "rgba(244, 67, 54, 0.3)",
  },
  errorIcon: {
    width: "12px",
    height: "12px",
    color: `#F44336`,
  },
  loading: {
    width: "12px !important",
    height: "12px !important",
    color: `${colors.tan[300]} !important`,
  },
  doneIcon: {
    fill: "black",
    width: "16px",
  },
}));

export interface ProposalStatusProps {
  status: "loading" | "success" | "error";
  message: string;
}

export const ProposalStatus: React.FC<ProposalStatusProps> = ({
  status,
  message,
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item>
        {status === "success" && (
          <Box className={classes.circle}>
            <DoneIcon className={classes.doneIcon} />
          </Box>
        )}
        {status === "loading" && (
          <Box className={classes.loadingContainer}>
            <Loader size='sm' className={classes.loading} />
          </Box>
        )}
        {status === "error" && (
          <Box className={classes.errorContainer}>
            <ClearIcon className={classes.errorIcon} />
          </Box>
        )}
      </Grid>
      <Grid item>
        <Typography>{message}</Typography>
      </Grid>
    </Grid>
  );
};
