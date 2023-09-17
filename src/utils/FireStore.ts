import {FirebaseApp, initializeApp} from "firebase/app";
import {Firestore, getFirestore} from "@firebase/firestore";

export default class FireStore {

    readonly app: FirebaseApp
    readonly db: Firestore;

    readonly collectionName: string
    readonly documentName: string

    constructor(collectionName: string, documentName: string) {
        const firebaseConfig = {
            apiKey: "AIzaSyDSG-p2OHzjDqVGc60iJg5CXyaYNxC43nE",
            authDomain: "kutils-30e05.firebaseapp.com",
            projectId: "kutils-30e05",
            storageBucket: "kutils-30e05.appspot.com",
            messagingSenderId: "765903953089",
            appId: "1:765903953089:web:eefcc431060d3a8ab28840",
            measurementId: "G-PY136B72GT"
        };

        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);

        this.collectionName = collectionName;
        this.documentName = documentName;
    }
}
