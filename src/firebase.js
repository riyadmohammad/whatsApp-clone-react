import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCvi4CNYac0coZ_VvtUU2k4rO8UUY7BU7k",
    authDomain: "what-s-app-clone-d29fb.firebaseapp.com",
    databaseURL: "https://what-s-app-clone-d29fb.firebaseio.com",
    projectId: "what-s-app-clone-d29fb",
    storageBucket: "what-s-app-clone-d29fb.appspot.com",
    messagingSenderId: "650131945668",
    appId: "1:650131945668:web:227d22d0ccdb217d773191",
    measurementId: "G-3D0LB0N1KG"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;