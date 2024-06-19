import React from 'react'
import './Admindash2.css'
import Sidebar from '../SIDESECTION/SideBar Section/Sidebar'
import Body from  '../BODYSECTION/Body Section/Body'




const Admindash2 = () => {
  return (
    <div
     className='admindash2' >
     <Sidebar/>
     {/* <SideBar/> */}

     <Body/>
     {/* <DestinationsList/> */}
    </div>
  )
}


export default Admindash2

// import React, { useState } from 'react';
// import Sidebar from '../SideBar Section/Sidebar'
// import Body from  '../Body Section/Body'
// import DestinationsList from '../../Admins/Destination/DestinationsList';
// import BloghomesList from '../../Admins/Bloghome/BloghomesList';
// import EventsList from '../../Admins/Eventt/EventsList';

// function AdminDashboard() {
//   const [selectedMenu, setSelectedMenu] = useState('body');

//   let content;
//   if (selectedMenu === 'body') {
//     content = <Body />;
//   } else if (selectedMenu === 'destination') {
//     content = <DestinationsList />;
//   } else if (selectedMenu === 'blog') {
//     content = <BloghomesList />;
//   } else if (selectedMenu === 'event') {
//     content = <EventsList />;
//   }

//   return (
//     <div className="dashboard">
//       <div className="sidebarr">
//         <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
//       </div>
//       <div className="content">
//         {content}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

///test3


// import React, { useState } from 'react';
// import './Admindash2.css';
// import Sidebar from '../SideBar Section/Sidebar';
// import Body from '../Body Section/Body';
// import DestinationsList from '../../Admins/Destination/DestinationsList';
// import BloghomesList from '../../Admins/Bloghome/BloghomesList';

// const Admindash2 = () => {
//   const [showDestinationsList, setShowDestinationsList] = useState(false);
//   const [showBloghomesList, setShowBloghomesList] = useState(false);

//   const handleDestinationClick = () => {
//     setShowDestinationsList(true);
//     setShowBloghomesList(false); // Reset showBloghomesList state when clicking on Destination
//   };

//   const handleBlogClick = () => {
//     setShowBloghomesList(true);
//     setShowDestinationsList(false); // Reset showDestinationsList state when clicking on Blog
//   };

//   return (
//     <div className='admindash2'>
//       <Sidebar
//         onDestinationClick={handleDestinationClick}
//         onBlogClick={handleBlogClick}
//       />
//       {/* <Body /> */}
//       {showDestinationsList && <DestinationsList />}
//       {showBloghomesList && <BloghomesList />}
//     </div>
//   );
// };

// export default Admindash2;



