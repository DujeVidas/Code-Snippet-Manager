export function saveSnippetToLocalStorage(snippet) {
  try {
    const existingSnippets = getSnippetsFromLocalStorage() || [];
    existingSnippets.push(snippet);
    localStorage.setItem('snippets', JSON.stringify(existingSnippets));
    console.log('Snippet saved successfully!');
    getSnippetsFromLocalStorage();
  } catch (error) {
    console.error('Error saving snippet:', error);
    // Handle failure, show an error message, etc.
  }
}

export function getSnippetsFromLocalStorage() {
  try {
    const snippets = JSON.parse(localStorage.getItem('snippets'));
    console.log('Snippets:', snippets);
    // Handle the snippets, e.g., display them in your Vue component
    return snippets;
  } catch (error) {
    console.error('Error getting snippets:', error);
    // Handle error, show an error message, etc.
    return null;
  }
}

export function deleteAllSnippetsFromLocalStorage() {
  localStorage.clear();
}

export function deleteSnippetFromLocalStorage(id) {
  try {
    const existingSnippets = getSnippetsFromLocalStorage() || [];
    const updatedSnippets = existingSnippets.filter(
      (snippet) => snippet.id !== id
    );
    localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
    console.log('Snippet deleted successfully!');
    // Handle success, for example, update the UI to reflect the deleted snippet
  } catch (error) {
    console.error('Error deleting snippet:', error);
    // Handle failure, show an error message, etc.
  }
}
