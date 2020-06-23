const scheduleTimeValues = { //values of each time's value

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

const allTimeValues = ['3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am',
'11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm',
'10pm', '11pm', '12am', '1am', '2am'];

//Tracks entry information for reprinting and basic storage and manipulation
let currentTasks = [];
let currentTimes = [];
let startingTimes = []; // STORES ONLY the value from timeInput1 and not timeInput2
                        // so that we can calculate this positions value
let endingTimes = []; //Stores input ONLY from timeInput 2

//Create scores and rearrange the list inputs based on the scores
let taskScores = [];
//Final array used for printing
let finalList = []

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

function calculateTaskValue() {
  let convertedValues = [];

  for (let i = 0; i < startingTimes.length; i++) {
    convertedValues[i] = scheduleTimeValues[startingTimes[i]];
  }

  return convertedValues;
}

function timeEntryError(startTime, endTime) {

  let check = true;

  let startValue = scheduleTimeValues[startTime];
  let endValue = scheduleTimeValues[endTime];

  if (startValue < endValue) {
    return check;
  } else {
    check = false;
    return check;
  }
}

//Creating objects that contain each list elements information in the correct
//corresponding order based on times
function createEntryObject(taskText, timeText, rowNumber, rowScores) {
  const entry = {};
  entry.taskText = taskText;
  entry.timeText = timeText;
  entry.rowNumber = rowNumber;
  entry.rowScores = rowScores;

  console.log("CreateEntryObject Function Called");
  return entry;
}

function createFinalList(taskText, timeText, rowScores) {

  //"i" is row number
  for (let i = 0; i < currentTasks.length; i++) {
    let currentEntry = createEntryObject(taskText[i], timeText[i], i, rowScores[i]);
    finalList[i] = currentEntry;
  }

  sortList(finalList); //sort FinalList
  console.log("CreateFinaList Function called");
}

//Sorts the final list for printing so they are in order based on variable
//"matchingTimes"
function sortList(objectList) {

  objectList.sort((a,b) => {

      if (b.rowScores > a.rowScores) {
        return -1;
      } else {
        return 1;
      }
});


}

// //
// function returnRowItemLength() {
//   return Object.keys(currentTasks).length;
// }

function printAllArrays() {
  console.log(currentTimes, "-currentTimes (NOT ORDERED)");
  console.log(currentTasks, "-currentTasks (NOT ORDERED)");
  console.log(startingTimes, "startingTimes (NOT ORDERED)");
  console.log(endingTimes, "endingTimes (NOT ORDERED)");
  console.log(taskScores, "taskScores (NOT ORDERED)");
  console.log(finalList, "finalList");

}
