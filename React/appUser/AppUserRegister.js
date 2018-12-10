import React from "react";
import { withRouter } from "react-router-dom";
import { Card, CardHeader, CardBody, CardBlock, CardImg } from "reactstrap";
import { register, userlist } from "../../services/appuser.service";
import RegisterForm from "./components/registerForm";
import { parse } from "query-string";

class AppUserRegister extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    tenantId: null,
    checkState: false,
    userRoleId: null,
    customerBusinessId: null
  };

  componentDidMount() {
    const key = parse(this.props.location.search);
    if (key.tenantId && key.roleId) {
      this.setState({ tenantId: key.tenantId, userRoleId: key.roleId, checkState: true });
    }
    if (key.tenantId && key.businessId) {
      this.setState({
        tenantId: key.tenantId,
        userRoleId: 5,
        checkState: true,
        customerBusinessId: key.businessId
      });
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  clearForm = e => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      tenantId: null
    });
  };

  handleRegisterClicked = values => {
    const email = values.email;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const password = values.password;
    const { tenantId, userRoleId, checkState, customerBusinessId } = this.state;
    const req = { tenantId, email, firstName, lastName, password };
    const reqCustomer = { tenantId, email, firstName, lastName, password, customerBusinessId };
    if (customerBusinessId) {
      register(reqCustomer)
        .then(response => {
          this.clearForm();
          const appUserId = response.data.item;
          const rolereq = { userRoleId, checkState, appUserId };
          userlist(rolereq);
          this.props.history.push("/admin/appuser/confirmwait");
        })
        .catch();
    } else {
      register(req)
        .then(response => {
          this.clearForm();
          const appUserId = response.data.item;
          const rolereq = { userRoleId, checkState, appUserId };
          userlist(rolereq);
          this.props.history.push("/admin/appuser/confirmwait");
        })
        .catch();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row full-height-vh">
            <div
              className="col-12 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "#04b9b6" }}
            >
              <Card className="col-sm-12 col-md-4 px-2 py-2 box-shadow-2">
                <CardHeader className="card-header text-center">
                  <CardImg
                    src="http://i67.tinypic.com/vyy1eh.png"
                    alt="company-logo"
                    className="mb-3"
                    width="auto"
                    height="auto"
                  />
                  <h4 className="text-uppercase text-bold-400 grey darken-1">Signup</h4>
                </CardHeader>
                <CardBody>
                  <CardBlock className="card-block mx-auto">
                    <RegisterForm registerClicked={e => this.handleRegisterClicked(e)} />
                  </CardBlock>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(AppUserRegister);
