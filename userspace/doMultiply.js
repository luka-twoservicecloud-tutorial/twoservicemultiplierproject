function randomNumber(){
  return Math.floor(10*Math.random()+1);
}

function multiplyAgain(sink){
  var seconds = 1;
  console.log('Will retry the multiplication in', seconds, 'seconds');
  setTimeout(doMultiply.bind(null, sink), seconds*1000);
}

function onMultiplySucceeded(sink, mynumber, result){
  console.log('Multiply succeeded for number', mynumber, 'yielding', result);
  multiplyAgain(sink);
}

function onMultiplyFailed(sink, mynumber, reason){
  console.log('Multiply failed for number', mynumber, 'because', reason);
  multiplyAgain(sink);
}

function doMultiply(sink){
  var rn;
  if (!sink.destroyed){
    console.error('sink is destroyed, ending the process!');
    process.exit(1);
    return;
  }
  rn = randomNumber();
  sink.call('multiply',rn).then(
    onMultiplySucceeded.bind(null,sink,rn),
    onMultiplyFailed.bind(null,sink,rn)
  );
}

function go (taskobj) {
  if (!(taskobj && taskobj.sink)) {
    process.exit(1);
  }
  doMultiply(taskobj.sink);
}

module.exports = {
  sinkname: 'Multiplier',
  identity: {name: 'user', role: 'user'},
  task: {
    name: go
  }
};
