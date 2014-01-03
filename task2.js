(function(global, undefined) {
    //task1
    var fork = require('child_process').fork;

    var PROCESS_NUM = 2;

    var child1 = fork(__dirname + '/task2-1.js');

    child1.on('exit', function(code, signal) {
        console.log('Child Process 1 Terminated. SIGNAL:' + signal);
        PROCESS_NUM--;
        if (PROCESS_NUM === 0) {
            console.log('Parent Process Terminated.');
            process.exit(0);
        }
    });

    var child2 = fork(__dirname + '/task2-2.js');

    child2.on('exit', function(code, signal) {
        console.log('Child Process 2 Terminated. SIGNAL:' + signal);
        PROCESS_NUM--;
        if (PROCESS_NUM === 0) {
            console.log('Parent Process Terminated.');
            process.exit(0);
        }
    });

    process.on('SIGINT', function() {
        console.log('Parent received SIGINT');
        child1.kill();
        child2.kill();
    });

    var child3 = fork(__dirname + '/task2-3.js');
    var child4 = fork('task2-4');
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', function(data) {
        console.log(data);
    });

    var child5 = fork('task2-5');
    child5.on('message', function(m) {
        console.log('Parent Process received message from child5: ' + m);
    });
    child5.send('The message send from Parent Process.');

})(this);