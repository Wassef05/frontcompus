// import { createStore, applyMiddleware, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// import { reclamationReducer } from "./reducers/reclamation.reducer";
// import { attestationReducer } from './reducers/attestation.reducer';
// import { noteReducer } from './reducers/note.reducer';
// import { coursReducer } from './reducers/cours.reducer';
// import { formulaireStageReducer } from './reducers/formulairestage.reducer';
// import { notificationReducer } from './reducers/notification.reducer';
// import { certifReducer } from "./reducers/certif.reducer";
// import { eventReducer } from "./reducers/event.reducer";
// import { priceReducer } from "./reducers/pricing.reducer";
// import { rattrapageReducer } from "./reducers/rattrapage.reducer";
// import { emploiReducer } from "./reducers/emploi.reducer";
// import { classeReducer } from "./reducers/classe.reducer";
// import { noteInfoReducer } from "./reducers/noteinfo.reducer";
// import { annonceReducer } from "./reducers/annonce.reducer";

// import { testReducer } from './reducers/test.reducer';
// import { projetReducer } from './reducers/projet.scol.reducer';
// import { impressionProfReducer } from './reducers/impression.prof.reducer';
// import { materielProfReducer } from './reducers/materiel.prof.reducer';
// import { contactProfReducer } from './reducers/contact.prof.reducer';
// import auth from "./reducers/auth";
// import message from "./reducers/message";

// const reducer = combineReducers({
//     attestation: attestationReducer,
//     note: noteReducer,
//     cours: coursReducer,
//     formulaireStage: formulaireStageReducer,
//     reclamation: reclamationReducer,
//     notification: notificationReducer,
//     certif: certifReducer,
//     annonce: annonceReducer,
//     event: eventReducer,
//     price: priceReducer,
//     rattrapage: rattrapageReducer,
//     emploi: emploiReducer,
//     classe: classeReducer,
//     noteInfo: noteInfoReducer,
//     test: testReducer,
//     projet: projetReducer,
//     impressionProf: impressionProfReducer,
//     materielProf: materielProfReducer,
//     contactProf: contactProfReducer,
//     auth: auth,
//     message: message,
//     ...rootReducer,
// });

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;


import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { messageReducer } from './reducers/message.reducer';
import authReducer from './reducers/auth'; // Votre reducer d'authentification

import { reclamationReducer } from './reducers/reclamation.reducer';
import { attestationReducer } from './reducers/attestation.reducer';
import { noteReducer } from './reducers/note.reducer';
import { coursReducer } from './reducers/cours.reducer';
import { commentairesReducer } from './reducers/commentaire.reducer';
import { formulaireStageReducer } from './reducers/formulairestage.reducer';
import { notificationReducer } from './reducers/notification.reducer';
import { certifReducer } from './reducers/certif.reducer';
import { eventReducer } from './reducers/event.reducer';
import { priceReducer } from './reducers/pricing.reducer';
import { rattrapageReducer } from './reducers/rattrapage.reducer';
import { emploiReducer } from './reducers/emploi.reducer';
import { classeReducer } from './reducers/classe.reducer';
import { noteInfoReducer } from './reducers/noteinfo.reducer';
import { annonceReducer } from './reducers/annonce.reducer';
import { testReducer } from './reducers/test.reducer';
import { projetReducer } from './reducers/projet.scol.reducer';
import { impressionProfReducer } from './reducers/impression.prof.reducer';
import { materielProfReducer } from './reducers/materiel.prof.reducer';
import { contactProfReducer } from './reducers/contact.prof.reducer';
import { userReducer } from './reducers/user.reducer';

const rootReducer = combineReducers({
  attestation: attestationReducer,
  note: noteReducer,
  cours: coursReducer,
  commentaires:commentairesReducer,
  formulaireStage: formulaireStageReducer,
  reclamation: reclamationReducer,
  notification: notificationReducer,
  certif: certifReducer,
  annonce: annonceReducer,
  event: eventReducer,
  price: priceReducer,
  rattrapage: rattrapageReducer,
  emploi: emploiReducer,
  classe: classeReducer,
  noteInfo: noteInfoReducer,
  test: testReducer,
  projet: projetReducer,
  impressionProf: impressionProfReducer,
  materielProf: materielProfReducer,
  contactProf: contactProfReducer,
  message: messageReducer,
  auth:authReducer,
  user: userReducer,

});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
