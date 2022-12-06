import * as React from "react";
import * as AlertModal from "../components/modal/AlertModal";
import * as Modal from "../components/modal/Modal";

const App = () => {
  return (
    <div>
      <AlertModal.AlertModal>
        <Modal.Modal>
          <AlertModal.AlertModalTrigger>
            Alert Button
          </AlertModal.AlertModalTrigger>
          <Modal.ModalTrigger>Modal Button</Modal.ModalTrigger>
        </Modal.Modal>
      </AlertModal.AlertModal>
    </div>
  );
};

export default App;
