
process.on('message', function(m) {
    console.log(m);
});

process.on('SIGINT', function() {
    console.log('CHILD1 TERMINATED..');
});