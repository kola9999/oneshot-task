import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Tag, Space, Button, Input, Typography } from "antd";
import "../css/index.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Axios from "axios";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function TableView() {
  const { Title } = Typography;
  const [column, setcolumns] = useState([]);

  useEffect(() => {
    Axios.get("https://collegedb-backend.herokuapp.com/read").then(
      (response) => {
        setcolumns(response.data);
      }
    );
  }, []);

  const data = [];
  column.map((value, key) => {
    data.push(value);
  });

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setsearchedColumn] = useState("");
  let searchInput = "";
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setsearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      render: (text) => <Button type="link">{text}</Button>,
      width: 90,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      ...getColumnSearchProps("year"),
      width: 90,
    },
    {
      title: "Courses",
      key: "courses",
      dataIndex: "courses",
      ...getColumnSearchProps("courses"),
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
      ...getColumnSearchProps("city"),
      width: 190,
    },

    {
      title: "State",
      dataIndex: "state",
      key: "state",
      ...getColumnSearchProps("state"),
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
        <Title level={5}>Total Colleges Found</Title>
      </Tag>
      <Table
        theme="dark"
        sticky={true}
        className="table-striped-rows"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true, y: 540 }}
      />
    </div>
  );
}

export default TableView;
