(function(global, undefined) {
    var semaphore = { num: 5 };
    var watingQueue = [];
    function wait(semaphore, pid) {
        semaphore.num--;
        if (semaphore.num < 0) {
            watingQueue.push(pid);
            console.log('程序: ' + pid + ' 等待.');
            //BLOCK 当前进程阻塞
        }
    }
    function signal(semaphore) {
        semaphore.num++;
        if (semaphore.num <= 0) {
            var pid = watingQueue.shift();
            console.log('程序: ' + pid + ' 继续执行.' );
        }
    }

    wait(semaphore, 100);
    //something..
    signal(semaphore);

    wait(semaphore, 100);
    wait(semaphore, 200);
    wait(semaphore, 300);
    wait(semaphore, 400);
    wait(semaphore, 500);
    wait(semaphore, 600);
    wait(semaphore, 700);

    signal(semaphore);

})(this);