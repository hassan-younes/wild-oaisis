import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import useRecentStays from './useRecentStays';
import Spinner from "../../ui/Spinner"
import Stats from './Stats';
import {useCabins} from "../cabins/useCabins"
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  
const {bookings,isLoading:isLoading1,numDays}=useRecentBookings();
const {confirmedStays, isLoading:isLoading2}=useRecentStays()
const {isLoading:isLoading3,cabins}=useCabins()

if(isLoading1 || isLoading2 || isLoading3) return <Spinner/>

return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} cabinCount={cabins.length} numDays={numDays} confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
