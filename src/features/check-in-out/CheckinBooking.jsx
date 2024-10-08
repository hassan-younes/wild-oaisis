import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';

import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import BookingDataBox from '../bookings/BookingDataBox';

import { useBooking } from '../bookings/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckin } from './useCheckin';

import styled from 'styled-components';
// import { box } from '../../styles/index';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`

  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { mutate: checkin, isLoading: isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const { isLoading: isLoadingSettings, settings } = useSettings();


  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    status,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights * settings.breakfastPrice * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    
    if (addBreakfast){
      checkin({bookingId:bookingId,
        data:{
          status:"checked-in",
          isPaid: true,
          hasBreakfast:true,
          extraPrice:optionalBreakfastPrice,
          totalPrice:totalPrice + optionalBreakfastPrice
        }
});
    }
    else {checkin({bookingId:bookingId,
            data:{
              status:"checked-in",
              isPaid: true
            }
   });}
  }

if (isCheckingIn) return <Spinner/>
  return (

    <>

      <Row type='horizontal'>
        <Heading type='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* LATER */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          // If the guest has already paid online, we can't even undo this
          disabled={isCheckingIn || confirmPaid}
          id='confirm'
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )} for breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
      { status !=="checked-in" &&<Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
          Check in booking #{bookingId}
        </Button>}
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
