/* eslint-disable */
import React, { Component, useRef } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  IrisGrid as IrisGridOpen,
  IrisGridTableModel as IrisGridTableModelOpen,
} from "@deephaven/iris-grid";
import { ContextMenuRoot } from "@deephaven/components";

class ExamplePlugin extends Component {
  constructor(props) {
    super(props);

    this.getMenu = this.getMenu.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.confirmButton = React.createRef();

    this.state = {
      isModalOpen: false,
      title: null,
      model: null,
      IrisGrid: null,
    };
  }

  /**
   * Optional method to get a menu from the plugin.
   *
   * @param {object} data data from deephaven
   */
  getMenu(data) {
    const { components } = this.props;
    const { IrisGrid, IrisGridTableModel } = components;
    const actions = [];

    actions.push({
      title: "Prop Model and Prop Grid",
      group: 0,
      order: 0,
      action: () =>
        this.handleOpenModal(
          "Prop Model and Prop Grid",
          IrisGrid,
          IrisGridTableModel
        ),
    });

    actions.push({
      title: "Prop Model and Open Grid",
      group: 0,
      order: 10,
      action: () =>
        this.handleOpenModal(
          "Prop Model and Open Grid",
          IrisGridOpen,
          IrisGridTableModel
        ),
    });

    actions.push({
      title: "Open Model and Prop Grid",
      group: 0,
      order: 20,
      action: () =>
        this.handleOpenModal(
          "Open Model and Prop Grid",
          IrisGrid,
          IrisGridTableModelOpen
        ),
    });

    actions.push({
      title: "Open Model and Open Grid",
      group: 0,
      order: 30,
      action: () =>
        this.handleOpenModal(
          "Open Model and Open Grid",
          IrisGridOpen,
          IrisGridTableModelOpen
        ),
    });

    return actions;
  }

  handleOpenModal(title, IrisGrid, IrisGridTableModel) {
    const { table } = this.props;
    console.log(title, IrisGrid);
    table.copy().then((copy) => {
      const model = new IrisGridTableModel(copy);
      const proxy = new Proxy(model, new ProxyHandler());
      this.setState({
        isModalOpen: true,
        title,
        model: proxy,
        IrisGrid,
      });
    });
  }

  handleCloseModal() {
    const { model } = this.state;
    if (model) {
      model.close();
    }
    this.setState({
      isModalOpen: false,
      title: null,
      model: null,
      IrisGrid: null,
    });
  }

  render() {
    const { panel } = this.props;
    const { settings } = panel.props;
    const { isModalOpen, title, model, IrisGrid } = this.state;

    return (
      <div>
        <label>Example Plugin</label>
        <TableModal
          isOpen={isModalOpen}
          title={title}
          model={model}
          settings={settings}
          IrisGrid={IrisGrid}
          onClose={this.handleCloseModal}
        />
      </div>
    );
  }
}

const TableModal = (props) => {
  const { isOpen, title, model, settings, IrisGrid, onClose } = props;
  const closeButton = useRef(null);
  return (
    <Modal
      isOpen={isOpen}
      className="theme-bg-dark"
      onOpened={() => {
        closeButton.current.focus();
      }}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div style={{ maxHeight: 400, height: 400 }}>
          {model &&
            React.createElement(IrisGrid, {
              model,
              settings,
            })}
        </div>
        {React.createElement(ContextMenuRoot)}
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-outline-primary"
          data-dismiss="modal"
          onClick={onClose}
          ref={closeButton}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

class ProxyHandler {
  get(target, property, receiver) {
    if (property === "isRollupAvailable") {
      return false;
    }
    const result = Reflect.get(target, property, receiver);
    if (typeof result === "function") {
      return result.bind(target);
    }
    return result;
  }
}

export default ExamplePlugin;
