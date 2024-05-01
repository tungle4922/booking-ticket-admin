import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import MovieList from './pages/Movies/List';
import UpdateMovie from './pages/Movies/Update';
import AddMovie from './pages/Movies/Add';
import UserList from './pages/User/List';
import AddUser from './pages/User/Add';
import UpdateUser from './pages/User/Update';
import TheaterList from './pages/Theater/List';
import AddTheater from './pages/Theater/Add';
import UpdateTheater from './pages/Theater/Update';
import ListUser from './pages/Voucher/ListUser';
import ListVoucher from './pages/Voucher/ListVoucher';
import AddVoucher from './pages/Voucher/AddVoucher';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/auth/signin');
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/user/list" />} />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | BTicket Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/movie/list"
          element={
            <>
              <PageTitle title="Movie List | BTicket Admin" />
              <MovieList />
            </>
          }
        />
        <Route
          path="/movie/update"
          element={
            <>
              <PageTitle title="Movie View | BTicket Admin" />
              <UpdateMovie />
            </>
          }
        />
        <Route
          path="/movie/add"
          element={
            <>
              <PageTitle title="Movie Add | BTicket Admin" />
              <AddMovie />
            </>
          }
        />
        <Route
          path="/user/list"
          element={
            <>
              <PageTitle title="User List | BTicket Admin" />
              <UserList />
            </>
          }
        />
        <Route
          path="/user/add"
          element={
            <>
              <PageTitle title="User Add | BTicket Admin" />
              <AddUser />
            </>
          }
        />
        <Route
          path="/user/update"
          element={
            <>
              <PageTitle title="User View | BTicket Admin" />
              <UpdateUser />
            </>
          }
        />

        <Route
          path="/theater/list"
          element={
            <>
              <PageTitle title="Theater List | BTicket Admin" />
              <TheaterList />
            </>
          }
        />
        <Route
          path="/theater/add"
          element={
            <>
              <PageTitle title="Theater Add | BTicket Admin" />
              <AddTheater />
            </>
          }
        />
        <Route
          path="/theater/update"
          element={
            <>
              <PageTitle title="Theater View | BTicket Admin" />
              <UpdateTheater />
            </>
          }
        />
        <Route
          path="/voucher/list"
          element={
            <>
              <PageTitle title="User List | BTicket Admin" />
              <ListUser />
            </>
          }
        />
        <Route
          path="/voucher/listvoucher"
          element={
            <>
              <PageTitle title="Voucher List | BTicket Admin" />
              <ListVoucher />
            </>
          }
        />
        <Route
          path="/voucher/add"
          element={
            <>
              <PageTitle title="Add voucher | BTicket Admin" />
              <AddVoucher />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
