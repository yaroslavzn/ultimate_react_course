import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useCreateCabin } from './useCreateCabin';
import { useDeleteCabin } from './useDeleteCabin';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import { CABIN_IMAGES_BUCKET_URL } from '../../utils/constants';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { image, name, maxCapacity, regularPrice, discount, id, description } =
    cabin;
  const { createCabin } = useCreateCabin();

  const duplicateCabinHandler = () => {
    createCabin({
      image,
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  };

  return (
    <Table.Row>
      <Img src={`${CABIN_IMAGES_BUCKET_URL}/${image}`} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 && <Discount>{formatCurrency(discount)}</Discount>}
      {!discount && <span>&mdash;</span>}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id}></Menus.Toggle>

            <Menus.List id={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={duplicateCabinHandler}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="confirmDelete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window identifier="edit">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.Window identifier="confirmDelete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteCabin(cabin.id)}
              disabled={isDeleting}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
