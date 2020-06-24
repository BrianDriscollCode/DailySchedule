const input1 = document.getElementsByTagName('INPUT')[0];
const timeInput1 = document.getElementsByTagName('SELECT')[0];
const timeInput2 = document.getElementsByTagName('SELECT')[1];
const enter = document.getElementsByTagName('BUTTON')[0];
// const scheduleCardSection = document.getElementById('scheduleCards');
// const singleCard = document.querySelectorAll('.singleCard');
// const buttonLocation = document.querySelectorAll('.timePosition');
const table = document.getElementById('scheduleTable');
const timeSection = document.querySelectorAll('#timeSection');
const inputSection = document.querySelector('#inputSection');
let deleteButton = document.querySelectorAll('#button');

let currentRow = 0; //track amount of rows

//track events
document.addEventListener('click', (event) => {
  console.log(event.target);
});

//take input and call addRow function to add a row
enter.addEventListener('click', () => {


  if (timeEntryError(timeInput1.value, timeInput2.value) == false) {
    timeInput2.style.backgroundColor = "red"; //mark error location
    alert("Times start 3am and end at 2am. Please enter in times in the correct order.");
  } else {
    //Remove all rows so they can be reprinter in order depending on starting time
    timeInput2.style.backgroundColor = "white"; //rectify error location if needed
    removeAllRows();

    let taskText = input1.value;
    currentTasks[currentRow] = taskText;

    let timeText = `${timeInput1.value} - ${timeInput2.value}`;
    currentTimes[currentRow] = timeText;

    startingTimes[currentRow] = `${timeInput1.value}`;
    endingTimes[currentRow] = `${timeInput2.value}`;

    //recalculate task value of new positions -------------->
    taskScores = calculateTaskValue();
    console.log(taskScores);

    //Final list created and ordered for printing to page
    createFinalList(currentTasks, currentTimes, taskScores); //objects created

    //print rows
    for (let i = 0; i <= currentRow; i++) {

        addRow(finalList[i].taskText, finalList[i].timeText, i); //last i is row number

    }

    currentRow += 1;
  }
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
    console.log(rowNumber, "-rowNumber");

    //at this element.rowNumber, put value here
    //in a for loop, compare value of these strings to see
    // if they match. *format array information to match output
    // of .textContent from elements.*
    //format JOB6am - 11am Delete


    let elementText = chosenDataElement2.textContent; //get element text
    let rowFinder; //used to find exact position for unordered arrays for deletion
    console.log(elementText);

    //format the arraytext and see if any positon matches current element being deleted
    for (let i = 0; i < currentTasks.length; i++) {
      let arrayText = `${currentTasks[i]}${currentTimes[i]} Delete`;

      if (elementText.substring(0, arrayText.length) == arrayText) {
        rowFinder = i;
        break;
      }
    }


    //Deletes Row information from arrays "currentTasks" and "currentTimes
    //AND "startingTimes", "finalList", and "endingTimes" in cardDatabase.js
    currentTasks.splice(rowFinder, 1);
    currentTimes.splice(rowFinder, 1);
    startingTimes.splice(rowFinder, 1);
    endingTimes.splice(rowFinder, 1);
    finalList.splice(rowNumber, 1); // FIX THIS

    //removes the elements from document
    chosenDataElement1.remove();
    chosenDataElement2.remove();

    //recalculate the total rows
    currentRow -= 1;

    //Reset ID's for elements left
    for (let i = 1; i < currentTasks.length + 1; i++) {
      let listItems = document.getElementsByTagName('TR')[i];
      let iStringValue = i - 1;
      iStringValue = iStringValue.toString();
      let idName = `rowNumber${iStringValue}`;

      listItems.setAttribute('id', idName);
    }

    //recalculate task value of new positions
    taskScores = calculateTaskValue();
  }

});
