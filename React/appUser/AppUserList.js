import React from "react";
import { Table, Card, Input, InputGroupAddon, Button, InputGroup, Row } from "reactstrap";
import User from "./User";
import { NotificationContainer } from "react-notifications";
import { getUsers, getCurrentUser } from "../../services/appuser.service";
import styles from "./AppUserList.module.css";

class AppUserList extends React.Component {
  state = {
    pagedItemResponse: null,
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    search: null,
    userName: ""
  };
  componentDidMount() {
    this.loadPage();

    getCurrentUser().then(response => {
      const res = response.data.item.firstName;
      this.setState({ userName: res });
    });
  }
  loadPage = () => {
    this.setState({ pagedItemResponse: null });
    const { pageIndex, search } = this.state;
    const pageSize = 40;
    const req = { pageIndex, pageSize, search };
    getUsers(req).then(response => {
      this.setState({ pagedItemResponse: response.data.item.pagedItems });
    });
  };
  searchChange = e => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  backToHomePage = e => {
    this.props.history.push("/admin/tenantAgencyHomepage");
  };

  render() {
    const appUsers = this.state.pagedItemResponse;
    return (
      <React.Fragment>
        <React.Fragment>
          <h1>{this.state.userName}</h1>
          <h2 className="content-header">User Roles</h2>
          <InputGroup>
            <Input placeholder="Search Name.." className="col-md-3" onChange={this.searchChange} />
            <InputGroupAddon addonType="append">
              <Button onClick={this.loadPage}>
                <i className="fa fa-search" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </React.Fragment>
        <Card className="px-2 py-2" style={{ overflow: "auto" }}>
          <Row>
            <Table className={"px-2 py-2 " + styles.table}>
              <thead>
                <tr style={{ backgroundColor: "#04b9b6" }} className="text-light">
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-center">Admin</th>
                  <th className="text-center">Agency Rep</th>
                  <th className="text-center">Business Owner</th>
                </tr>
              </thead>
              <tbody>
                {appUsers ? (
                  <>
                    {appUsers.map(appUsers => (
                      <User appUsers={appUsers} key={appUsers.id} />
                    ))}
                  </>
                ) : (
                  <tr>{null}</tr>
                )}
              </tbody>
            </Table>
          </Row>
        </Card>
        <Button color="primary" onClick={this.backToHomePage} block>
          Back
        </Button>
      </React.Fragment>
    );
  }
}

export default AppUserList;
