import React from "react";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  Input,
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardBlock,
  Form
} from "reactstrap";

import { resetTokenConfirmation, newPasswordReset } from "../../services/appuser.service";

class AppUserResetPassword extends React.Component {
  state = {
    passwordHash: "",
    confirmPassword: "",
    alert: false
  };

  componentDidMount = () => {
    const resetToken = this.parseFunction();
    console.log("parse", resetToken);

    const payload = {
      resetToken: resetToken
    };

    console.log("object", payload);
    resetTokenConfirmation(payload)
      .then(response => {
        console.log("receieved correct resetToken");
      })
      .catch(error => {
        console.log("error finding token");
      });
  };

  parseFunction = () => {
    const token = /\btoken=(.+?)(&|$)/;
    //props, location, search is bringing down the url

    const token1 = token.exec(this.props.location.search)[1];
    const stringToken = token1;

    return stringToken;
  };

  handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  resetPassHandler = () => {
    const { passwordHash } = this.state;
    const passwordHash1 = { passwordHash };

    console.log(passwordHash1);

    const resetToken1 = this.parseFunction();
    console.log("parse", resetToken1);

    const payload = {
      resetToken: resetToken1,
      passwordHash: passwordHash
    };

    console.log("resetToken", payload);

    newPasswordReset(payload)
      .then(response => {
        console.log("reset password confirmed");
        this.props.history.push("/admin/appuser/login");
      })
      .catch(response => {
        console.log("error with reseting password");
      });

    this.handleClick();
  };

  handleClick = () => {
    this.setState({ passwordHash: "" });
    this.setState({ confirmPassword: "" });
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
              <Card className="col-4 px-2 py-2 box-shadow-2">
                <CardHeader className="card-header text-center">
                  <CardImg
                    src="http://i67.tinypic.com/vyy1eh.png"
                    alt="company-logo"
                    className="mb-3"
                    width="auto"
                    height="auto"
                  />
                  <h4 className="text-uppercase text-bold-400 grey darken-1">Reset Password</h4>
                </CardHeader>
                <CardBody>
                  <CardBlock className="card-block mx-auto">
                    <Form>
                      <FormGroup>
                        <div className="col-md-12">
                          <Input
                            value={this.state.passwordHash}
                            onChange={this.handleChange}
                            type="password"
                            className="form-control form-control-lg"
                            name="passwordHash"
                            id="password"
                            placeholder="New Password"
                            required
                          />
                        </div>
                      </FormGroup>

                      <FormGroup>
                        <div className="col-md-12">
                          <Input
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            type="password"
                            className="form-control form-control-lg"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Password"
                            required
                          />
                        </div>
                      </FormGroup>

                      <FormGroup className="text-center">
                        <Button
                          color="danger"
                          className="px-4 py-2 text-uppercase white font-small-4 box-shadow-1 border-0"
                          onClick={this.resetPassHandler}
                        >
                          Reset Password
                        </Button>
                      </FormGroup>
                    </Form>
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
export default withRouter(AppUserResetPassword);
