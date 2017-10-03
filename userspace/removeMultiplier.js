function onRemoveSucceeded (result) {
  console.log('del succeeded', result);
  process.exit(0);
}

function go (taskobj) {
  if (!(taskobj && taskobj.sink)) {
    process.exit(1);
  }
  taskobj.sink.call('del', 'multiplier').then(
    onRemoveSucceeded
  );
}

module.exports = {
  sinkname: 'Config',
  identity: {name: 'user', role: 'user'},
  task: {
    name: go
  }
};
