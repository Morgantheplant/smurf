var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//todo: add tide builder either in same file or different file for cleaning up data

module.exports = function(raw){
    raw = typeof raw === "object" ? raw :  JSON.parse(raw);
    var multiDay = [];
    var breakDown = raw["Analysis"];
    var confidence = raw["Confidence"];
    if(breakDown && confidence){
        for (var i = 0; i < breakDown["surfMax"].length; i++) {
            var day = {}
            day.surfMax = breakDown["surfMax"][i];
            day.surfMin = breakDown["surfMin"][i];
            day.surfText = breakDown["surfText"][i];
            day.generalCondition = breakDown["generalCondition"][i];
            day.surfRange = breakDown["surfRange"][i];
            day.generalText = breakDown["generalText"][i];
            var date = confidence["dateStamp"][i];
            day.date = date;
            day.dayOfWeek = daysOfWeek[new Date(date).getDay()];
            day.regionName = raw["Location"].regionname;
            day.regionAlias = raw["Location"].subregionalias;
            multiDay.push(day);
        }
        var report = {
            lat: raw.lat,
            lon: raw.lon,
            forecast: multiDay,
            id:raw.id,
            tidesData: createTidesData(raw.Tide.dataPoints)
        }
        return report
    } 
  
}

function createTidesData(tidesArray, width, height){
    var days = 1,
     dayRange = (days * 23),
     height = 100,
     width =200,
     time,
     hour,
     minutes,
     tideDataForDay = {},
     dailyTides,
     sunriseSunset,
     specialTides,
     timeData,
     orderedDays = [],
     tideData;
     
     // store daily tide points as arrays for each day of month
     var normalTidesDaily = {},
     specialTidesDaily = {},
     sunriseSunsetTidesDaily = {}; 

    
    for (var i = 0, len = tidesArray.length; i < len; i++) {
        tideData = tidesArray[i];
        time = new Date(tideData.time * 1000);
        hour = time.getHours();
        minutes = time.getMinutes();
        tideData.readAbleTime = getReadableTime(time, hour, minutes);
        timeData = getTimeData(hour, minutes);
        tideData.rangeX = normalizeRange(0, width, 0, dayRange, timeData, time, hour);
        tideData.rangeY = normalizeRange(0, height, 8, -4, tideData.height, time, hour);
        tideData.day = time.getDate();
        
        if(tideData.type === "NORMAL"){ 
            dailyTides = normalTidesDaily[tideData.day];
            // if array for the day of month doesnt exist create one
            if(!dailyTides) {
                dailyTides = [];
                // store order in which new days are added
                // we will use this to look up data for the day
                orderedDays.push(tideData.day);
                normalTidesDaily[tideData.day] = dailyTides;
            }
                dailyTides.push(tideData); 

        } else if(tideData.type.length > 4) {
            sunriseSunset = sunriseSunsetTidesDaily[tideData.day];
            // if day doesnt exist create array store
            if(!sunriseSunset){
                sunriseSunset = []
                sunriseSunsetTidesDaily[tideData.day] = sunriseSunset
            }
            sunriseSunset.push(tideData)
        } else {
            specialTides = specialTidesDaily[tideData.day];
            //if day doesnt exist create array there to store tides
            if(!specialTides){
                specialTides = [];
                specialTidesDaily[tideData.day] = specialTides
            }

            specialTides.push(tideData)   
        }
    }
    return {
        orderedDays: orderedDays,
        normalTidesDaily: normalTidesDaily,
        specialTidesDaily: specialTidesDaily,
        sunriseSunsetTidesDaily: sunriseSunsetTidesDaily
    }
        
}

function normalizeRange(newmin, newmax, oldmin, oldmax, oldval){
  newmin = newmin || 0;
  let newRange = newmax - newmin;
  let oldRange = oldmax - oldmin;
  let newValue = (((oldval - oldmin)*newRange)/oldRange) + newmin;
  return Math.round(newValue);
}

function getReadableTime(time, hour, minutes){
    const tideData = {};
    time = new Date(time * 1000);
    dayOfMonth = time.getDate();
    hour = time.getHours();
    minutes = time.getMinutes();
    amPm = (hour < 12) ? " am" : " pm";
    hrFormatted = (hour < 12) ? hour : hour - 12;
    minutesFormatted = (minutes < 10) ? "0" + minutes : minutes;
    return hrFormatted + ":" + minutesFormatted + amPm;
}

function getTimeData(hour, minutes){
    return hour + (minutes/60);
}

