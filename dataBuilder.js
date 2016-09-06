var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//todo: add tide builder either in same file or different file for cleaning up data

module.exports = function(raw){
    var multiDay = [];
    var breakDown = raw["Analysis"];
    var confidence = raw["Confidence"]
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
    multiDay.Tide = raw.Tide;
    return multiDay
}
