import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { AddModuleModal } from "./AddModuleModal";
import { ReactComponent as DelayModuleImage } from "../../../assets/images/delay-module.svg";
import { TimeSelect } from "../../../components/input/TimeSelect";
import { createAndAddModule } from "services";
import { useRootDispatch, useRootSelector } from "store";
import { fetchModulesList } from "store/modules";
import { getDaoModules } from "store/modules/selectors";
import { AttachModuleForm } from "../AttachModuleForm";

interface DaoModuleModalProps {
  open: boolean;
  onClose?(): void;
}

interface DelayModuleParams {
  timeout: number;
  cooldown: number;
}

const useStyles = makeStyles((theme) => ({
  fields: {
    marginBottom: theme.spacing(1),
  },
}));

export const DelayModuleModal = ({ open, onClose }: DaoModuleModalProps) => {
  const classes = useStyles();
  const [daoModule, setDaoModule] = useState<string>();
  const daoModules = useRootSelector(getDaoModules);

  const { sdk, safe } = useSafeAppsSDK();
  const dispatch = useRootDispatch();

  const [params, setParams] = useState<DelayModuleParams>({
    timeout: 86400,
    cooldown: 86400,
  });

  const onParamChange = <Field extends keyof DelayModuleParams>(
    field: Field,
    value: DelayModuleParams[Field]
  ) => {
    setParams({
      ...params,
      [field]: value,
    });
  };

  const handleAddDelayModule = async () => {
    try {
      const txs = await createAndAddModule(
        "delay",
        {
          executor: safe.safeAddress,
          txCooldown: params.cooldown,
          txExpiration: params.timeout,
        },
        safe.safeAddress,
        daoModule
      );
      const { safeTxHash } = await sdk.txs.send({
        txs,
      });
      console.log({ safeTxHash });
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      console.log({ safeTx });

      dispatch(
        fetchModulesList({
          safeSDK: sdk,
          chainId: safe.chainId,
          safeAddress: safe.safeAddress,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddModuleModal
      open={open}
      onClose={onClose}
      title="Transaction Delay"
      description="Adds a settable delay time to any transaction originating from this module."
      image={<DelayModuleImage />}
      tags={["Stackable", "Has SafeApp", "From Gnosis"]}
      onAdd={handleAddDelayModule}
      readMoreLink="https://help.gnosis-safe.io/en/articles/4934378-what-is-a-module"
    >
      <Typography variant="h6" gutterBottom>
        Parameters
      </Typography>

      <Grid container spacing={2} className={classes.fields}>
        <Grid item xs={6}>
          <TimeSelect
            color="secondary"
            label="Timeout"
            defaultValue={params.timeout}
            defaultUnit="hours"
            onChange={(value) => onParamChange("timeout", value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TimeSelect
            color="secondary"
            label="Cooldown"
            defaultValue={params.cooldown}
            defaultUnit="hours"
            onChange={(value) => onParamChange("cooldown", value)}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Deploy Options
      </Typography>
      <AttachModuleForm
        modules={daoModules}
        value={daoModule}
        onChange={(value: string) => setDaoModule(value)}
        type="dao"
      />
    </AddModuleModal>
  );
};
