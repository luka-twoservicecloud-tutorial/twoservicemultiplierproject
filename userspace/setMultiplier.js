function onPutSucceeded (result) {
  console.log('put succeeded', result);
  process.exit(0);
}

function go (taskobj) {
  if (!(taskobj && taskobj.sink)) {
    process.exit(1);
  }
  taskobj.sink.call('put', 'multiplier', 5).then(
    onPutSucceeded
  );
}

module.exports = {
  sinkname: 'Config',
  identity: {name: 'user', role: 'user'},
  task: {
    name: go
  }
};
