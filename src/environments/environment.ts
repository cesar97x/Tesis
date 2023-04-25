// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC2VwUNUTQ2aHaDn43FtmLIJaoxFxzgatM",
  authDomain: "apprestaurante-14303.firebaseapp.com",
  projectId: "apprestaurante-14303",
  storageBucket: "apprestaurante-14303.appspot.com",
  messagingSenderId: "133579801081",
  appId: "1:133579801081:web:7d109ec85bd5d8d246fd28",
  measurementId: "G-7CD3Y7DH09"
  },
  
  //URL a donde apunta nuestro backend
  WS_PATH : 'http://165.22.4.127/api/',
  // WS_PATH : 'http://localhost:8000/api/',
  //Token para api externa de rapid api para clasificacion de comentarios 
  TOKEN_RAPIDAPI : 'd980700833msh0394dd0a81c1b3ep1e8b35jsndfee7606666e'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.