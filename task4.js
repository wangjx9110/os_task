(function(global, undefined) {
    
    var PROCESS = {
        0: {
            childProcess: []
        }
    };

    var QUEUES = [ [], [], [], [], [], [], [], [], [] ];

    function getRandomNumber(start, end) {  //生成 [start, end] 之间的随机整数
        return start + Math.floor(Math.random() * (end - start + 1));
    }

    function run() {
        var timeslice = getRandomNumber(20, 50);
        console.log('时间片长度为: ' + timeslice);

        while (true) {  //单个时间片
            for (var i = 0, len = QUEUES.length; i < len; i++) {
                var task;
                if (task = QUEUES[i].shift()) {
                    console.log('当前正在执行进程: ' + task.pid);
                    for (var j = 0; j < timeslice && task.needTime > 0; j++) { //有一个不满足就停止执行
                        task.needTime--;
                    }
                    console.log('进程还需时间: ' + task.needTime);
                    if (task.needTime > 0) {
                        QUEUES[i].push(task);
                    } else {
                        console.log('进程PID: ' + task.pid + ' 执行完毕.');
                    }
                    break;
                }
            }
        }
    }

    function PCB(pid, ppid) {
        
        this.childProcess = [];

        if (PROCESS[pid]) {
            throw 'PID:' + pid + 'conflict.';
            return;
        } else {
            this.pid = pid;
            PROCESS[pid] = this;
        }

        if (PROCESS[ppid]) {
            PROCESS[ppid].childProcess.push(this);
        } else {
            throw 'PPID:' + ppid + 'doesn\'t exist.';
        }

        this.ppid = ppid;

        console.log('正在给PBC分配内存..PID: ' + pid);

        //NEW
        this.needTime = getRandomNumber(100, 300);
        console.log('需要时间: ' + this.needTime);
        this.priority = getRandomNumber(0, 8);
        console.log('优先级为: ' + this.priority);

        QUEUES[this.priority].push(this);

    }

    var p1 = new PCB(1, 0);
    var p2 = new PCB(2, 0);
    var p3 = new PCB(3, 1);
    var p4 = new PCB(4, 1);
    var p5 = new PCB(5, 2);
    var p6 = new PCB(6, 2);
    var p7 = new PCB(7, 3);
    var p8 = new PCB(8, 3);
    var p9 = new PCB(9, 4);
    var p10 = new PCB(10, 4);
    // var p11 = new PCB(11, 5);
    // var p12 = new PCB(12, 5);
    // var p13 = new PCB(13, 6);
    // var p14 = new PCB(14, 6);
    // var p15 = new PCB(15, 7);

    run();
})(this);