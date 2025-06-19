function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, op) {
    switch(op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

let currentNum = "a";

const outputDiv = document.querySelector(".output");
outputDiv.textContent = "\u00A0";
const inputDiv = document.querySelector(".input");

const numberButtons = document.querySelectorAll(".num");

let aStr = "";
let opStr = "";
let bStr = "";
let fullStr = "";

numberButtons.forEach((num) => {
    num.addEventListener("click", () => {
        if(inputDiv.textContent == 0) {
            inputDiv.textContent = "";
        }

        if(currentNum == "a") {
            aStr += num.id;
        } else {
            bStr += num.id;
        }
        fullStr += num.id;
        inputDiv.textContent += num.id;
    });
});

const operations = document.querySelectorAll(".op");
let ans = 0;

operations.forEach((op) => {
    op.addEventListener("click", () => {
        if(aStr != "" && opStr == "") {
            opStr += op.textContent;
            fullStr += op.textContent;
            outputDiv.textContent = fullStr;
            currentNum = "b";
            inputDiv.textContent = "0";
        } else if(opStr != "" && bStr == "") {
            opStr = op.textContent;
            fullStr = fullStr.slice(0, -1);
            fullStr += op.textContent;
            outputDiv.textContent = fullStr;
            currentNum = "b";
            inputDiv.textContent = "0";
        } else if(aStr != "" && opStr != "" && bStr != "") {
            ans = operate(parseFloat(aStr), parseFloat(bStr), opStr);
            aStr = ans;
            fullStr = aStr + op.textContent;
            opStr = op.textContent;
            bStr = "";
            outputDiv.textContent = fullStr;
            inputDiv.textContent = "0";
        }
    });
});

const clearDiv = document.querySelector(".clear");

clearDiv.addEventListener("click", () => {
    outputDiv.textContent = "\u00A0";
    inputDiv.textContent = "0";
    aStr = "";
    bStr = "";
    opStr = "";
    fullStr = "";
    currentNum = "a";
}); 

const equals = document.querySelector(".equals");

equals.addEventListener("click", () => {
    ans = operate(parseFloat(aStr), parseFloat(bStr), opStr);
    outputDiv.textContent = fullStr + "=";
    inputDiv.textContent = ans;
    aStr = ans.toString();
    bStr = "";
    opStr = "";
    currentNum = "a";
    fullStr = aStr;
});

const del = document.querySelector(".delete");

del.addEventListener("click", () => {
    
    fullStr = fullStr.slice(0, -1);
    if(currentNum == "a") {
        aStr = aStr.slice(0, -1);
        inputDiv.textContent = aStr;
        if(aStr.length == 0) {
            inputDiv.textContent = "0";
        }
    } else if(currentNum == "b" && bStr.length >= 1){
        bStr = bStr.slice(0, -1);
        inputDiv.textContent = bStr;
        if(bStr.length == 0) {
            inputDiv.textContent = "0";
        }
    }
});


const dot = document.querySelector(".dot");

dot.addEventListener("click", () => {
    if(currentNum == "a" && !aStr.includes(".")) {
        aStr += ".";
        fullStr += ".";
        inputDiv.textContent = aStr;
    } else if(currentNum == "b" && !bStr.includes(".")) {
        bStr += ".";
        fullStr += ".";
        inputDiv.textContent = bStr;
    }
});

const sign = document.querySelector(".sign");

sign.addEventListener("click", () => {
    if(currentNum == "a") {
        if(!aStr.startsWith("-")) {
            aStr = "-" + aStr;
        } else {
            aStr = aStr.slice(1);
        }
        fullStr = aStr;
        inputDiv.textContent = aStr;
    } else if(currentNum == "b") {
        if(!bStr.startsWith("-")) {
            bStr = "-" + bStr;
        } else {
            bStr = bStr.slice(1);
        }
        fullStr = aStr + opStr + bStr;
        inputDiv.textContent = bStr;
    }
});