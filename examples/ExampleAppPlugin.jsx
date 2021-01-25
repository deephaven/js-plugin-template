/* eslint-disable */
import React, { Component } from 'react';
// import Glue from '@glue42/core'; // uncomment this when glue core is installed

class ExampleAppPlugin extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: null,
      oldPanel: null,
      panelId: null,
      glue: null,
    };
  }

  componentDidMount() {
    const { onOpenDashboard, onOpenObject } = this.props;
    const initializeGlue42 = async () => {
      // uncomment this when glue core is installed
      // const glue = await Glue();
      // return glue;
    };

    initializeGlue42()
      .then(glue => {
        console.log('Glue42 intialized.', glue);
        this.setState({ glue });
        glue.interop.register(
          {
            name: 'Open',
            accepts: 'string name',
          },
          args => {
            const { name } = args;
            onOpenDashboard('Test A')
              .then(id => {
                let oldPanel = null;
                let panelId = null;
                const { dashboardOpenedPanelMaps } = this.props;
                const dashboardMap = dashboardOpenedPanelMaps[id];
                if (dashboardMap) {
                  const iterator = dashboardMap.keys();
                  let isOpened = false;
                  let result = iterator.next();
                  while (!result.done) {
                    const key = result.value;
                    if (dashboardMap.get(key)?.props?.metadata?.table === 'a') {
                      oldPanel = dashboardMap.get(key);
                      panelId = key;
                      isOpened = true;
                      onOpenObject('Test', name, key);
                      break;
                    }
                    result = iterator.next();
                  }
                  if (!isOpened) {
                    onOpenObject('Test', name);
                  }
                }
                this.setState({ id, oldPanel, panelId });
              })
              .catch(e => console.error(e));
          }
        );
      })
      .catch(e => {
        console.error('Error intializing Glue42.', e);
      });
  }

  handleClick() {
    const { glue } = this.state;
    if (glue) {
      glue.interop.invoke('Open', { name: 'a' });
    }
  }

  render() {
    return <label onClick={this.handleClick}>Example App Plugin</label>;
  }
}

export default ExampleAppPlugin;
