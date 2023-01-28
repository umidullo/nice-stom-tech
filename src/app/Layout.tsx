import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '~/components/Header/Header';
import Navbar from '~/components/Navbar/Navbar';
const Layout = () => {
  return (
    <>
      <div className="w-screen h-screen flex bg-slate-50">
        <Navbar />
        <div className="flex flex-1 flex-col h-full">
          <Header />
          <main className="p-3 flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Layout;
