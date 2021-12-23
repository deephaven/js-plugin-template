/* eslint-disable */
import { Component } from "react";

class ExampleLoginPlugin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onPermissionOverrides } = this.props;
    const permissionOverrides = {
      canUsePanels: true,
      canCreateDashboard: true,
      canCreateCodeStudio: true,
      canCreateQueryMonitor: true,
      canCopy: true,
      canDownloadCsv: true,
    };
    onPermissionOverrides((username, operateAs, groups) => {
      console.log("[ExampleLoginPlugin]", username, operateAs, groups);
      return permissionOverrides;
    });
  }

  render() {
    return null;
  }
}

export default ExampleLoginPlugin;
