
module.exports = function(raw){
    var multiDay = [];
    var breakDown = raw["Analysis"];
    for (var i = 0; i < breakDown["surfMax"].length; i++) {
        var day = {}
        day.surfMax = breakDown["surfMax"][i];
        day.surfMin = breakDown["surfMin"][i];
        day.surfText = breakDown["surfText"][i];
        day.generalCondition = breakDown["generalCondition"][i];
        day.surfRange = breakDown["surfRange"][i];
        day.generalText = breakDown["generalText"][i];
        multiDay.push(day)
    }
    return multiDay
}