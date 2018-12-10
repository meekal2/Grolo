import React from "react";
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
import { withRouter } from "react-router-dom";
import { password } from "../../services/appuser.service";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

class AppUserPassword extends React.Component {
  state = {
    email: "",
    alert: false,

    validate: {
      email: ""
    }
  };

  handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  resetHandler = e => {
    e.preventDefault();
    const { email } = this.state;
    const req = { email };

    password(req)
      .then(response => {
        console.log("sent email");
        this.onSuccessNotification();
        this.setState({ email: "" });
      })
      .catch(err => {
        console.log("error");
      });
  };

  restOnClick = () => {
    this.setState({ email: "" });
  };

  onSuccessNotification = () => {
    NotificationManager.success("We just sent you an email");
  };

  onErrorNotification = () => {
    NotificationManager.error("That email cannot be found");
  };

  validateInput(e) {
    let regexString;
    let stateValidateName;

    switch (e.target.name) {
      case "email":
        break;

      default:
        console.log("switched");
    }

    const validate = {
      ...this.state.validate
    };
    if (regexString.test(e.target.value)) {
      validate[stateValidateName] = "has-success";
    } else {
      validate[stateValidateName] = "has-danger";
    }
    this.setState({ validate });
  }

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
                  <h4 className="text-uppercase text-bold-400 grey darken-1">Password Request</h4>
                </CardHeader>
                <CardBody>
                  <CardBlock className="card-block mx-auto">
                    <Form>
                      <FormGroup>
                        <div className="col-md-12">
                          <Input
                            type="email"
                            className="form-control form-control-lg"
                            name="email"
                            placeholder="Email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                        </div>
                      </FormGroup>

                      <FormGroup className="text-center">
                        <Button
                          color="danger"
                          className="px-4 py-2 text-uppercase white font-small-4 box-shadow-1 border-0"
                          onClick={this.resetHandler}
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
export default withRouter(AppUserPassword);
