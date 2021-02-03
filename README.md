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
/npx webpack --config webpack.config.js
```

Your output will be in `dist/main.js`

## Uploading the Plugin

1.  Create a directory on the Server to place the plugins.

2.  Set the config value for `Webapi.plugins` to point to the plugins directory.

3.  Copy the output file `main.js` to that directory on the server and rename it (e.g. `ExamplePlugin.js`).

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
