import * as React from 'react';
import { Modal, Button } from "react-bootstrap";

export interface MidTreatmentModalProps {
  showModal: boolean;
}

export class MidTreatmentModal extends React.Component<MidTreatmentModalProps, any> {
  constructor(props, context) {
    super(props, context);
    this.state = { showModal: this.props.showModal };
  }

  close() {
    this.setState({ showModal: false });
  }

  continue() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  public render() {

    return (<div className="static-modal">
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
          <Modal.Title>Mid-Treatment Patient</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Is This an existing patient, who has already started their treatments?
          </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>No</Button>
          <Button onClick={this.continue} bsStyle="primary">Yes</Button>
        </Modal.Footer>

      </Modal>
    </div>);
  }
}
