import { Alert } from "reactstrap";

class AppuserAlerts extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
        You got this
      </Alert>
    );
  }
}

export default AppuserAlerts;
