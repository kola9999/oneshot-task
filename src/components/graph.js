import React, { useState, useEffect } from "react";
import TableRef from "./tableref";
import { Doughnut } from "react-chartjs-2";
import { chartColors } from "./colors";
import { Tag, Typography } from "antd";
import Axios from "axios";

export default function Graph() {
  const { Title } = Typography;
  const [graphdata, setgraphdata] = useState([]);
  const [state, setState] = useState("Andhra Pradesh");
  const [tabledata, setTableData] = useState([]);
  useEffect(() => {
    Axios.get("https://collegedb-backend.herokuapp.com/search").then(
      (response) => {
        setgraphdata(response.data);
      }
    );
  }, []);
  useEffect(() => {
    Axios.get("https://collegedb-backend.herokuapp.com/filter", {
      params: { search: state },
    }).then((response) => {
      setTableData(response.data);
    });
  }, [state]);
  const labelarray = [];
  const dataarray = [];
  for (const label of graphdata) {
    labelarray.push(label._id);
  }
  for (const value of graphdata) {
    dataarray.push(value.count);
  }
  //console.log(labelarray);
  const data = {
    maintainAspectRatio: false,
    responsive: true,
    labels: labelarray,
    datasets: [
      {
        data: dataarray,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
    text: "23%",
  };
  const options = {
    legend: {
      display: true,
      position: "right",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    onClick: function (evt, element) {
      setState(labelarray[element[0].index]);
    },
  };
  //console.log(tabledata);
  return (
    <>
      <div style={{ margin: "auto", width: "30%", paddingBottom: "10px" }}>
        <Tag color="red">
          <Title level={5}>
            Total statistics of Colleges according to their Respective states
          </Title>
        </Tag>
      </div>
      <div
        style={{
          height: "650px",
          width: "650px",
          alignContent: "center",
          margin: "auto",
        }}
      >
        <div style={styles.relative}>
          <Doughnut data={data} options={options} />
          <div id="legend" />
        </div>
      </div>
      <div>
        <TableRef column={tabledata} />
      </div>
    </>
  );
}

const styles = {
  relative: {
    position: "relative",
    paddingBottom: 100,
  },
};
