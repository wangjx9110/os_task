(function(global, undefined) {
    
    var PROCESS = { //0号进程PCB
            existPid: { 0: PROCESS },   //用于标识已存在PID和快速存取PCB
            pid: 0,
            childProcess: []    //用于存储进程
    };

    function PCB(pid, ppid, uid) {
        
        this.childProcess = [];

        if (PROCESS.existPid[pid]) {    //pid已存在, 冲突
            throw 'PID:' + pid + 'conflict.';
            return;
        } else if (!PROCESS.existPid[ppid]) {    //ppid不存在, 无法创建
            throw 'PPID:' + ppid + 'doesn\'t exist.';
        } else {    //pid不存在, ppid存在
            existPid
        }

        if (PROCESS[ppid]) {
            PROCESS[ppid].childProcess.push(this);
        } else {
            
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
        console.log(item.pid);
        if (item[childName].length === 0) {
            return;
        } else {
            for (var i = 0, len = item[childName].length; i < len; i++) {
                triverse(item[childName], childName);
            }
        }
    }
})(this);