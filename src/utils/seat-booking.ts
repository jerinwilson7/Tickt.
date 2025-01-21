export const generateSeats = () => {
    let numRow = 8;
    let numColumn = 3;
    let rowArray = [];
    let start = 1;
    let reachnine = false;
  
    for (let i = 0; i < numRow; i++) {
      let columnArray = [];
      for (let j = 0; j < numColumn; j++) {
        let seatObject = {
          number: start,
          taken: Boolean(Math.round(Math.random())),
          selected: false,
        };
        columnArray.push(seatObject);
        start++;
      }
      if (i == 3) {
        numColumn += 2;
      }
      if (numColumn < 9 && !reachnine) {
        numColumn += 2;
      } else {
        reachnine = true;
        numColumn -= 2;
      }
      rowArray.push(columnArray);
    }
    return rowArray;
  };
  