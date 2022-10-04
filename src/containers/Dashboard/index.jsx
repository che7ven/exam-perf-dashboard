import React, { useContext, useState, memo } from "react";
import { PropTypes } from "prop-types";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import Plot from "react-plotly.js";
import { Grid, Paper, withStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PivotTableUI from "react-pivottable/PivotTableUI";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import Header from "../../components/Header";
import CustomTable from "../../components/CustomTable";
import { UsersContext } from "../../utils/usersContext";
import "react-pivottable/pivottable.css";
import styles from "./styles";

const PlotlyRenderers = createPlotlyRenderers(Plot);

const Dashboard = ({ classes }) => {
  const { user } = useContext(UsersContext);
  const [pivotData, setPivotData] = useState({ pivotState: { data: [] } });
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const pivot = (
    <PivotTableUI
      data={pivotData.pivotState}
      onChange={(s) => setPivotData({ pivotState: s })}
      renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
      {...pivotData.pivotState}
    />
  );

  const getXYaxis = () => {
    let xAxis = [],
      yAxis1 = [],
      yAxis2 = [],
      yAxis3 = [];

    let indexNode = {
      question_id: 0,
      score: 0,
      unanswered: 0,
    };
    let prevQs = "",
      currQs = "";
    let falseOneCount = 0,
      falseZeroCount = 0,
      trueZeroCount = 0;
    pivotData.pivotState.data.map((row, index) => {
      //count of FALSE-1, FALSE-0, TRUE-0 ; y-axis
      //list of questions; x-axis
      if (index === 0) {
        row.map((item, index) => {
          if (item === "question_id") {
            indexNode["question_id"] = index;
          } else if (item === "score") {
            indexNode["score"] = index;
          } else if (item === "unanswered") {
            indexNode["unanswered"] = index;
          }
        });
      }

      if (index === 1) {
        prevQs = currQs = row[indexNode.question_id];
      }

      if (index !== 0) {
        if (!xAxis.includes(row[indexNode.question_id])) {
          xAxis.push(row[indexNode.question_id]);
        }

        if (prevQs !== row[indexNode.question_id]) {
          prevQs = currQs;
          currQs = row[indexNode.question_id];
        } else {
          prevQs = currQs = row[indexNode.question_id];
        }

        if (prevQs === currQs && row[indexNode.unanswered] === "FALSE") {
          if (row[indexNode.score] === "1") {
            falseOneCount++;
          } else {
            falseZeroCount++;
          }
        } else if (row[indexNode.unanswered] === "TRUE") {
          trueZeroCount++;
        } else if (prevQs !== currQs) {
          yAxis1.push(falseOneCount);
          yAxis2.push(falseZeroCount);
          yAxis3.push(trueZeroCount);
          falseOneCount = falseZeroCount = trueZeroCount = 0;
        }
      }
    });

    return { xAxis, yAxis1, yAxis2, yAxis3 };
  };

  const barChart = (
    <Grid container>
      <Grid item>
        <Plot
          data={[{ type: "bar", x: getXYaxis().xAxis, y: getXYaxis().yAxis1 }]}
          layout={{
            width: "50%",
            height: "100%",
            title: "Correct answers chart",
          }}
        />
      </Grid>
      <Grid item>
        <Plot
          data={[{ type: "bar", x: getXYaxis().xAxis, y: getXYaxis().yAxis2 }]}
          layout={{
            width: "50%",
            height: "100%",
            title: "Wrong answers chart",
          }}
        />
      </Grid>
      <Grid item>
        <Plot
          data={[
            {
              type: "pie",
              labels: getXYaxis().xAxis,
              values: getXYaxis().yAxis3,
            },
          ]}
          layout={{ width: "50%", height: "100%", title: "Unanswered chart" }}
        />
      </Grid>
    </Grid>
  );

  const getTabData = () => {
    return currentTab === 0 ? (
      <CustomTable data={pivotData.pivotState.data} />
    ) : currentTab === 1 ? (
      barChart
    ) : (
      pivot
    );
  };

  const handleDrop = (files) => {
    setPivotData({
      mode: "thinking",
      filename: "(Parsing CSV...)",
      textarea: "",
      pivotState: { data: [] },
    });

    Papa.parse(files[0], {
      skipEmptyLines: true,
      error: (e) => alert(e),
      complete: (parsed) =>
        setPivotData({
          mode: "file",
          filename: files[0].name,
          pivotState: { data: parsed.data },
        }),
    });
  };

  return (
    <Grid container className={classes.chatContainer}>
      <Grid item style={{ width: "100%" }}>
        <Header user={user ? user : "C"} />
      </Grid>
      <Grid item className={classes.fileWrapper}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{ textAlign: "center" }}>
                  Drag 'n' drop / click here to read CSV
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </Grid>
      <Grid item style={{ alignSelf: "center" }}>
        <h3>{pivotData?.filename}</h3>
      </Grid>
      <Grid item className={classes.tableWrap}>
        <Paper elevation={3} className={classes.paperWrapper}>
          <Grid item className={classes.contentWrapper}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Student Performance" />
              <Tab label="Question Performance" />
              <Tab label="Misc Viz" />
            </Tabs>
            {getTabData()}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

Dashboard.defaultProps = {
  classes: {},
};

Dashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(memo(Dashboard));
