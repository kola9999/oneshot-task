import React from "react";
import "antd/dist/antd.css";
import { Table, Tag, Typography, Button } from "antd";
import "../css/index.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function StudTable(props) {
  const { Title } = Typography;
  const column = props.column;
  const data = [];
  column.map((value, key) => {
    data.push(value);
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <Button type="link">{text}</Button>,
      width: 90,
    },
    {
      title: "Student Id",
      dataIndex: "stud_id",
      key: "stud_id",
      width: 190,
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
      width: 190,
    },
    {
      title: "Skills",
      key: "skills",
      dataIndex: "skills",
      render: (skills) => (
        <>
          {skills.map((item) => {
            let arr = item.split(",");
            let color = arr[0] === "Python" || arr[0] === "C" ? "red" : "blue";
            if (arr[0] === "Java") {
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
  ];

  return (
    <div>
      <Tag color="magenta">
        <Title level={5}>
          Displays student data Automatically, when you click a College Id above
          ⬆️⬆️⬆️
        </Title>
      </Tag>
      <Table
        theme="dark"
        sticky={true}
        className="table-striped-rows"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: 540 }}
      />
    </div>
  );
}
