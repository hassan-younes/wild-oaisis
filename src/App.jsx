import GlobalStyles from "./styles/GlobalStyles"
//test
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import AppLayout from "./ui/AppLayout"
import Dashboard from "./pages/Dashboard"
import Account from "./pages/Account"
import Bookings from "./pages/Bookings"
import Checkin from "./pages/Checkin"
import Cabins from "./pages/Cabins"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Settings from "./pages/Settings"
import Users from "./pages/Users"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Booking from "./pages/Booking"
import ProtectedRout from "./ui/ProtectedRout"
import { DarkModeProvider } from "./context/DarkModeContext"

const queryClient= new QueryClient()

export default function App() {

return (
<QueryClientProvider client={queryClient}>
<DarkModeProvider>   
<ReactQueryDevtools initialIsOpen={false} />
<GlobalStyles />    
<BrowserRouter>
  <Routes>
    <Route element={<ProtectedRout><AppLayout/></ProtectedRout>} >
      <Route index element={<Navigate replace to="dashboard"/>} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="account" element={<Account/>} />
      <Route path="bookings" element={<Bookings/>} />
      <Route path="cabins" element={<Cabins/>} />
      <Route path="checkin/:bookingId" element={<Checkin/>} />
      <Route path="settings" element={<Settings/>} />
      <Route path="users" element={<Users/>} />
    <Route path="bookings/:bookingId" element={<Booking/>} />
    </Route>
    
    <Route path="login" element={<Login/>} />
    <Route path="*" element={<PageNotFound/>} />
    
  </Routes>
</BrowserRouter>
<Toaster psition="top-center" gutter={12} 
  containerStyle={{margin:"8px"}}
  toastOptions={{
  success:{duration:3000},
  error:{duration:5000},
  style:{
    fontSize:"16px",
    maxWidth:"500px",
    padding:"16px 24px",
    backgroundColor:"var(--color-grey-0)",
    color:"var(--color-grey-700)"
  }
  }}
/>
</DarkModeProvider>
</QueryClientProvider>

)}

