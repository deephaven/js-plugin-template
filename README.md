# Deephaven Javascript Plugin Template

Use this Template to create a Javascript Plugin

## Initial Setup

After checking out this template for the first time:

1. Do an `npm install`

## Source Files

1. Your main source file is `src/index.js`

It is defaulted to ExamplePlugin.jsx from the examples directory which is a Table Plugin. You may want to overwrite with ExampleAppPlugin.jsx
if you are writing an App Plugin.

2. Copy any included source files into `src` maintaining their directory structure (none are needed for the examples).

## Build the Plugin

```
npm run build
```

Your output will be in `dist/main.js`

## Uploading the Plugin

1.  Create a directory on the Server to place the plugins.
    ```
    sudo -u irisadmin mkdir /etc/sysconfig/deephaven/plugins/javascript-plugins
    ```

2.  Set the config value for `Webapi.plugins` to point to the plugins directory.

    - Export props:

        ```
        sudo -u dbquery /usr/illumon/latest/bin/etcd_prop_file --export iris-environment.prop /tmp
        ```
    
    - Edit `/tmp/iris-environment.prop` and add the following line:

        ```
        Webapi.plugins=/etc/sysconfig/deephaven/plugins/javascript-plugins
        ```
    
    - Import the updated props:
        ```
        sudo -u irisadmin /usr/illumon/latest/bin/etcd_prop_file --import /tmp/iris-environment.prop
        ```

3.  Copy the output file `main.js` to that directory on the server and rename it (e.g. `ExamplePlugin.js`).
    ```
    scp ./main.js username@host:/tmp
    ssh username@host
    sudo -u irisadmin cp /tmp/main.js /etc/sysconfig/deephaven/plugins/javascript-plugins/ExamplePlugin.js
    ```

4.  The file name is used as the name of the plugin. <br>
    e.g. `ExamplePlugin.js` will be named `ExamplePlugin`

## Attach a Plugin in a Query

Simply set the PLUGIN_NAME attribute on the Table with the name of the plugin <br>
For a plugin located at https://host/url/iriside/plugins/ExamplePlugin.js <br>
The name will ExamplePlugin

```
t=db.t("LearnDeephaven", "StockTrades").where("Date=`2017-08-21`")
t.setAttribute("PluginName", "ExamplePlugin")
```

## Setting an Application Level Plugin

In the config set `Webapi.app.plugins` to your plugin name. This can be a comma separated list to support multiple plugins.

## Login Plugin

A Login Plugin loads before the user logs in to the Web Client, and it allows UI permissions to be set. See `ExampleLoginPlugin.jsx` for an example.
The current supported permissions are:

- canUsePanels - Allows the user access to the `Panels` button in the UI.
- canCreateDashboard - Allows the user to create a new Dashboard.
- canCreateCodeStudio - Allows the user to create a new Code Studio.
- canCreateQueryMonitor - Allows the user to create a new Query Monitor.
- canCopy - Allows the user to copy cells and rows from a table.
- canDownloadCsv - Allows the user to download a table to CSV.

All permissions default to `true` but can be set to `false` for certain users or groups to disable functionality.
This is done by calling the `onPermissionOverrides` function in `componentDidMount`. Return an object with only
the permissions that need to be changed. If a user should have the default permissions, return an empty object.

## Setting a Login Plugin

As with other plugin types, you must have a plugin directory configured and copy the Login Plugin to that directory.

Then in the config set `Webapi.login.plugins` to your plugin name. This can be a comma separated list to support multiple login plugins.

Finally, you must add this to the Auth Config, e.g.

```
authentication.client.configuration.list=Webapi.login.plugins
```

This last step allows the login plugin to load prior to the user logging in.
