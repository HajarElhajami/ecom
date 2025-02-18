
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';


function Layoute() {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  );
}

export default Layoute;
