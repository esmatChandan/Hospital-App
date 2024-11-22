import { useContext, useEffect, useRef } from "react";
import logo from "../../assets/images/logo_3.png";
import { NavLink, Link } from "react-router-dom";
import userImg from "../../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
    {
        path: "/home",
        display: "Home",
    },
    {
        path: "/doctors",
        display: "Find a Doctor",
    },
    {
        path: "/services",
        display: "Services",
    },
    {
        path: "/contact",
        display: "Contact",
    },
    
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const { user, role,token } = useContext(authContext);
    
   
    
    

    const heandalStickyHeader = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                headerRef.current.classList.add("sticky_header");
            } else {
                headerRef?.current?.classList?.remove("sticky_header");
            }
        });
    };
    useEffect(() => {
        heandalStickyHeader();

        return () => window.removeEventListener("scroll", heandalStickyHeader);
    });
    const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

    // const handleStickyHeader = () => {
    //   const headerElement = headerRef.current;
    //   if (headerElement) {
    //     if (headerElement.offsetTop < window.scrollY) {
    //       headerElement.classList.add("sticky_header");
    //     } else {
    //       headerElement.classList.remove("sticky_header");
    //     }
    //   }
    // };

    // useEffect(() => {
    //   headerRef.current.addEventListener("scroll", handleStickyHeader);

    //   return () => headerRef.current.removeEventListener("scroll", handleStickyHeader);
    // }, [headerRef]);

    return (
        <header ref={headerRef} className="header flex items-center">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <img src={logo} alt="logo" />
                    </div>

                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul ref={menuRef} className="manu flex items-center gap-[2.7rem]">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={(navclass) =>
                                            navclass.isActive
                                                ? "text-primaryColor text-[16px] leading-7 font-[600]"
                                                : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                                        }
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* {}================nav right =================== */}

                    <div className="flex items-center gap-4">

                        {
                            token && user ? <div >
                            <Link to={`${role === 'doctor' ? '/doctor/profile/me' : '/users/profile/me'}`}>
                                <figure className="w-[35px]  h-[35px] rounded-full cursor-pointer ">
                                    <img src={user?.photo} className="w-full rounded-full" alt="" />
                                </figure>
                            </Link>  
                            </div>  : <Link to="/login">
                       
                        <button className="bg-primaryColor py-3 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[5px] hover:bg-gray-500">
                            Login
                        </button>
                        </Link>
                        }
                        <h2 className="items-center justify-center flex">{user?.name}</h2>
                        
                    </div>
                   
                    

                    <span className="md:hidden" onClick={toggleMenu}>
                        <BiMenu className="w-6 h-6 cursor-pointer" />
                    </span>
                </div>
            </div>
        </header>
    );
};
export default Header;
