const scheduleTimePositionValues = { //used for generating order of each task's position

  '3am': 0,
  '4am': 1,
  '5am': 2,
  '6am': 3,
  '7am': 4,
  '8am': 5,
  '9am': 6,
  '10am': 7,
  '11am': 8,
  '12pm': 9,
  '1pm': 10,
  '2pm': 11,
  '3pm': 12,
  '4pm': 13,
  '5pm': 14,
  '6pm': 15,
  '7pm': 16,
  '8pm': 17,
  '9pm': 18,
  '10pm': 19,
  '11pm': 20,
  '12am': 21,
  '1am': 22,
  '2am': 23,

}

let currentTasks = [];
let currentTimes = [];
let startingTime = []; //input only from firstTimeInput
let endingTime = []; //input only from secondTimeInput
let taskScores = []; //Scores for each task used for ordering on page
let finalList = [] //Final array used for printing

function removeAllRows() {
  let allRows = document.querySelectorAll('TR');

  for (let i = 1; i < allRows.length; i++) {
    allRows[i].remove();
  }
}

function printRow(taskText, timeText, rowNumberInput) {

  let row = table.insertRow(-1);
  let rowNumberId = `rowNumber${rowNumberInput}`;
  row.setAttribute('id', rowNumberId); //dynamically set ID
                                       //to match row number

  let cell1 = row.insertCell(0);
  cell1.innerHTML = taskText;

  let cell2 = row.insertCell(1);
  cell2.setAttribute('id', 'timeSection');
  cell2.innerHTML = timeText;

  cell2.innerHTML += '<button class="finishTaskButton"> Finished </button>';
  cell2.innerHTML += '<button class="deleteButton"> Delete </button>';








}

function calculateTaskPosition() {
  let convertedValues = [];

  for (let i = 0; i < startingTime.length; i++) {
    convertedValues[i] = scheduleTimePositionValues[startingTime[i]];
  }

  return convertedValues;
}

//consolidate arrays into object and reorder based on alloted times
function createEntryObject(taskText, timeText, rowScores) {
  const entry = {};
  entry.taskText = taskText;
  entry.timeText = timeText;
  entry.rowScores = rowScores;

  return entry;
}

function createFinalList(taskText, timeText, rowScores) {

  for (let i = 0; i < startingTime.length; i++) {
    let currentEntry = createEntryObject(taskText[i], timeText[i], rowScores[i]);
    finalList[i] = currentEntry;
  }

  sortList(finalList);
}

function sortList(objectList) {

  objectList.sort((a,b) => {

      if (b.rowScores > a.rowScores) {
        return -1;
      } else {
        return 1;
      }
    });
}

//for debugging purposes
function printAllArrays() {
  console.log(currentTimes, "-currentTimes (NOT ORDERED)");
  console.log(currentTasks, "-currentTasks (NOT ORDERED)");
  console.log(startingTime, "startingTime (NOT ORDERED)");
  console.log(endingTime, "endingTime (NOT ORDERED)");
  console.log(taskScores, "taskScores (NOT ORDERED)");
  console.log(finalList, "finalList");

}
