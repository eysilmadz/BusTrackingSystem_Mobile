import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDWtAD6mRV8TYm4x4IrdDrjjL2751VkpAc",
  authDomain: "rotadurak-ac8f8.firebaseapp.com",
  projectId: "rotadurak-ac8f8",
  storageBucket: "rotadurak-ac8f8.firebasestorage.app",
  messagingSenderId: "338123072195",
  appId: "1:338123072195:android:c5517b6c7dde45bd71b876",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

console.log("auth:", auth); // auth nesnesini kontrol et
console.log("db:", db); 

export { auth, app, db };
