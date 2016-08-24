module.exports = function(data){
  let spots = [];
  for(var key in data){
    let spot = data[key];
    spot.spot = key;
    spots.push(spot);
  }
  return spots      
}