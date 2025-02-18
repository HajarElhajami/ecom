
import img10 from "../Image/10.png";
import { Link } from "react-router-dom";



function Header() {
  return (
    <header className="bg-yellow-100 flex items-center justify-between  md:justify-center gap-[20%] flex-row-reverse">
         <div>
          <img src={img10} alt="Logo" className="w-[120px]" />
        </div>
        
    <nav className="flex items-center font-bold text-[17px] space-x-8 text-yellow-800">
       <Link className="hover:underline hover:text-gray-700" to="/ContactUs">اتصل بنا</Link>
       <Link className="hover:underline hover:text-gray-700" to="/Products">المنتجات</Link>
       <Link className="hover:underline hover:text-gray-700" to="/Classifications">التصنيفات</Link>
       <Link className="hover:underline hover:text-gray-700" to="/">الصفحة الرئيسية</Link>
    </nav>

    </header>
  );
}

export default Header;
