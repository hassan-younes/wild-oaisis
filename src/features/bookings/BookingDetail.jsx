import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import {  HiArrowDownOnSquare, HiEye } from 'react-icons/hi2';
import { useBooking } from './useBooking'
import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckout } from '../check-in-out/useCheckout';
import ButtonText from '../../ui/ButtonText';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const {booking ,isLoading,error} = useBooking();

  const { mutate:deleteBooking, isLoading:isDeleting } = useDeleteBooking();
  const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading ) return <Spinner />;
  if (error) return <Empty resource='booking' />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { id: bookingId, status } = booking;

 
  
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

       <BookingDataBox booking={booking} />

      <ButtonGroup>
      {status==="unconfirmed" && <Button onClick={()=>navigate(`/checkin/${bookingId}`)}><HiArrowDownOnSquare/> check in</Button>}
     

        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
