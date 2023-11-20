import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LocalStorage } from 'quasar';

const firebaseConfig = {
  apiKey: 'AIzaSyDAZHK1bF8fsQM6hzKoACVFuY1y_G5aE0E',

  authDomain: 'codesnippetmanager-d5862.firebaseapp.com',

  projectId: 'codesnippetmanager-d5862',

  storageBucket: 'codesnippetmanager-d5862.appspot.com',

  messagingSenderId: '164352528273',

  appId: '1:164352528273:web:699006d59793e4941a1430',

  measurementId: 'G-ES9ST0K81D',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set('user', user);
  } else {
    LocalStorage.remove('user');
  }
});
