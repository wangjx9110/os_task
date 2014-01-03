process.on('message', function(m) {
    console.log('Child Process 5 received message: ' + m);
});

process.send('The message send from Child Process 5.');