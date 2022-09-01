import React from "react";
import data from "../Wine-Data.json";
import ReactEcharts from "echarts-for-react";

const Charts = () => {
  const colorintensity = [];
  const hue = [];
  let alcohol = [];
  let malicAcidAvg = [];

  const malicAcidArr1 = [];
  const malicAcidArr2 = [];
  const malicAcidArr3 = [];

  function chartdata(arr = []) {
    arr.filter((d) => {
      hue.push(d.Hue);
      colorintensity.push(d["Color intensity"]);
      return d;
    });

    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let temAlArr = [];
    for (let i = 0; i < arr.length; i++) {
      temAlArr.push(arr[i].Alcohol);
      if (arr[i].Alcohol === 1) {
        malicAcidArr1.push(arr[i]["Malic Acid"]);
      }
      if (arr[i].Alcohol === 2) {
        malicAcidArr2.push(arr[i]["Malic Acid"]);
      }
      if (arr[i].Alcohol === 3) {
        malicAcidArr3.push(arr[i]["Malic Acid"]);
      }
    }

    alcohol.push(...new Set(temAlArr));
    for (let i = 0; i < malicAcidArr1.length; i++) {
      total1 += malicAcidArr1[i];
    }
    for (let i = 0; i < malicAcidArr2.length; i++) {
      total2 += malicAcidArr2[i];
    }
    for (let i = 0; i < malicAcidArr3.length; i++) {
      total3 += malicAcidArr3[i];
    }
    total1 = total1 / malicAcidArr1.length + 1;
    total2 = total2 / malicAcidArr2.length + 1;
    total3 = total3 / malicAcidArr3.length + 1;
    malicAcidAvg.push(total1, total2, total3);
  }
  chartdata(data);
  console.log(alcohol);
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
        data: malicAcidAvg,
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
      <ReactEcharts option={scatterChart} />
      <ReactEcharts option={barChart} />
    </>
  );
};

export default Charts;
