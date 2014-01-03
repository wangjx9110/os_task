
process.on('message', function(m) {
    console.log(m);
});

process.on('SIGINT', function() {
    console.log('CHILD2 TERMINATED..');
});