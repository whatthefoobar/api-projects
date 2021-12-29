const puzzleBoard = document.querySelector('#puzzle');
const solveBtn = document.querySelector('#solve-btn');
const solutionDisplay = document.querySelector('#solution')
const squares = 81;
let submission = [];

for (let i = 0; i <squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max', '9');
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ){
        inputElement.classList.add('odd-section')
    }

    puzzleBoard.appendChild(inputElement);

}

const joinValues = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if(input.value){
            submission.push(input.value);
        }else {
            submission.push('.');
        }
    })
    console.log(submission);
}
const populateValues =(isSolvable, solution)=>{
    const inputs = document.querySelectorAll('input');
    if(isSolvable && solution){
        inputs.forEach(input => {
            input.value= solution[i];
            
        })
        solutionDisplay.innerHTML='This is the answer'
    }else {
        solutionDisplay.innerHTML='This is not solvable'
    }
    
}
const solve = () => {
    //var axios = require("axios").default; // we loaded a cdn
    
    joinValues();
    const data = {numbers: submission.join('')}; // this we pass through body to the backend// this needs to be an object
    console.log("data",data);
  // removed the axios fetch code and moved in our server.js

  fetch('http://localhost:8000/solve', {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
      },
      body: JSON.stringify(data)

  })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        populateValues(data.solvable, data.solution)
        submission = [] //clears submission
    })
    .catch((error)=> {
      console.log(('Error:', error));
  })
}


solveBtn.addEventListener('click', solve);

//example api response
//{solvable:true, solution :"256789................"}

