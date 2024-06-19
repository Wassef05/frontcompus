import React, { useState } from 'react';
import './parcours.css'; 
import image1 from '../../assets/about.webp';
import image2 from '../../assets/about.webp';
import Back from '../common/back/Back';
const TabContent = ({ tab }) => {
  switch (tab) {
    case 'semestre1':
      return (
        <ul className="content-list">
          <li>Contenu pour Semestre 1 - Sujet 1</li>
          <li>Contenu pour Semestre 1 - Sujet 2</li>
          <li>Contenu pour Semestre 1 - Sujet 2</li>
          {/* ... autres sujets */}
        </ul>
      );
    case 'semestre2':
      return (
        <ul className="content-list">
          <li>Contenu pour Semestre 2 - Sujet 1</li>
          <li>Contenu pour Semestre 2 - Sujet 2</li>
          {/* ... autres sujets */}
        </ul>
      );
    case 'semestre3':
      return (
        <ul className="content-list">
          <li>Contenu pour Semestre 3 - Sujet 1</li>
          <li>Contenu pour Semestre 3 - Sujet 2</li>
          {/* ... autres sujets */}
        </ul>
      );
    case 'semestre4':
      return (
        <ul className="content-list">
          <li>Contenu pour Semestre 4 - Sujet 1</li>
          <li>Contenu pour Semestre 4 - Sujet 2</li>
          {/* ... autres sujets */}
        </ul>
      );
    default:
      return null;
  }
};
const ParcoursUniv = () => {
  const [activeTab, setActiveTab] = useState('semestre1');



  return (
    <>
      <Back title='PARCOURS' />
      <div className="parcours-univ-container">
        <div className="header-content">
          <div className="header-line"></div>
          <span className="header-title" >PRÉPARATOIRE ICCS</span>
          <div className="header-dot"></div>
        </div>

        <div className="content-section">
          <div className="text-content">
          <strong>
            <p>
              Le cycle préparatoire intégré ICCS (Ingénierie de Construction, des Composants et des Systèmes) est ouvert à l’ensemble des bacheliers de sections scientifiques :
            </p>
            <ul  className="specialities-list" >
              <li>Mathématiques</li>
              <li>Sciences Techniques</li>
              <li>Sciences Expérimentales</li>
              <li>Sciences Informatiques</li>
            </ul>
            <p>
              L’admission au CPI se fait par voie de concours (sur dossier et/ou test) avec entretien de motivation.
               Les candidats doivent justifier de bonnes notes au Bac et en Classe Terminale.
            </p>
            </strong>
            <p>
            Les candidats doivent justifier de bonnes notes au Bac et en Classe Terminale.  Ce cycle dure deux ans et permet aux bacheliers d’accéder à l’une des spécialités proposées par EPI-Polytechnique. Le passage se fait sur la base du contrôle continu.
            </p>
          </div>
          <img src={image1} alt="Description" className="content-image" />
        </div>

        <div className="content-section">
          <img src={image2} alt="Description" className="content-image" />
          <div className="text-content">
            <p>La préparation dans le parcours ICCS se fait en une première année commune à tous les étudiants et une deuxième année de pré-orientation où des dominantes sont prévues en fonction des spécialités offertes à EPI-Polytechnique : Electrique, Electromécanique, Civil et Industriel.
              Le contenu des enseignements et les méthodes pédagogiques du CPI permettent aux étudiants de développer progressivement et sereinement des compétences dans un environnement d’une Ecole d’Ingénieurs..
              </p>
              <p className="additional-info">
                <strong>Pour plus d’informations, contacter <span className="contact-name">M. MBAREK MOKHLES</span>.</strong>
                </p>
          </div>
        </div>
        <div className="header-content">
          <div className="header-line"></div>
          <span className="header-title" > PLAN D'ÉTUDE </span>
          <div className="header-dot"></div>
        </div>

        <div className="plan-etudes">
          <div className="tab-titles">
          <button className={activeTab === 'semestre1' ? 'active' : ''} onClick={() => setActiveTab('semestre1')}>Semestre 1</button>
            <button className={activeTab === 'semestre2' ? 'active' : ''} onClick={() => setActiveTab('semestre2')}>Semestre 2</button>
            <button className={activeTab === 'semestre3' ? 'active' : ''} onClick={() => setActiveTab('semestre3')}>Semestre 3</button>
            <button className={activeTab === 'semestre4' ? 'active' : ''} onClick={() => setActiveTab('semestre4')}>Semestre 4</button>
          </div>
          <div className="tab-content">
            <TabContent tab={activeTab} />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ParcoursUniv;
