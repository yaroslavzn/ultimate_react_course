import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import { useCheckin } from '../check-in-out/useCheckin';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking(bookingId);
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkin, isLoading: isCheckingIn } = useCheckin();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) {
    return <Spinner />;
  }

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const isCheckedIn = booking.status === 'checked-in';
  const isUnconfirmed = booking.status === 'unconfirmed';

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" onClick={moveBack} disabled={isDeleting}>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window identifier="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate('/bookings'),
                })
              }
            />
          </Modal.Window>
        </Modal>

        {isCheckedIn && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out #{bookingId}
          </Button>
        )}
        {isUnconfirmed && (
          <Button
            onClick={() => checkin({ id: bookingId })}
            disabled={isCheckingIn}
          >
            Check in #{bookingId}
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
