import React from "react";
import data from "../Wine-Data.json";
import ReactEcharts from "echarts-for-react";

const Charts = () => {
  const colorintensity = [];
  const hue = [];
  let alcohol = [];
  let malicAcidArr = [];

  function chartdata(arr = [], n) {
    arr.filter((d) => {
      hue.push(d.Hue);
      colorintensity.push(d["Color intensity"]);
      return d;
    });

    let groupedData = [];
    arr.forEach((d) => {
      let found = false;
      groupedData.forEach((gd) => {
        if (gd["Alcohol"] === d["Alcohol"]) {
          gd["Malic Acid"].push(d["Malic Acid"]);
          found = true;
        }
      });
      if (!found) {
        groupedData.push({
          Alcohol: d["Alcohol"],
          "Malic Acid": [d["Malic Acid"]],
        });
      }
    });
    // Step 2: Extract alcohol to its own array, and average malic acid values to its own array.

    groupedData.forEach((gd) => {
      alcohol.push(gd["Alcohol"]);
      malicAcidArr.push(
        gd["Malic Acid"].reduce((prev, curr) => prev + curr) /
          gd["Malic Acid"].length
      );
    });
  }
  chartdata(data, 1);

  const scatterChart = {
    xAxis: {
      name: "Color intensity",
      type: "category",
      data: colorintensity,
    },
    yAxis: {
      name: "Hue",
      type: "value",
    },
    series: [
      {
        name: "Hue",
        data: hue,
        type: "scatter",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  const barChart = {
    xAxis: {
      name: "Alcohol",
      type: "category",
      data: alcohol,
    },
    yAxis: {
      name: "Malic acid",
      type: "value",
    },
    series: [
      {
        name: "Malic acid",
        data: malicAcidArr,
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <>
    <h1>Chart Data</h>
      <ReactEcharts option={scatterChart} />
      <ReactEcharts option={barChart} />
    </>
  );
};

export default Charts;
