const taskNameInput = document.getElementsByTagName('INPUT')[0];
const firstTimeInput = document.getElementsByTagName('SELECT')[0];
const secondTimeInput = document.getElementsByTagName('SELECT')[1];
const enter = document.getElementsByTagName('BUTTON')[0];
const table = document.getElementById('scheduleTable');
const timeSection = document.querySelectorAll('#timeSection');
const inputSection = document.querySelector('#inputSection');
let deleteButton;
let finishTaskButton;


let currentRow = 0; //track amount of rows

//track events
document.addEventListener('click', (event) => {
  console.log(event.target);
});
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

//take input and call printRow function to add a row
enter.addEventListener('click', () => {

  if (timeBackwardsError(firstTimeInput.value, secondTimeInput.value) == false) {
    firstTimeInput.style.backgroundColor = "white";
    secondTimeInput.style.backgroundColor = "red"; //mark error location
    alert("Day starts at 3am and day ends at 2am. Please enter in times in the correct order.");
  }
  else if (timeOverLappingError(firstTimeInput.value, secondTimeInput.value) == false) {
    firstTimeInput.style.backgroundColor = "red";
    secondTimeInput.style.backgroundColor = "red";
    alert("Chosen are overlapping or repeating and need to be changed");
  }
  else {
    firstTimeInput.style.backgroundColor = "white";
    secondTimeInput.style.backgroundColor = "white"; //rectify error location if needed
    removeAllRows(); //Remove all rows so they can be reprinted in order depending on starting time

    let taskText = taskNameInput.value;
    currentTasks[currentRow] = taskText;

    let timeText = `${firstTimeInput.value} - ${secondTimeInput.value}`;
    currentTimes[currentRow] = timeText;

    startingTime[currentRow] = `${firstTimeInput.value}`;
    endingTime[currentRow] = `${secondTimeInput.value}`;

    //recalculate task value of new positions
    taskScores = calculateTaskPosition();

    //creates the object and orders them for printing to page
    createFinalList(currentTasks, currentTimes, taskScores);

    for (let i = 0; i <= currentRow; i++) {

        printRow(finalList[i].taskText, finalList[i].timeText, i); //last i is row number

    }

    deleteButton = document.querySelectorAll('.deleteButton');
    finishTaskButton = document.querySelectorAll('.finishTaskButton');

    currentRow += 1;
  }
});



//Delete Button Functonality
table.addEventListener('mouseenter', () => {
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].style.display = 'inline';
    }
});

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

    let rowNumber = elementId.slice(9,10); //use row ID to get rowNumber
    rowNumber = parseInt(rowNumber);

    let elementText = chosenDataElement2.textContent;
    let rowFinder; //used to find exact position for unordered arrays for deletion

    //format the arraytext and see if any positon matches current element being deleted
    for (let i = 0; i < currentTasks.length; i++) {
      let arrayText = `${currentTasks[i]}${currentTimes[i]} Finished  Delete`;

      if (elementText.substring(0, arrayText.length) == arrayText) {
        rowFinder = i;
        break;
      }
    }

    //Deletes Row information from arrays in appFunctionality.js
    console.log(rowFinder, "-rowFINDER");
    currentTasks.splice(rowFinder, 1);
    currentTimes.splice(rowFinder, 1);
    startingTime.splice(rowFinder, 1);
    endingTime.splice(rowFinder, 1);
    finalList.splice(rowNumber, 1);

    chosenDataElement1.remove();
    chosenDataElement2.remove();

    //recalculate the total rows
    currentRow -= 1;

    for (let i = 1; i < currentTasks.length + 1; i++) {
      let listItems = document.getElementsByTagName('TR')[i];
      let newStringValue = i - 1;
      newStringValue = newStringValue.toString();
      let idName = `rowNumber${newStringValue}`;

      listItems.setAttribute('id', idName);
    }

    //recalculate task value of new positions
    taskScores = calculateTaskPosition();
  }

});

//FinishTaskButton functionality
table.addEventListener('mouseenter', () => {

  for (let i = 0; i < finishTaskButton.length; i++) {
    finishTaskButton[i].style.display = 'inline';
  }

});

table.addEventListener('mouseleave', () => {

  for (let i = 0; i < finishTaskButton.length; i++) {
    finishTaskButton[i].style.display = 'none';
  }

});

table.addEventListener('click', () => {

  if (event.target.className == 'finishTaskButton') {
    let chosenDataElement1 = event.target.parentNode;
    let chosenDataElement2 = event.target.parentNode.parentNode;

    chosenDataElement1.style.backgroundColor = '#677364';
    chosenDataElement2.style.backgroundColor = '#677364';

    chosenDataElement1.style.textDecoration = 'line-through';
    chosenDataElement2.style.textDecoration = 'line-through';


  }

});
