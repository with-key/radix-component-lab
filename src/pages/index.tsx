import * as React from "react";
import * as AlertModal from "../components/modal/AlertModal";
import * as Modal from "../components/modal/Modal";

const App = () => {
  return (
    <div>
      <AlertModal.AlertModal>
        <AlertModal.AlertModalTrigger>
          Alert Button
        </AlertModal.AlertModalTrigger>
        <Modal.Modal>
          <Modal.ModalTrigger>Modal Button</Modal.ModalTrigger>
          <Modal.ModalContent>11111</Modal.ModalContent>
        </Modal.Modal>
      </AlertModal.AlertModal>
    </div>
  );
};

export default App;
