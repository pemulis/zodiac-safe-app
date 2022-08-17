import { Grid, makeStyles, Typography } from "@material-ui/core";
import { TimeSelect } from "components/input/TimeSelect";
import React from "react";
import { InputPartProps } from "../../OracleSection";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textSubdued: {
    color: "rgba(255 255 255 / 70%)",
  },
}));

export type Data = {
  expiration: number;
  cooldown: number;
  timeout: number;
};

export const OracleDelay: React.FC<InputPartProps> = ({ data, setData }) => {
  const classes = useStyles();

  const set = (key: keyof Data) => (value: any) =>
    setData({ ...data, [key]: value });

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item>
        <Grid container spacing={1} className={classes.container}>
          <Grid item>
            <Typography variant="h4" color="textSecondary">
              Delay Configuration
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.textSubdued}>
              These Parameters are very important for your DAO&apos;s security
              and should be considered carefully. Allowing enough time in these
              configurations will enable the safe to have a final chance to veto
              or circumvent any potential malicious proposals that have snuck
              through.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <TimeSelect
              variant="secondary"
              label="Timeout"
              tooltipMsg="Duration that answers can be submitted to the oracle (resets when a new answer is submitted)"
              defaultUnit="hours"
              onChange={(value) => set("timeout")(value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TimeSelect
              variant="secondary"
              label="Cooldown"
              tooltipMsg="Duration required before the transaction can be executed (after the timeout has expired)."
              defaultUnit="hours"
              onChange={(value) => set("cooldown")(value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TimeSelect
              variant="secondary"
              label="Expiration"
              tooltipMsg="Duration that a transaction is valid in seconds (or 0 if valid forever) after the cooldown (note this applies to all proposals on this module)."
              defaultUnit="hours"
              onChange={(value) => set("expiration")(value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};