var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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
        multiDay.push(day)
    }
    return multiDay
}