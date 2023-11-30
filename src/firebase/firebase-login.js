import { auth } from './index.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Loading, Notify } from 'quasar';
import parseErrorMessage from './firebase-error-msg.js';

const login = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        Loading.hide();
        resolve(userCredential.user);
      })
      .catch((err) => {
        err = parseErrorMessage(err);
        Loading.hide();
        Notify.create({
          type: 'negative',
          message: err.message,
        });
        reject(err.message);
      });
  });
};

export default login;
