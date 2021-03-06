(function(global, undefined) {
    
    var PROCESS = {
        0: {
            pid: 0,
            childProcess: []
        }
    };

    function PCB(pid, ppid, uid) {
        
        this.childProcess = [];

        if (PROCESS[pid]) {
            throw 'PID:' + pid + 'conflict.';
            return;
        } else {
            this.pid = pid;
            PROCESS[pid] = this;    //添加到PROCESS加快存取
        }

        if (PROCESS[ppid]) {
            PROCESS[ppid].childProcess.push(this);  //构造树结构
        } else {
            throw 'PPID:' + ppid + 'doesn\'t exist.';
        }

        this.ppid = ppid;
        this.uid = uid;
        console.log('正在给PBC分配内存..PID: ' + pid);
    }

    // PCB.prototype.showChildProcess = function() {
    //     var childProcess = this.childProcess;
    //     console.log('进程: ' + this.pid);
    //     for (var i = 0, len = childProcess.length; i < len; i++) {
    //         console.log('子进程' + (i + 1) + ': '  + childProcess[i]);
    //     }
    // };

    var p1 = new PCB(1, 0, 1);
    var p2 = new PCB(2, 0, 1);
    var p3 = new PCB(3, 1, 1);
    var p4 = new PCB(4, 1, 1);
    var p5 = new PCB(5, 2, 1);
    var p6 = new PCB(6, 2, 1);
    var p7 = new PCB(7, 3, 1);
    var p8 = new PCB(8, 6, 1);
    var p9 = new PCB(9, 7, 1);
    var p10 = new PCB(10, 8, 1);

    function triverse(item, childName) {
        console.log('NOW: ' + item.pid);
        if (item[childName].length === 0) {
            return;
        } else {
            for (var i = 0, len = item[childName].length; i < len; i++) {
                triverse(item[childName][i], childName);
            }
        }
    }

    console.log('深度遍历DFS: ');
    triverse(PROCESS['0'], 'childProcess');
})(this);