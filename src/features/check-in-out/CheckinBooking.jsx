import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { useParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { bookingId: id } = useParams();
  const { booking, isLoading } = useBooking(id);
  const [isConfirmedPaid, setIsConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { checkin, isLoading: isCheckinLoading } = useCheckin();
  const { isLoading: isSettingsLoading, settings: { breakfastPrice } = {} } =
    useSettings();

  useEffect(() => {
    if (booking) {
      setIsConfirmedPaid(booking.isPaid);
      setAddBreakfast(booking.hasBreakfast);
    }
  }, [booking]);

  if (isLoading || isCheckinLoading || isSettingsLoading) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const possibleBreakfastPrice = breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!isConfirmedPaid) {
      return;
    }

    let additionalInfo = {};

    if (addBreakfast) {
      additionalInfo['hasBreakfast'] = true;
      additionalInfo['extrasPrice'] = possibleBreakfastPrice;
      additionalInfo['totalPrice'] = totalPrice + possibleBreakfastPrice;
    }

    checkin({ id: bookingId, obj: additionalInfo });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => setAddBreakfast(!addBreakfast)}
            disabled={hasBreakfast}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(possibleBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirmedPaid"
          checked={isConfirmedPaid}
          disabled={booking?.isPaid}
          onChange={() => setIsConfirmedPaid(!isConfirmedPaid)}
        >
          I confirmed that {guests.fullName} has paid the total amount of{' '}
          {hasBreakfast && formatCurrency(totalPrice)}
          {!hasBreakfast &&
            formatCurrency(
              addBreakfast ? totalPrice + possibleBreakfastPrice : totalPrice
            )}
          {addBreakfast &&
            ` - (${formatCurrency(totalPrice)} + ${formatCurrency(
              possibleBreakfastPrice
            )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isConfirmedPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
