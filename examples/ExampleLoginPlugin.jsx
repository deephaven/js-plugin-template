/* eslint-disable */
import { Component } from "react";

/**
 * Plugin to override user permissions.
 * Permissions are for UI functionality only.
 */
class ExampleLoginPlugin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onPermissionOverrides } = this.props;
    onPermissionOverrides((username, operateAs, groups) => {
      console.log("[ExampleLoginPlugin]", username, operateAs, groups);

      /** Only return the permissions you wish to override. Any permissions not provided will use their default value. */
      return {
        /** Is a super user */
        // isSuperUser: false,
        /** Only the summary view of queries is visible, and cannot create code studios */
        // isQueryViewOnly: false,
        /** Not allowed to use the web UI at all */
        // isNonInteractive: false,
        /** Can use the Panels menu to select panels to add to a dashboard */
        // canUsePanels: true,
        /** Can create new dashboards */
        // canCreateDashboard: true,
        /** Can create/use code studios */
        // canCreateCodeStudio: true,
        /** Can create/use query monitor */
        // canCreateQueryMonitor: true,
        /** Can copy table data use keyboard shortcuts or context menu */
        // canCopy: true,
        /** Can download/export table data as CSV */
        // canDownloadCsv: true,
        /** Can share dashboards with other users */
        // canShareDashboards: true,
        /** Can view the list of users a dashboard is shared with for a dashboard they are a viewer of */
        // canViewDashboardSharedUsers: true,
        /** Can share queries with other users */
        // canShareQueries: true,
        /** Can view the list of users a query is shared with for a query they are a viewer of */
        // canViewQuerySharedUsers: true,
      };
    });
  }

  render() {
    return null;
  }
}

export default ExampleLoginPlugin;
