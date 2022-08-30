import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "components/text/Link";
import React, { useEffect, useState } from "react";
import { ZodiacPaper } from "zodiac-ui-components";
import {
  OracleTemplate,
  Data as OracleTemplateData,
} from "./components/oracleTemplate/OracleTemplate";
import {
  OracleInstance,
  Data as OracleInstanceData,
} from "./components/oracleInstance/OracleInstance";
import {
  OracleDelay,
  Data as OracleDelayData,
} from "./components/oracleDelay/OracleDelay";
import {
  OracleBond,
  Data as OracleBondData,
} from "./components/oracleBond/OracleBond";
import {
  OracleArbitration,
  Data as OracleArbitratorData,
} from "./components/oracleArbitration/OracleArbitration";
import { SectionProps } from "views/RealityModule/RealityModule";
import { ARBITRATOR_OPTIONS } from "services";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },

  paperContainer: {
    padding: theme.spacing(2),
  },
}));

export const ORACLE_MAINNET_OPTION = [
  {
    label: "ETH-0x5b7dD1E86623548AF054A4985F7fc8Ccbb554E2c",
    value: "ETH-0x5b7dD1E86623548AF054A4985F7fc8Ccbb554E2c",
  },
  {
    label: "GNO-0x33aa365a53a4c9ba777fb5f450901a8eef73f0a9",
    value: "GNO-0x33aa365a53a4c9ba777fb5f450901a8eef73f0a9",
  },
  // { label: "Add Custom Instance", value: "custom" },
];

export const ORACLE_TEST_OPTION = [
  {
    label: "ETH-0xDf33060F476511F806C72719394da1Ad64",
    value: "ETH-0xDf33060F476511F806C72719394da1Ad64",
  },
  // { label: "Add Custom Instance", value: "custom" },
];

export interface InputPartProps {
  data: any;
  setData: (data: any) => void;
}

export type OracleSectionData = {
  templateData: OracleTemplateData;
  instanceData: OracleInstanceData;
  delayData: OracleDelayData;
  bondData: OracleBondData;
  arbitratorData: OracleArbitratorData;
};

export const OracleSection: React.FC<SectionProps> = ({
  handleBack,
  handleNext,
  setupData,
}) => {
  const classes = useStyles();
  const { safe } = useSafeAppsSDK();
  const options =
    safe.chainId === 1 ? ORACLE_MAINNET_OPTION : ORACLE_TEST_OPTION;

  const [templateData, setTemplateData] = useState<OracleTemplateData>({
    template: "default",
    language: "english",
    category: "DAO",
    templateType: "bool",
    outcomes: [{ outcome: "" }, { outcome: "" }],
  });

  const [instanceData, setInstanceData] = useState<OracleInstanceData>({
    instanceAddress: options[0].value.substr(options[0].value.indexOf("-") + 1),
    instanceType: options[0].value.substr(0, options[0].value.indexOf("-")) as
      | "ETH"
      | "GNO"
      | "custom",
  });

  const [delayData, setDelayData] = useState<OracleDelayData>({
    timeout: 0,
    timeoutUnit: "hours",
    cooldown: 0,
    cooldownUnit: "hours",
    expiration: 0,
    expirationUnit: "hours",
  });

  const [bondData, setBondData] = useState<OracleBondData>({
    bond: 0.01,
  });

  const [arbitratorData, setArbitratorData] = useState<OracleArbitratorData>({
    arbitratorOption: ARBITRATOR_OPTIONS.NO_ARBITRATOR,
  });

  const collectData = (): OracleSectionData => ({
    templateData,
    instanceData,
    delayData,
    bondData,
    arbitratorData,
  });

  useEffect(() => {
    if (setupData && setupData.oracle) {
      const {
        bondData,
        delayData,
        instanceData,
        templateData,
        arbitratorData,
      } = setupData.oracle;
      setBondData(bondData);
      setDelayData(delayData);
      setInstanceData(instanceData);
      setTemplateData(templateData);
      setArbitratorData(arbitratorData);
    }
  }, [setupData]);

  return (
    <ZodiacPaper borderStyle='single' className={classes.paperContainer}>
      <Grid container spacing={4} className={classes.container}>
        <Grid item>
          <Grid container spacing={1} className={classes.container}>
            <Grid item>
              <Typography variant='h3'>Set up the Oracle</Typography>
            </Grid>
            <Grid item>
              <Typography>
                Now, it&apos;s time to set up the oracle for your reality
                module. The oracle ensures the results of proposals are brought
                accurately on-chain. The Reality.eth oracle uses a mechanism
                known as the{" "}
                <Link
                  underline='always'
                  href='https://snapshot.com'
                  target={"_blank"}
                  color='inherit'>
                  escalation game
                </Link>{" "}
                to generate correct answers that can be used as inputs for smart
                contracts. The following parameters are very important for your
                DAO's security and should be considered carefully.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Divider />
        </Grid>

        <Grid item>
          <OracleTemplate data={templateData} setData={setTemplateData} />
        </Grid>

        <Grid item>
          <OracleInstance data={instanceData} setData={setInstanceData} />
        </Grid>

        <Grid item>
          <OracleDelay data={delayData} setData={setDelayData} />
        </Grid>

        <Grid item>
          <OracleBond data={bondData} setData={setBondData} />
        </Grid>

        <Grid item>
          <OracleArbitration
            data={arbitratorData}
            setData={setArbitratorData}
          />
        </Grid>

        <Grid item style={{ paddingBottom: 0 }}>
          <Divider />
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={3}
            justifyContent='center'
            alignItems='center'>
            <Grid item>
              <Button size='medium' variant='text' onClick={handleBack}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='secondary'
                size='medium'
                variant='contained'
                onClick={() => handleNext(collectData())}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ZodiacPaper>
  );
};
