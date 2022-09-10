import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ClienteContext } from '../../context/ClienteContext';

type Props = {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
  id: number;
};

export const ModalEliminar: React.FC<Props> = ({
  show,
  handleShow,
  handleClose,
  id,
}) => {
  const { handleEliminarCliente } = useContext(ClienteContext);

  const handleEliminar = async () => {
    handleEliminarCliente(id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Seguro que deseas eliminar el cliente con id #{id}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleEliminar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
