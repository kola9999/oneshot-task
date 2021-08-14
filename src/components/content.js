import React from "react";
import "../css/content.css";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Card, Tag, Button } from "antd";

function DemoContent() {
  const Badge = (props) => {
    return <Tag color={props.color}>{props.tag}</Tag>;
  };
  return (
    <>
      <div
        className="contenty"
        style={{
          marginTop: 10,
          textAlign: "center",
          fontWeight: 400,
          fontSize: "2rem",
          paddingBottom: 30,
        }}
      >
        Welcome to CollegeDB
      </div>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ paddingBottom: 30 }}
      >
        <Col xs={24} xl={8}>
          <Card
            hoverable
            title="New here? Check details below!⬇️⬇️⬇️"
            bordered={false}
          >
            The below table provides the college details with{" "}
            {<Badge color="red" tag="id" />},{" "}
            {<Badge color="blue" tag="College name" />},{" "}
            {<Badge color="violet" tag="Year of establishhment" />},
            {<Badge color="yellow" tag="courses" />},
            {<Badge color="green" tag="city" />}
            and several other details can be found. Scroll through the table and
            click on pagination below to navigate between multiple pages (if
            present😜)
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card
            hoverable
            title="Lack of time or Lazy to scroll?⬇️⬇️⬇️"
            bordered={false}
          >
            You can search the entire table by clicking on the "
            {<SearchOutlined />}" icon and also Filters can be applied using the{" "}
            {<Button type="link">Filter</Button>} Button and also Reset the
            search by clicking on {<Button size="small">Reset</Button>} button.
            Search is applicable for id, name, year, courses and city fields.
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card
            hoverable
            title="Apply multiple Filters?⬇️⬇️⬇️"
            bordered={false}
          >
            Once you apply a filter the search icon changes to blue, you can
            apply more filters by searching different columns For example, You
            can search for a city {<Badge color="red" tag="Hyderabad" />} and
            search for a specific course like{" "}
            {<Badge color="volcano" tag="CS" />}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default DemoContent;
