import { auth } from './index.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Loading, Notify } from 'quasar';
import parseErrorMessage from './firebase-error-msg.js';

const register = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show();
    if (data.first_name != null && data.last_name != null) {
      data.first_name = data.first_name.replace(/\s/g, '');
      data.last_name = data.last_name.replace(/\s/g, '');
    }
    if (
      (data.first_name != '' && data.first_name != null) &
      (data.last_name != '' && data.last_name != null)
    ) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: data.first_name + ' ' + data.last_name,
          }).then(() => {
            // This block will execute after the profile update is completed
            console.log(userCredential.user.displayName);
            Loading.hide();
            resolve(userCredential.user);
          });
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
    } else {
      Loading.hide();
      Notify.create({
        type: 'negative',
        message: 'First Name And Last Name Cannot Be Empty',
      });
    }
  });
};

export default register;
