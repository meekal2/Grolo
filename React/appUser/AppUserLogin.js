import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  FormGroup,
  Input,
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardFooter
} from "reactstrap";
import { login, confirm, registerConfirm } from "../../services/appuser.service";
import "./AppUserLogin.css";
import { parse } from "query-string";
import moment from "moment";

import { updateCurrentUser } from "../Redux/ReduxHelper";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  componentDidMount() {}

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLoginClicked = e => {
    e.preventDefault();
    const key = parse(this.props.location.search);
    const token = key.token;
    const { email, password } = this.state;
    const req = { email, password };
    if (token) {
      confirm(req).then(response => {
        const date = moment.utc().subtract(7, "days");
        const conf = moment(response.data.item.registerDateStamp);
        if (conf <= date) {
          alert("New Confirmation Email");
        } else {
          registerConfirm(token).then(() => {
            login(req).then(() => {
              this.clearForm();
              console.log("Login Success");
              updateCurrentUser().then(userInfo => {
                console.log(userInfo);
                if (userInfo.customerBusinessId) {
                  this.props.history.push("/admin/customerHomepage");
                } else if (userInfo.businesses && userInfo.userRoleIds[0] === 3) {
                  this.props.history.push("/admin/businessHomepage");
                } else if (userInfo.userRoleIds[0] === 2) {
                  this.props.history.push("/admin/accountRepHome");
                } else {
                  this.props.history.push("/admin/tenantAgencyHomepage");
                }
              });
            });
          });
        }
      });
    } else {
      confirm(req).then(response => {
        if (response.data.item.isConfirmed) {
          login(req).then(response => {
            this.clearForm();
            console.log("Login Success");
            console.log(response);
            updateCurrentUser().then(userInfo => {
              console.log(userInfo.userRoleIds[0]);
              console.log(userInfo);
              if (userInfo.customerBusinessId) {
                this.props.history.push("/admin/customerHomepage");
              } else if (userInfo.businesses && userInfo.userRoleIds[0] === 3) {
                this.props.history.push("/admin/businessHomepage");
              } else if (userInfo.userRoleIds[0] === 2) {
                this.props.history.push("/admin/accountRepHome");
              } else {
                this.props.history.push("/admin/tenantAgencyHomepage");
              }
            });
          });
        } else {
          alert("Please Check Email to Confirm");
        }
      });
    }
  };
  clearForm = e => {
    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row full-height-vh">
          <div
            className="col-12 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#04b9b6" }}
          >
            <Card className="px-4 py-2 box-shadow-2 width-400">
              <CardHeader className="text-center">
                <CardImg
                  src="http://i67.tinypic.com/vyy1eh.png"
                  alt="company-logo"
                  className="mb-3"
                  width="180"
                />
                <h4 className="text-uppercase text-bold-400 grey darken-1">Login</h4>
              </CardHeader>
              <CardBody>
                <FormGroup className="form-group">
                  <div className="col-md-12">
                    <Input
                      value={this.state.email}
                      onChange={this.handleChange}
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="col-md-12">
                    <Input
                      value={this.state.password}
                      onChange={this.handleChange}
                      type="password"
                      className="form-control form-control-lg"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="text-center col-md-12">
                    <Button
                      type="submit"
                      onClick={this.handleLoginClicked}
                      className="login btn btn-danger px-4 py-2 text-uppercase white font-small-4 box-shadow-2 border-0"
                    >
                      Submit
                    </Button>
                  </div>
                </FormGroup>
              </CardBody>
              <CardFooter className="grey darken-1">
                <div className="text-center">
                  Forgot Password?{" "}
                  <Link to="/admin/appuser/forgotpassword">
                    <b>Reset</b>
                  </Link>
                </div>
              </CardFooter>
              <CardFooter style={{ borderTop: "0px" }}>
                <div className="text-center">
                  Don't have an account?{" "}
                  <Link to="/admin/appuser/register">
                    <b>Signup</b>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
