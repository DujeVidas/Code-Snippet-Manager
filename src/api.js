import { db } from 'src/firebase/index';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  where,
  query,
  deleteDoc,
} from 'firebase/firestore';

export async function getSnippetsFirebase(userId) {
  try {
    const userSnippetsRef = collection(db, `users/${userId}/snippets`);
    const userSnippetsSnapshot = await getDocs(userSnippetsRef);
    const snippetsDataArray = [];

    if (!userSnippetsSnapshot.empty) {
      userSnippetsSnapshot.forEach((doc) => {
        snippetsDataArray.push(doc.data());
      });
      return snippetsDataArray;
    } else {
      console.log('No snippets found for this user');
    }
  } catch (error) {
    console.error('Error fetching snippets:', error);
  }
}

export async function saveSnippetFirebase(userId, snippet) {
  const userSnippetsCollection = collection(db, `users/${userId}/snippets`);

  try {
    const userSnippetsSnapshot = await getDocs(userSnippetsCollection);

    if (!userSnippetsSnapshot.empty) {
      console.log('Subcollection already exists for user:', userId);
    } else {
      console.log('Subcollection does not exist for user:', userId);
      console.log('Subcollection created for user:', userId);
    }

    const snippetDocRef = doc(userSnippetsCollection, snippet.id);

    await setDoc(snippetDocRef, snippet);
    //getSnippetsFirebase();
    console.log('Snippet added to subcollection for user:', userId);
  } catch (error) {
    console.error('Error adding snippet to subcollection:', error);
  }
}

export async function deleteSnippetFirebase(userId, snippetId) {
  try {
    const userSnippetsCollection = collection(db, `users/${userId}/snippets`);

    const q = query(userSnippetsCollection, where('id', '==', snippetId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log('Snippet deleted:', doc.id);
    });
  } catch (error) {
    console.error('Error deleting snippets by content:', error);
  }
}

export async function deleteAllSnippetsFirebase(userId) {
  const userSnippetsCollection = collection(db, `users/${userId}/snippets`);

  try {
    const querySnapshot = await getDocs(userSnippetsCollection);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log('Snippet deleted:', doc.id);
    });
    console.log('All snippets deleted for user:', userId);
  } catch (error) {
    console.error('Error deleting snippets:', error);
  }
}
