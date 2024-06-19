import React from 'react'
import './sidebar.css'

// Imported Images ==========>
import logo from '../../Assets/user (3).png'

// imported Icons ===========>
import {IoMdContacts, IoMdSpeedometer} from 'react-icons/io'
import {MdDeliveryDining, MdEventAvailable, MdOutlineHotelClass} from 'react-icons/md'
import {MdOutlineExplore} from 'react-icons/md'
import {BsBookFill, BsPersonGear, BsStars, BsTrophy} from 'react-icons/bs'
import {AiOutlinePieChart} from 'react-icons/ai'
import {BiTrendingUp} from 'react-icons/bi'
import {MdOutlinePermContactCalendar} from 'react-icons/md'
import {BsCreditCard2Front} from 'react-icons/bs'
import {BsQuestionCircle} from 'react-icons/bs'
//import { Link } from '@material-ui/core'
import {Link, Navigate} from 'react-router-dom'
import { FaHotel, FaRegSmileBeam, FaUserShield } from 'react-icons/fa'
import { GrGallery } from 'react-icons/gr'
import { TfiGallery } from 'react-icons/tfi'
import { TbCircleLetterD, TbCircleLetterE } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const userString =localStorage.getItem('user');
  const user=JSON.parse(userString)
  const navigate = useNavigate();
  console.log("current roles",user.roles)
if(user.roles.includes("ROLE_ADMIN")) {
console.log("message","ok")}
else {
console.log("msg","get out")
navigate("/Home");
}

  return (
    <div className='sideBar22 grid'>

      <div className="logoDiv22 flex">
        <img src={logo} alt="Image Name" />
        <h2 className="title22">CAMPUS CONNECT</h2>
      </div>

      <div className="menuDiv22">
        <h3 className="divTitle22">
          QUICK MENU
        </h3>
        <ul className="menuLists22">

          <li className="listItem22">
          <Link to="/admin/body"className='menuLink22 flex'>
                <IoMdSpeedometer className="icon"/>
                <span className="smallText">
                  Dashboard
                </span>
            </Link>
          </li>

          <li className="listItem22">
            <Link to="/admin/destinations" className='menuLink22 flex'>
                <MdOutlineExplore className="icon"/>
                <span className="smallText">
                  Destinations
                </span>
            </Link>
          </li>
          
          <li className="listItem22">
            <Link to="/admin/bloghomes" className='menuLink22 flex'>
                <BsBookFill className="icon"/>
                <span className="smallText">
                  Blogs
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/offres" className='menuLink22 flex'>
                <BsStars className="icon"/>
                <span className="smallText">
                  Offres
                </span>
            </Link>
          </li>

          <li className="listItem22">
            <Link to="/admin/hotels" className='menuLink22 flex'>
                <FaHotel className="icon"/>
                <span className="smallText">
                  Hotels
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/bookings" className='menuLink22 flex'>
                <MdOutlineHotelClass className="icon"/>
                <span className="smallText">
                  Bookings Hotel
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/events" className='menuLink22 flex'>
                <MdEventAvailable className="icon"/>
                <span className="smallText">
                  Events
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/event/gallery" className='menuLink22 flex'>
                <TfiGallery className="icon"/>
                <span className="smallText">
                  Gallerie-Event
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/contacts" className='menuLink22 flex'>
                <IoMdContacts className="icon"/>
                <span className="smallText">
                  Contacts
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/users" className='menuLink22 flex'>
                <FaUserShield className="icon"/>
                <span className="smallText">
                  Users
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/roles" className='menuLink22 flex'>
                <BsPersonGear className="icon"/>
                <span className="smallText">
                  User's Roles
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/formulaireevent" className='menuLink22 flex'>
                <TbCircleLetterE className="icon"/>
                <span className="smallText">
                  Event Reservation
                </span>
            </Link>
          </li>
          <li className="listItem22">
            <Link to="/admin/formulairedest" className='menuLink22 flex'>
                <TbCircleLetterD className="icon"/>
                <span className="smallText">
                  Dest Reservation
                </span>
            </Link>
          </li>
          
          
        </ul>
      </div>

      <div className="sideBar22Card">
        <FaRegSmileBeam className="icon"/>
        <div className="cardContent22">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Coin bonheur</h3>
          <p>Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès. Si vous aimez ce que vous faites, vous réussirez.</p>

          <button className='btn'>Contact Software Eng. 22461046</button>
        </div>
      </div>


      <div className="settingsDiv22">
        <h3 className="divTitle22">
          SETTINGS
        </h3>
        <ul className="menuLists22">

          <li className="listItem22">
            <a href="#" className='menuLink22 flex'>
                <AiOutlinePieChart className="icon"/>
                <span className="smallText">
                  Charts
                </span>
            </a>
          </li>

          
          <li className="listItem22">
            <a href="#" className='menuLink22 flex'>
                <MdOutlinePermContactCalendar className="icon22"/>
                <span className="smallText">
                  Contact
                </span>
            </a>
          </li>

         

        </ul>
      </div>
    </div>
  )
}

export default Sidebar

// import React, { useState } from 'react';
// import './sidebar.css';

// // Imported Images ==========>
// import logo from '../Assets/logo.png';

// // imported Icons ===========>
// import { IoMdSpeedometer } from 'react-icons/io';
// import { MdDeliveryDining } from 'react-icons/md';
// import { MdOutlineExplore } from 'react-icons/md';
// import { BsTrophy } from 'react-icons/bs';
// import { AiOutlinePieChart } from 'react-icons/ai';
// import { BiTrendingUp } from 'react-icons/bi';
// import { MdOutlinePermContactCalendar } from 'react-icons/md';
// import { BsCreditCard2Front } from 'react-icons/bs';
// import { BsQuestionCircle } from 'react-icons/bs';

// const Sidebar = () => {
//   const [selectedMenu, setSelectedMenu] = useState('dashboard');

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="sideBar22 grid">
//       <div className="logoDiv22 flex">
//         <img src={logo} alt="Image Name" />
//         <h2 className="title22">Planti.</h2>
//       </div>

//       <div className="menuDiv22">
//         <h3 className="divTitle22">QUICK MENU</h3>
//         <ul className="menuLists22 grid">
//           <li className="listItem22">
//             {/* <a
//               href="#"
//               className={`menuLink22 flex ${
//                 selectedMenu === 'dashboard' ? 'active' : ''
//               }`}
//               onClick={() => handleMenuClick('dashboard')}
//             >
//               <IoMdSpeedometer className="icon" />
//               <span className="smallText">Dashboard</span>
//             </a> */}
//           </li>

//           <li className="listItem22">
//             <a
//               href="/admin/destinations"
//               className={`menuLink22 flex ${
//                 selectedMenu === 'destination' ? 'active' : ''
//               }`}
//               onClick={() => handleMenuClick('destination')}
//             >
//               <MdDeliveryDining className="icon" />
//               <span className="smallText">Destination</span>
//             </a>
//           </li>

//           <li className="listItem22">
//             <a
//               href="#"
//               className={`menuLink22 flex ${
//                 selectedMenu === 'blog' ? 'active' : ''
//               }`}
//               onClick={() => handleMenuClick('blog')}
//             >
//               <MdOutlineExplore className="icon" />
//               <span className="smallText">Blog</span>
//             </a>
//           </li>

//           <li className="listItem22">
//             <a
//               href="#"
//               className={`menuLink22 flex ${
//                 selectedMenu === 'event' ? 'active' : ''
//               }`}
//               onClick={() => handleMenuClick('event')}
//             >
//               <BsTrophy className="icon" />
//               <span className="smallText">Event</span>
//             </a>
//           </li>
//         </ul>
//       </div>

//       <div className="settingsDiv22">
//         <h3 className="divTitle22">SETTINGS</h3>
//         <ul className="menuLists22 grid">
//           <li className="listItem22">
//             <a href="#" className={`menuLink22 flex`}>
//               <AiOutlinePieChart className="icon" />
//               <span className="smallText">Charts</span>
//             </a>
//           </li>

//           <li className="listItem22">
//             <a href="#" className={`menuLink22 flex`}>
//               <BiTrendingUp className="icon" />
//               <span className="smallText">Trends</span>
//             </a>
//           </li>

//           <li className="listItem22">
//             <a href="#" className={`menuLink22 flex`}>
//               <MdOutlinePermContactCalendar className="icon22" />
//               <span className="smallText">Contact</span>
//             </a>
//           </li>

//           <li className="listItem22">
//             <a href="#" className={`menuLink22 flex`}>
//               <BsCreditCard2Front className="icon" />
//               <span className="smallText">Billing</span>
//             </a>
//           </li>
//         </ul>
//       </div>

//       <div className="sideBar22Card">
//         <BsQuestionCircle className="icon" />
//         <div className="cardContent22">
//           <div className="circle1"></div>
//           <div className="circle2"></div>

//           <h3>Help Center</h3>
//           <p>
//             Having trouble in Planti, please contact us from for more questions.
//           </p>

//           <button className="btn">Go to help center</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
