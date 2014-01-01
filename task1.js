(function(global, undefined) {
    function PCB() {
        //A.进程标识符
        this.pid = pid;
        this.ppid = ppid;
        this.uid = uid;
        //B.处理机状态

    }
    function GREG(opt) {
        this.AX = opt.AX;
        this.BX = opt.BX;
        this.CX = opt.CX;
        this.DX = opt.DX;
        this.BP = opt.BP;
        this.SP = opt.SP;
        this.SI = opt.SI;
        this.DI = opt.DI;
        
    }
})(this);