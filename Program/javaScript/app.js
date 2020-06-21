const input1 = document.getElementsByTagName('INPUT')[0];
const timeInput1 = document.getElementsByTagName('SELECT')[0];
const timeInput2 = document.getElementsByTagName('SELECT')[1];
const enter = document.getElementsByTagName('BUTTON')[0];
// const scheduleCardSection = document.getElementById('scheduleCards');
// const singleCard = document.querySelectorAll('.singleCard');
// const buttonLocation = document.querySelectorAll('.timePosition');
const table = document.getElementById('scheduleTable');
const timeSection = document.querySelectorAll('#timeSection');
let deleteButton = document.querySelectorAll('#button');

let currentRow = 0; //track amount of rows

//Removes all Rows to be reprinted after new entry occurs
function removeAllRows() {
  let allRows = document.querySelectorAll('TR');

  for (let i = 1; i < allRows.length; i++) {
    allRows[i].remove();
  }
}

//Add row based on input used by "ENTER" button when clicked
function addRow(taskText, timeText, rowNumberInput) {

  //insert at the last postion
  let row = table.insertRow(-1);
  let rowNumberId = `rowNumber${rowNumberInput}`;
  row.setAttribute('id', rowNumberId); //dynamically set ID
                                       //to match row number

  let cell1 = row.insertCell(0);
  cell1.innerHTML = taskText;

  let cell2 = row.insertCell(1);
  cell2.setAttribute('id', 'timeSection');
  cell2.innerHTML = timeText;
  cell2.innerHTML += '<button class="deleteButton"> Delete </button>';

  deleteButton = document.querySelectorAll('.deleteButton');
}

//track events
document.addEventListener('click', (event) => {
  console.log(event.target);
});

//take input and call addRow function to add a row
enter.addEventListener('click', () => {

  //Remove all rows so they can be reprinter in order depending on starting time
  removeAllRows();

  let taskText = input1.value;
  currentTasks[currentRow] = taskText;

  let timeText = `${timeInput1.value} - ${timeInput2.value}`;
  currentTimes[currentRow] = timeText;

  matchingTimes[currentRow] = `${timeInput1.value}`; //stores beginning timeout

  //recalculate task value of new positions -------------->
  taskScores = calculateTaskValue();

  //Final list created and ordered for printing to page
  createFinalList(currentTasks, currentTimes, taskScores);

  //print rows
  for (let i = 0; i <= currentRow; i++) {

      addRow(finalList[i].taskText, finalList[i].timeText, i); //last i is row number

  }

  currentRow += 1;
});


//Reveal Delete Button on mouseenter
table.addEventListener('mouseenter', () => {

    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].style.display = 'inline';
    }


});

//Hide Delete Button on mouseleave
table.addEventListener('mouseleave', () => {

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].style.display = 'none';
  }

});

//When clicking delete button delete row
table.addEventListener('click', (event) => {

  if (event.target.className == 'deleteButton') {
    let chosenDataElement1 = event.target.parentNode;
    let chosenDataElement2 = event.target.parentNode.parentNode;
    let elementId = chosenDataElement2.id; //get id of row being deleted

    let rowNumber = elementId.slice(9,10); //use row ID to get row Number
    rowNumber = parseInt(rowNumber); // then convert it to integer


    //Deletes Row information from arrays "currentTasks" and "currentTimes
    //AND "matchingTimes"located in cardDatabase.js
    currentTasks.splice(rowNumber, 1);
    currentTimes.splice(rowNumber, 1);
    matchingTimes.splice(rowNumber, 1);

    //removes the elements from document
    chosenDataElement1.remove();
    chosenDataElement2.remove();

    //recalculate the total rows
    currentRow -= 1;

    //Reset ID's for elements left
    for (let i = 1; i < currentTasks.length + 1; i++) {
      let listItems = document.getElementsByTagName('TR')[i];
      let iStringValue = i.toString();
      let idName = `rowNumber${iStringValue}`;

      listItems.setAttribute('id', idName);
    }

    //recalculate task value of new positions
    taskScores = calculateTaskValue();
  }

});
