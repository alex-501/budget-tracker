let db;
const request = indexedDB.open('budget', 1);
//request
//define request- createObjextStore
//errlog
//post/upload i guess
request.onupgradeneeded = function(event) {
  const db = event.target.result;

  db.createObjectStore('new_budget', { autoIncrement: true });};

request.onsuccess = function (event) {  db = event.target.result;

  if (navigator.onLine) {
    uploadBudget();}};

request.onerror = function (event) {
  console.log(event.target.errorCode);};
function saveRecord(record) {
  const transaction = db.transaction(['new_budget'], 'readwrite');
  const budgetObjectStore = transaction.objectStore('new_budget');

  budgetObjectStore.add(record);}

function uploadBudget() 
{  const transaction = db.transaction(['new_budget'], 'readwrite');
 
//now define obect store above
//getall
//fetch- then err log
const budgetObjectStore = transaction.objectStore('new_budget');
  const getAll = budgetObjectStore.getAll();
getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: 
        {  Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'}    })
        .then(response => response.json())
        .then(serverResponse => {
    if (serverResponse.message) {
            throw new Error(serverResponse);      }
          const transaction = db.transaction(['new_budget'], 'readwrite');
          const budgetObjectStore = transaction.objectStore('new_budget');
    alert('All saved budgets has been submitted!');})

        .catch(err => {
          console.log(err); }); }};}

window.addEventListener('online', uploadBudget);