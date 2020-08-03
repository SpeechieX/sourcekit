import React, { Component } from "react";
import {
  Button,
  Nav,
  DropdownButton,
  Dropdown,
  Item,
  Form,
  Group,
  Label,
} from "react-bootstrap";
import { withRouter } from "react-router";
import "./../style/dash.css";

// import Amplify from "aws-amplify";
// import { withAuthenticator } from "aws-amplify-react";

// Amplify.configure(config)

const Side = (props) => {
  return (
    <div className="container">
      <Form>
        <Form.Label id="label">Province:</Form.Label>
        <Form.Group>
          <Form.Control as="select" id="menu-item">
            <option>Vientiane</option>
            <option>Savannahkhet</option>
            <option>Chompasak</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form>
        <Form.Label id="label">Find All :</Form.Label>
        <Form.Group>
          <Form.Control as="select" id="menu-item">
            <option>Restaurants</option>
            <option>Riders</option>
            <option>Customers</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form>
        <Form.Label id="label">Find History of :</Form.Label>
        <Form.Group>
          <Form.Control as="select" id="menu-item">
            <option>Restaurants</option>
            <option>Riders</option>
            <option>Customers</option>
          </Form.Control>
          <Form.Control as="select" id="menu-item">
            <option>By Order Number</option>
            <option>By Journey</option>
            <option>By Time</option>
          </Form.Control>
        </Form.Group>
        <Form.Label id="label">Sort By :</Form.Label>
        <Form.Control as="select" id="menu-item">
          <option>YTD</option>
          <option>Address</option>
          <option>Date of Contract</option>
          <option>Extra Sales</option>
        </Form.Control>
        <Button id="clear" variant="primary">
          Clear
        </Button>
        <Button id="filter" variant="primary">
          Filter
        </Button>
      </Form>
    </div>
  );
};

const Sidebar = withRouter(Side);
export default Sidebar;
