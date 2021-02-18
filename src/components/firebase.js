import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';      
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyAfwj5boccZpUtV4g86XlgGM8WSGGSfk9g",
    authDomain: "iot-final-8d408.firebaseapp.com",
    databaseURL: "https://iot-final-8d408-default-rtdb.firebaseio.com",
    projectId: "iot-final-8d408",
    storageBucket: "iot-final-8d408.appspot.com",
    messagingSenderId: "579505432097",
    appId: "1:579505432097:web:d22ee21aff0812fc2fe560",
    measurementId: "G-H5QKD1930Q"
  };
firebase.initializeApp(config);

export default firebase;