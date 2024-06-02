import { storedObjects } from "../localStorageHelper.js";
import { dateHeader, showSearchedJournals } from "../script.js";

/**
 * handles the case when the user presses the search button or the form is submitted
 * @param {SubmitEvent} e
 */
export const handleSearchSubmit = (e) => {
  e.preventDefault();
  let searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const searchedJournals = search(searchTerm);
  dateHeader.textContent = 'Journal results for "' + searchTerm + '"';
  showSearchedJournals(searchedJournals);
};

/**
 *
 * @param searchTerm
 * @return journal[]
 */
export const search = (searchTerm) => {
  return storedObjects.journals.filter(function (journal) {
    return journal.title.toLowerCase().includes(searchTerm) || journal.description.toLowerCase().includes(searchTerm);
  });
};
