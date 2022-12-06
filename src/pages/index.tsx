import * as React from "react";
import * as AlertModal from "../components/modal/AlertModal";
import * as Modal from "../components/modal/Modal";

const App = () => {
  return (
    <div>
      <AlertModal.AlertModal>
        <Modal.Modal>
          <AlertModal.AlertModalContent />
          <Modal.ModalContent />
        </Modal.Modal>
      </AlertModal.AlertModal>
    </div>
  );
};

export default App;
