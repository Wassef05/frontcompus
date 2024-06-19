import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EventBus from '../../../common/EventBus';
import { IoIosNotifications } from 'react-icons/io';
import { getNotificationCount, resetNotificationCount } from '../../../actions/notification.actions';
import Heading from '../../common/heading/Heading';
import { onLine } from './dummydata.js';
import "./boardscol.css"
import NotificationsListModal from './Notification/Listnotification.js';
import CertifFormDialog from './Certifs/Newcertif'; // Ajustez le chemin si nécessaire
import CertifsListModal from './Certifs/Listcertif'; // Ajustez le chemin si nécessaire
import NewEventDialog from './Events/Newevent'; // Ajustez le chemin si nécessaire
import EventsListModal from './Events/Listevent'; 

import TestFormDialog from './Tests/Newtest'
import TestsListModal from './Tests/Listtest'; 

import ProjetFormDialog from './Projets/Newprojet'
import ProjetsListModal from './Projets/Listprojet'; 

import PriceFormDialog from './Pricing/Newprice.js'
import PricesListModal from './Pricing/Listprice.js'

import ImpressionProfsListModal from './Impression/Listimpression';
import MaterielProfsListModal from './Materiel/Listmateriel';

import NewAnnonceDialog from './Annonces/Newannonce'
import AnnoncesListModal from './Annonces/Listannonce.js'; // Ajustez le chemin si nécessaire
import { Menu, MenuItem } from '@mui/material';
import EmploiFormDialog from './Emploi/Newemploi.js';
import EmploisListModal from './Emploi/Listemploi.js'; // Assurez-vous que le chemin d'importation est correct
import Header from '../../common/header/Header.jsx';


const ScolDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
    
    const [isNewCertifOpen, setIsNewCertifOpen] = useState(false);
    const [isCertifsListOpen, setIsCertifsListOpen] = useState(false);
    const [certifMenuAnchorEl, setCertifMenuAnchorEl] = useState(null);

    const [eventMenuAnchorEl, setEventMenuAnchorEl] = useState(null);
    const [isNewEventOpen, setIsNewEventOpen] = useState(false);
    const [isEventsListOpen, setIsEventsListOpen] = useState(false);

    const [annonceMenuAnchorEl, setAnnonceMenuAnchorEl] = useState(null);
    const [isNewAnnonceOpen, setIsNewAnnonceOpen] = useState(false);
    const [isAnnoncesListOpen, setIsAnnoncesListOpen] = useState(false);


    const [isNewEmploiOpen, setIsNewEmploiOpen] = useState(false);
    const [isEmploisListOpen, setIsEmploisListOpen] = useState(false);
    const [emploiMenuAnchorEl, setEmploiMenuAnchorEl] = useState(null);

    const [isNewTestOpen, setIsNewTestOpen] = useState(false);
    const [isTestsListOpen, setIsTestsListOpen] = useState(false);
    const [testMenuAnchorEl, setTestMenuAnchorEl] = useState(null);

    const [isNewProjetOpen, setIsNewProjetOpen] = useState(false);
    const [isProjetsListOpen, setIsProjetsListOpen] = useState(false);
    const [projetMenuAnchorEl, setProjetMenuAnchorEl] = useState(null);

    const [isNewPriceOpen, setIsNewPriceOpen] = useState(false);
    const [isPricesListOpen, setIsPricesListOpen] = useState(false);
    const [pricingMenuAnchorEl, setPricingMenuAnchorEl] = useState(null);

  
    const [isMaterielProfsListOpen, setMaterielProfsListOpen] = useState(false);
    const [MaterielprofmenuAnchorEl, setMaterielProfMenuAnchorEl] = useState(null);
    
   
    const handleOpenMaterielProfsList = () => { setMaterielProfsListOpen(true); handleCloseMaterielProfMenu(); }; 
    const handleCloseMaterielProfsList = () => setMaterielProfsListOpen(false);
    const handleMaterielProfMenuClick = (event) => setMaterielProfMenuAnchorEl(event.currentTarget);
    const handleCloseMaterielProfMenu = () => setMaterielProfMenuAnchorEl(null);

 
  const [isImpressionProfsListOpen, setImpressionProfsListOpen] = useState(false);
  const [impressionprofmenuAnchorEl, setImpressionProfMenuAnchorEl] = useState(null);
  

  const handleOpenImpressionProfsList = () => { setImpressionProfsListOpen(true); handleCloseImpressionProfMenu(); }; 
  const handleCloseImpressionProfsList = () => setImpressionProfsListOpen(false);
  const handleImpressionProfMenuClick = (event) => setImpressionProfMenuAnchorEl(event.currentTarget);
  const handleCloseImpressionProfMenu = () => setImpressionProfMenuAnchorEl(null);


    useEffect(() => {
        dispatch(getNotificationCount());
        const intervalId = setInterval(() => dispatch(getNotificationCount()), 30000);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const notificationCount = useSelector(state => state.notification.notificationCount);

    const handleNotificationClick = () => {
        setIsNotificationsModalOpen(true);
        dispatch(resetNotificationCount());
    };

    const handleCloseNotificationsModal = () => {
        setIsNotificationsModalOpen(false);
    };

    const handleLogout = () => {
        EventBus.dispatch('logout');
        navigate('/login');
    };

    // Handlers pour les menus séparés
    const handleOpenCertifMenu = (event) => {
        setCertifMenuAnchorEl(event.currentTarget);
        setEventMenuAnchorEl(null); 
        setAnnonceMenuAnchorEl(null); 
    };

    const handleOpenEventMenu = (event) => {
        setEventMenuAnchorEl(event.currentTarget);
        setCertifMenuAnchorEl(null);
        setAnnonceMenuAnchorEl(null);  
    };

    const handleOpenAnnonceMenu = (event) => {
      setAnnonceMenuAnchorEl(event.currentTarget);
      setCertifMenuAnchorEl(null);
      setEventMenuAnchorEl(null); 
  };


  const handleOpenTestMenu = (event) => {
    setTestMenuAnchorEl(event.currentTarget);
    setCertifMenuAnchorEl(null);
    setEventMenuAnchorEl(null); // Assurez-vous de fermer l'autre menu
};

        const handleOpenProjetMenu = (event) => {
          setProjetMenuAnchorEl(event.currentTarget);
          setCertifMenuAnchorEl(null);
          setEventMenuAnchorEl(null); // Assurez-vous de fermer l'autre menu
        };



    const handleOpenEmploiMenu = (event) => {
      setEmploiMenuAnchorEl(event.currentTarget);
  };
  const handleOpenPricingMenu = (event) => {
    setPricingMenuAnchorEl(event.currentTarget);
};


    const handleCloseMenus = () => {
        setCertifMenuAnchorEl(null);
        setEventMenuAnchorEl(null);
        setAnnonceMenuAnchorEl(null);
        setEmploiMenuAnchorEl(null);
        setTestMenuAnchorEl(null);
        setProjetMenuAnchorEl(null);
        setPricingMenuAnchorEl(null);
    };

    const cardClickHandlers = {
        "CERTIFS": handleOpenCertifMenu,
        "LOISIRS": handleOpenEventMenu,
        "PLANNING" : handleOpenEmploiMenu,
        "ANNONCES" : handleOpenAnnonceMenu,
        "STAGES": handleOpenTestMenu,
        "PROJETS": handleOpenProjetMenu,
        "PRICING":handleOpenPricingMenu,
        "MATERIEL": handleMaterielProfMenuClick,
        "IMPRESSION" : handleImpressionProfMenuClick,
    };

    return (
      <section className='heroscol'>
        <Header/>
      <div className="admin-dashboard" style={{ paddingTop: '20rem' }}>
        <h1>Scolarite Dashboard</h1>
        <div className="header-right">
          <div className="notification-icon" onClick={handleNotificationClick}>
            <IoIosNotifications size={29} />
            <span className={`notification-count ${notificationCount === 0 ? 'zero' : ''}`}>
              {notificationCount}
            </span>
          </div>
          <button onClick={handleLogout} className="btn btn-primary btn-block">Déconnexion</button>
        </div>

        <section className='online'>
          <div className='container'>
            <Heading subtitle='WELCOME' title='Browse Your Services' />
            <div className='content grid3'>
              {onLine.map((val) => (
                <div className='box' onClick={(e) => cardClickHandlers[val.courseName]?.(e)}>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <img src={val.hoverCover} alt='' className='show' />
                  </div>
                  <h1>{val.courseName}</h1>
                  <span>{val.course}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


       
      <MaterielProfsListModal open={isMaterielProfsListOpen} onClose={handleCloseMaterielProfsList} />
      <Menu anchorEl={MaterielprofmenuAnchorEl} open={Boolean(MaterielprofmenuAnchorEl)} onClose={handleCloseMaterielProfMenu}>
       
        <MenuItem onClick={handleOpenMaterielProfsList}>List's MaterielProfs</MenuItem>
      </Menu>

     
      <ImpressionProfsListModal open={isImpressionProfsListOpen} onClose={handleCloseImpressionProfsList} />
      <Menu anchorEl={impressionprofmenuAnchorEl} open={Boolean(impressionprofmenuAnchorEl)} onClose={handleCloseImpressionProfMenu}>
      
        <MenuItem onClick={handleOpenImpressionProfsList}>List's ImpressionProfs</MenuItem>
      </Menu>


        <Menu anchorEl={certifMenuAnchorEl} open={Boolean(certifMenuAnchorEl)} onClose={handleCloseMenus}>
                <MenuItem onClick={() => setIsNewCertifOpen(true)}>Nouvelle Certification</MenuItem>
                <MenuItem onClick={() => setIsCertifsListOpen(true)}>Liste des Certifications</MenuItem>
            </Menu>

            <Menu anchorEl={eventMenuAnchorEl} open={Boolean(eventMenuAnchorEl)} onClose={handleCloseMenus}>
                <MenuItem onClick={() => setIsNewEventOpen(true)}>Nouvel Événement</MenuItem>
                <MenuItem onClick={() => setIsEventsListOpen(true)}>Liste des Événements</MenuItem>
            </Menu>

            <Menu anchorEl={annonceMenuAnchorEl} open={Boolean(annonceMenuAnchorEl)} onClose={handleCloseMenus}>
                <MenuItem onClick={() => setIsNewAnnonceOpen(true)}>Nouvel Annonce</MenuItem>
                <MenuItem onClick={() => setIsAnnoncesListOpen(true)}>Liste Annonce</MenuItem>
            </Menu>

            <Menu anchorEl={testMenuAnchorEl} open={Boolean(testMenuAnchorEl)} onClose={handleCloseMenus}>
                <MenuItem onClick={() => setIsNewTestOpen(true)}>Nouvel Stage</MenuItem>
                <MenuItem onClick={() => setIsTestsListOpen(true)}>Liste des forumlaires Stage</MenuItem>
              
            </Menu>

            <Menu anchorEl={projetMenuAnchorEl} open={Boolean(projetMenuAnchorEl)} onClose={handleCloseMenus}>
                <MenuItem onClick={() => setIsNewProjetOpen(true)}>Nouvel Projet</MenuItem>
                <MenuItem onClick={() => setIsProjetsListOpen(true)}>Liste des forumlaires Projet</MenuItem>
              
            </Menu>

            <Menu anchorEl={pricingMenuAnchorEl} open={Boolean(pricingMenuAnchorEl)} onClose={handleCloseMenus}>
                <MenuItem onClick={() => setIsNewPriceOpen(true)}>Nouvel Price</MenuItem>
                <MenuItem onClick={() => setIsPricesListOpen(true)}>Liste des Prices</MenuItem>
              
            </Menu>





            <Menu anchorEl={emploiMenuAnchorEl} open={Boolean(emploiMenuAnchorEl)} onClose={handleCloseMenus}>
                  <MenuItem onClick={() => {
                    setIsNewEmploiOpen(true); 
                    handleCloseMenus(); // Ferme le menu après la sélection
                  }}>Nouvel Emploi</MenuItem>
                  <MenuItem onClick={() => {
                    setIsEmploisListOpen(true); 
                    handleCloseMenus(); // Ferme le menu après la sélection
                  }}>Liste des Emplois</MenuItem>
             </Menu>

            {/* Dialogues pour CERTIFS et ÉVÉNEMENTS */}
            <CertifFormDialog open={isNewCertifOpen} onClose={() => setIsNewCertifOpen(false)} />
            <CertifsListModal open={isCertifsListOpen} onClose={() => setIsCertifsListOpen(false)} />

            <EmploiFormDialog open={isNewEmploiOpen} onClose={() => setIsNewEmploiOpen(false)} />
            <EmploisListModal open={isEmploisListOpen} onClose={() => setIsEmploisListOpen(false)} />

            <EventsListModal open={isEventsListOpen} onClose={() => setIsEventsListOpen(false)} />
            <NewEventDialog open={isNewEventOpen} onClose={() => setIsNewEventOpen(false)} />

            <AnnoncesListModal open={isAnnoncesListOpen} onClose={() => setIsAnnoncesListOpen(false)} />
            <NewAnnonceDialog open={isNewAnnonceOpen} onClose={() => setIsNewAnnonceOpen(false)} />


            <TestsListModal open={isTestsListOpen} onClose={() => setIsTestsListOpen(false)} />
            <TestFormDialog open={isNewTestOpen} onClose={() => setIsNewTestOpen(false)} />

            <ProjetsListModal open={isProjetsListOpen} onClose={() => setIsProjetsListOpen(false)} />
            <ProjetFormDialog open={isNewProjetOpen} onClose={() => setIsNewProjetOpen(false)} />

            <PricesListModal open={isPricesListOpen} onClose={() => setIsPricesListOpen(false)} />
            <PriceFormDialog open={isNewPriceOpen} onClose={() => setIsNewPriceOpen(false)} />

        <NotificationsListModal open={isNotificationsModalOpen} onClose={handleCloseNotificationsModal} />
      </div>
      </section>
    );
};
  
export default ScolDashboard;
