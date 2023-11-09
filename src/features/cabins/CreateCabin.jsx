import React from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const CreateCabin = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="create-cabin">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window identifier="create-cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default CreateCabin;
