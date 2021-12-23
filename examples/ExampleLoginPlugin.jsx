/* eslint-disable */
import { Component } from "react";

class ExampleLoginPlugin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onPermissionOverrides } = this.props;
    onPermissionOverrides((username, operateAs, groups) => {
      console.log("[ExampleLoginPlugin]", username, operateAs, groups);
      return {
        canUsePanels: true,
        canCreateDashboard: true,
        canCreateCodeStudio: true,
        canCreateQueryMonitor: true,
        canCopy: true,
        canDownloadCsv: true,
      };
    });
  }

  render() {
    return null;
  }
}

export default ExampleLoginPlugin;
