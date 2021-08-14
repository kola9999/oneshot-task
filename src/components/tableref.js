import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Tag, Typography, Button } from "antd";
import "../css/index.css";
import Axios from "axios";
import StudTable from "./studtable";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function TableRef(props) {
  const [student, setStudent] = useState("UNI142");
  const [studentdata, setStudentData] = useState([]);
  const { Title } = Typography;
  const column = props.column;
  const data = [];
  column.map((value, key) => {
    data.push(value);
  });
  useEffect(() => {
    Axios.get("https://collegedb-backend.herokuapp.com/stud", {
      params: { key: student },
    }).then((response) => {
      setStudentData(response.data);
      console.log(student);
    });
  }, [student]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <Button type="link">{text}</Button>,
      width: 90,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 90,
    },
    {
      title: "Courses",
      key: "courses",
      dataIndex: "courses",
      render: (courses) => (
        <>
          {courses.map((item) => {
            let arr = item.split(",");
            let color = arr[0] === "cs" || arr[0] === "it" ? "red" : "blue";
            if (arr[0] === "electronics") {
              color = "green";
            }
            const tagged = arr.map((number) => (
              <Tag color={color} key={number}>
                {number.toUpperCase()}
              </Tag>
            ));
            return <>{tagged}</>;
          })}
        </>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 190,
    },

    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 90,
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      width: 90,
    },
  ];
  return (
    <div>
      <Tag color="magenta">
        <Title level={5}>
          Automatically display data, when you click a state above ⬆️⬆️⬆️
        </Title>
      </Tag>
      <Table
        theme="dark"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setStudent(record.id);
            },
          };
        }}
        sticky={true}
        className="table-striped-rows"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true, y: 540 }}
      />
      <StudTable column={studentdata} />
    </div>
  );
}
