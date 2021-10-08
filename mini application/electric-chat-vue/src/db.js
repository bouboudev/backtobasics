
import firebase from "firebase/app";
import "firebase/database";


const config = {

apiKey: "process.env.CONFIGAPIKEY",
authDomain: "process.env.CONFIGDOMAIN",
databaseURL: "https://electricvuechat-default-rtdb.firebaseio.com",
projectId: "process.env.CONFIPROJECTID",
storageBucket: "process.env.CONFIGBUCKET",
messagingSenderId: "process.env.CONFIGMESSAGING",
appId: "process.env.CONFIGAPIID"
}

const db  = firebase.initializeApp(config);
export default db;

