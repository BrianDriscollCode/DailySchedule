//start value has to be before end value or error occurs
function timeBackwardsError(startTime, endTime) {

  let check = true;

  let startValue = scheduleTimePositionValues[startTime];
  let endValue = scheduleTimePositionValues[endTime];

  if (startValue < endValue) {
    return check;
  } else {
    check = false;
    return check;
  }
}

//checks for overlapping times when user enters in a new task and disallow repeats
//accounts for multiple cases and outcomes.
function timeOverLappingError(startTime, endTime) {

  let check = true;
  let usedTimes = [];
  let counter = 0;
  let popOccured = false; //track if array has pop and shift occurence to prevent
                          // double pops and shifts

  //get new input values from user and find their scores (i.e. 0-23)
  let startValue = scheduleTimePositionValues[startTime];
  let endValue = scheduleTimePositionValues[endTime];

  //Counts from startValue to endValue and adds all of these to array "usedTimes"
  //example [4,7] makes [4,5,6,7]
  while (startValue <= endValue) {
    usedTimes[counter] = startValue;

    startValue += 1;
    counter += 1; // iterates through array
  }

  //Don't compare Starting and Ending Value with arrays larger than 2
  //So you can have times like 7am-8am, 8am-9pm without creating an error
  if (usedTimes.length > 2) {
    usedTimes.pop();
    usedTimes.shift();
    popOccured = true;
  }

  //generate values for existing values in table and check against userInput
  for (let i = 0; i < startingTime.length; i++) {

        //retrieve current times on the table and their scores
        let comparativeStartingValue = scheduleTimePositionValues[startingTime[i]];
        let comparativeEndingValue = scheduleTimePositionValues[endingTime[i]];

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

        if (usedTimes.length == 2 && tableUsedTimes.length == 2) {
          //generate total number from arrays to compare
          for (let i = 0; i < usedTimes.length; i++) {
            total1 += usedTimes[i];
            total2 += tableUsedTimes[i];
          }

          //Create error if they are the same
          if (total1 == total2) {
            let check = false;
            return check;
          }
        }

        //Only compare to middle values of existing table values when user's
        //creates an array (usedTimes) that only has 2 values (i.e [7,8])
        //allows for new input in between 2 tasks when there is only 1 hour of space
        if (usedTimes.length == 2 && popOccured == false) {
          tableUsedTimes.pop();
          tableUsedTimes.shift();
        }

        //returns 'true; if finds the same number in both arrays
        let arrayComparisonTest = usedTimes.some(r=> tableUsedTimes.indexOf(r) >= 0);

        if (arrayComparisonTest == true) {
              let check = false;
              return check;
        }
      } //For loop ends here

  return check; //All is normal and returns "true"
}
