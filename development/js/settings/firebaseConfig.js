import * as firebase from 'firebase/app';
import 'firebase/auth';

    const app = firebase.initializeApp(   {
        apiKey: "AIzaSyB1AKyiDEDijcQy9-bsBSBEGhEE-pc7o24",
        authDomain: "kulturka-9951a.firebaseapp.com",
        databaseURL: "https://kulturka-9951a.firebaseio.com",
        projectId: "kulturka-9951a",
        storageBucket: "kulturka-9951a.appspot.com",
        messagingSenderId: "533026299137",
        appId: "1:533026299137:web:4075bdaa7c55937c6f4f00",
        measurementId: "G-WF8SLDBWNL"
    });
   export default app;
