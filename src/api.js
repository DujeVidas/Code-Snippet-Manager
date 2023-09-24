export function saveSnippetToLocalStorage(snippet) {
  try {
    const existingSnippets = getSnippetsFromLocalStorage() || [];
    existingSnippets.push(snippet);
    localStorage.setItem('snippets', JSON.stringify(existingSnippets));
    console.log('Snippet saved successfully!');
    getSnippetsFromLocalStorage();
  } catch (error) {
    console.error('Error saving snippet:', error);
  }
}

export function getSnippetsFromLocalStorage() {
  try {
    const snippets = JSON.parse(localStorage.getItem('snippets'));
    console.log('Snippets:', snippets);
    return snippets;
  } catch (error) {
    console.error('Error getting snippets:', error);
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
  } catch (error) {
    console.error('Error deleting snippet:', error);
  }
}
