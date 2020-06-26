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

//start value has to be before end value or error occurs
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

//checks for overlapping times when user enters in a new task, disallow repeats
function timeOverLappingError(startTime, endTime) {

  let check = true; //when false, run error
  let usedTimes = [];
  let counter = 0;
  let popOccured = false; //track if array has pop and shift occurence to prevent
                          // double pops and shifts

  //get new input values from user and find their scores (i.e. 0-23)
  let startValue = scheduleTimeValues[startTime];
  let endValue = scheduleTimeValues[endTime];

  //Counts from startValue to endValue and adds all of these to array "usedTimes"
  //example [4,7] makes [4,5,6,7]
  while (startValue <= endValue) {
    usedTimes[counter] = startValue;

    startValue += 1;
    counter += 1; // iterates through array
  }

  //Don't compare Starting and Ending Value with arrays larger than 2
  // So you can have times like 7am-8am, 8am-9pm without creating an error
  if (usedTimes.length > 2) {
    usedTimes.pop();
    usedTimes.shift();
    popOccured = true;
  }

  //generate values for existing values in table and check against userInput
  for (let i = 0; i < startingTimes.length; i++) {

        //retrieve current times on the table and their scores
        let comparativeStartingValue = scheduleTimeValues[startingTimes[i]];
        let comparativeEndingValue = scheduleTimeValues[endingTimes[i]];

        // console.log(comparativeStartingValue, "-compareStart");
        // console.log(comparativeEndingValue, "-compareEnd");

        let tableUsedTimes = []; //existing values array

        //Create array for existing values
        counter = 0;
        while (comparativeStartingValue <= comparativeEndingValue) {
              tableUsedTimes[counter] = comparativeStartingValue;

              comparativeStartingValue += 1;
              counter += 1;
        }

        //if both arrays "usedTimes" and "tableUsedTimes" have only 2 values each,
        //then compare to see if they are the same.
        let total1 = 0;
        let total2 = 0;
        if (usedTimes.length == 2 && tableUsedTimes.length == 2) { //start of encapsulating if statement
          //generate total number from arrays to compare
          for (let i = 0; i < usedTimes.length; i++) {
            total1 += usedTimes[i];
            total2 += tableUsedTimes[i];
          }
          // console.log(total1, '-total1');
          //Create error if they are the same
          if (total1 == total2) {
            let check = false;
            // console.log('--double CHECK--');
            return check;
          }

        } //End of encapsulating if statement

        //Only compare to middle values of existing table values when user's
        //creates an array (usedTimes) that only has 2 values (i.e [7,8])
        //allows for new input in between 2 tasks when there is only 1 hour of space
        if (usedTimes.length == 2 && popOccured == false) {
          tableUsedTimes.pop();
          tableUsedTimes.shift();
        }

        console.log(usedTimes, "-new");
        console.log(tableUsedTimes, "-current");
        //compare usedTimes (entered in by user just now) to tableUsedTimes (previously entered beforehand) and check FALSE if any matches are found
        let arrayComparisonTest = usedTimes.some(r=> tableUsedTimes.indexOf(r) >= 0);
        console.log('-comparison test active')

        //basic check for values in between that covers most cases
        if (arrayComparisonTest == true) {
              let check = false;

              console.log('--normal CHECK--');
              return check;
              break;
        }
  }
  return check; //all is good!
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
