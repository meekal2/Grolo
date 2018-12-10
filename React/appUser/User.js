import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { userlist } from "../../services/appuser.service";
import { updateCurrentUser } from "../Redux/ReduxHelper";

class User extends React.Component {
  state = {
    adminState: this.props.appUsers.admin,
    agencyState: this.props.appUsers.agencyRep,
    businessState: this.props.appUsers.businessOwner
  };

  toggleChangedAdmin(e) {
    const userRoleId = e.target.value;
    let adminState = this.state.adminState;
    adminState = e.target.checked;
    const { id } = this.props.appUsers;
    const appUserId = id;
    const checkState = adminState;
    const req = { appUserId, checkState, userRoleId };
    this.setState({ adminState }, () => {
      userlist(req).then(this.createNotification("success"), updateCurrentUser());
    });
  }
  toggleChangedAgency(e) {
    const userRoleId = e.target.value;
    let agencyState = this.state.agencyState;
    agencyState = e.target.checked;
    const { id } = this.props.appUsers;
    const appUserId = id;
    const checkState = agencyState;
    const req = { appUserId, checkState, userRoleId };
    this.setState({ agencyState }, () => {
      userlist(req).then(this.createNotification("success"), updateCurrentUser());
    });
  }
  toggleChangedBusiness(e) {
    const userRoleId = e.target.value;
    let businessState = this.state.businessState;
    businessState = e.target.checked;
    const { id } = this.props.appUsers;
    const appUserId = id;
    const checkState = businessState;
    const req = { appUserId, checkState, userRoleId };
    this.setState({ businessState }, () => {
      userlist(req).then(this.createNotification("success"), updateCurrentUser());
    });
  }
  createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success!", "Role Changed");
          break;
        case "warning":
          NotificationManager.warning("Warning message", "Close after 3000ms", 3000);
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
        default:
          break;
      }
    };
  };
  render() {
    const appUsers = this.props.appUsers;
    return (
      <React.Fragment>
        <tr>
          <td>
            {appUsers.firstName} {appUsers.lastName}
          </td>
          <td>{appUsers.email}</td>
          <td className="roleCheckBox">
            <FormGroup check inline>
              <Label check>
                <Input
                  checked={this.state.adminState}
                  name="admin"
                  type="checkbox"
                  value="1"
                  onChange={e => this.toggleChangedAdmin(e)}
                />
              </Label>
            </FormGroup>
          </td>
          <td className="roleCheckBox">
            <FormGroup check inline>
              <Label check>
                <Input
                  checked={this.state.agencyState}
                  name="agencyRep"
                  type="checkbox"
                  value="2"
                  onChange={e => this.toggleChangedAgency(e)}
                />
              </Label>
            </FormGroup>
          </td>
          <td className="roleCheckBox">
            <FormGroup check inline>
              <Label check>
                <Input
                  checked={this.state.businessState}
                  name="businessOwner"
                  type="checkbox"
                  value="3"
                  onChange={e => this.toggleChangedBusiness(e)}
                />
              </Label>
            </FormGroup>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default User;
