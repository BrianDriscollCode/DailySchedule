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
let matchingTimes = []; // STORES ONLY the value from timeInput1 and not timeInput2
                        // so that we can calculate this positions value

//Create scores and rearrange the list inputs based on the scores
let taskScores = [];
//Final array used for printing
let finalList = []

function calculateTaskValue() {
  let convertedValues = [];

  for (let i = 0; i < matchingTimes.length; i++) {
    convertedValues[i] = scheduleTimeValues[matchingTimes[i]];
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
// function calculateTaskValue() {
//
//   let
//
//   for (let i = 0; matchingTimes.length; i++) {
//
//     let currentTimeValue = matchingTimes[i];
//
//     for (let n = 0; i < allTimeValues.length; i++) {
//
//         if (currentTimeValue == allTimeValues[i]) {
//
//         }
//
//     }
//
//   }
//
// }


//Measure how long the full string is (9 or 10 or 11)
// Then with if statements, decide whether or not I choose 0-3 or 0-4



//WILL calculate value of the entry to then reorganize based on times

//For tracking length of list to add dynamic ID's
function returnRowItemLength() {
  return Object.keys(currentTasks).length;
}
