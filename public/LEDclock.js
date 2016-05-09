
var innerLEDparts,
numberCodes,
digits;

innerLEDparts = {
0:"Top",
1:"Left",
2:"Right",
4:"Top",
3:"Bottom",
5:"Left",
6:"Right",
7:"Bottom",
};

numberCodes = {
  0:[1,1,1,0,0,1,1,1],
  1:[0,0,1,0,0,0,1,0],
  2:[1,0,1,1,1,1,0,1],
  3:[1,0,1,1,1,0,1,1],
  4:[0,1,1,1,1,0,1,0],
  5:[1,1,0,1,1,0,1,1],
  6:[1,1,0,1,1,1,1,1],
  7:[1,0,1,0,0,0,1,0],
  8:[1,1,1,1,1,1,1,1],
  9:[1,1,1,1,1,0,1,0],
  clear:[0,0,0,0,0,0,0,0]
};

digits = document.getElementsByClassName('digit');

function updateDigits(timeArray){
  var digit,
  currentNumber,
  numberCodeChunks;

  for(var i = 0, max = digits.length; i < max; i++){
    // the DOM element container for a digit on the clock
    digit = digits[i];
    // update digit with current time
    currentNumber = timeArray[i];
    numberCodeChunks = numberCodes[currentNumber];
    changeState(digit, numberCodeChunks, i);
  }

}

function changeState(digitLED, digitDataChunks, index){
  var state,
  part,
  borderTarget,
  partsOfLED = digitLED.children;
  
  for(var i = 0, max = partsOfLED.length; i < max; i++){
    // on or off
    state = digitDataChunks[i];
    part = partsOfLED[i];
    borderTarget = 'border' + innerLEDparts[i] + 'Color';
    
    if(state===0){
      part.style[borderTarget] = '#021019';
    }
    
    if(state===1){
      part.style[borderTarget] = 'teal';
    }
  }
}

function getTimeAndUpdate(){
  var date,
  hours,
  isPM,
  minutes,
  seconds,
  hourTen,
  hour,
  minuteTen,
  minute,
  secondTen,
  second,
  timeArray;

  date = new Date();
  hours = date.getHours();
  isPM = hours > 13;

  if(isPM){
    hours = (hours - 12).toString();
    document.getElementsByClassName('am-pm')[0].style.backgroundColor = 'teal';
  }

  if(!isPM){
    hours = hours.toString();
    document.getElementsByClassName('am-pm')[0].style.backgroundColor = '#021019';
  }

  minutes = date.getMinutes().toString();
  seconds = date.getSeconds().toString();
  // names for each of the digits on the clock
  hourTen = (hours.length<2) ? 'clear' : hours[0];
  hour = (hours.length<2) ? hours[0] : hours[1]
  minuteTen = (minutes.length<2) ? 0 : minutes[0];
  minute = (minutes.length<2) ? minutes[0] : minutes[1];
  secondTen = (seconds.length<2) ? 0 : seconds[0];
  second = (seconds.length<2) ? seconds[0] : seconds[1];

  timeArray = [hourTen,hour,minuteTen,minute, secondTen, second];
  updateDigits(timeArray);
}

module.exports = {
  update: getTimeAndUpdate
};


