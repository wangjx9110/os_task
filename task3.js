(function(global, undefined) {
    var partitionTable = [
        {
            start: 0,    
            size: 67108864  // 64 * 1024 * 1024 -> 67108864
        }
    ];

    function allocate_firstFit(size) {  //首次适应算法
        for (var i = 0, len = partitionTable.length; i < len; i++) {
            var item = partitionTable[i];
            if (item.size >= size) {
                console.log('正在分配内存.. 内存大小: ' + size + ' 起始地址: ' + item.start);
                item.start += size;
                item.size -= size;
                console.log('分配完成..');
                return;
            }
        }
        //循环结束, 没有足够大小的内存
        console.log('内存空间不足, 无法分配内存.');
    }

    function allocate_firstFitCycle(size) {  //循环首次适应算法
        var start = arguments.callee.lastFitIndex;
        var count = 0;
        for (var i = start; count == 0; ) {
            var item = partitionTable[i];
            if (item.size >= size) {
                console.log('正在分配内存.. 内存大小: ' + size + ' 起始地址: ' + item.start);
                item.start += size;
                item.size -= size;
                console.log('分配完成..');
                arguments.callee.lastFitIndex = i;
                return;
            }
            //更新i值及循环终止条件
            i = (i + 1) % partitionTable.length;
            if (i == start) {
                count++;
            }
        }
        //循环结束, 没有足够大小的内存
        console.log('内存空间不足, 无法分配内存.');        
    }
    allocate_firstFitCycle.lastFitIndex = 0;    //初始化为0

    function allocate_bestFix(size) {  //最佳适应算法
        function sortBySize(a, b) {
            return a.size - b.size;
        }
        partitionTable.sort(sortBySize);

        for (var i = 0, len = partitionTable.length; i < len; i++) {
            var item = partitionTable[i];
            if (item.size >= size) {
                console.log('正在分配内存.. 内存大小: ' + size + ' 起始地址: ' + item.start);
                item.start += size;
                item.size -= size;
                console.log('分配完成..');
                return;
            }
        }
        //循环结束, 没有足够大小的内存
        console.log('内存空间不足, 无法分配内存.');
    }

    function retrieve(start, size) {
        console.log('正在释放内存.. 内存大小: ' + size + ' 起始地址: ' + start);
        function sortByStart(a, b) {
            return a.start - b.start;
        }
        partitionTable.sort(sortByStart);   //如果采用最佳适应算法, 则分区表中不是按顺序的

        for (var i = 0, len = partitionTable.length; i < len; i++) {
            //查找释放位置
            var item = partitionTable[i];
            var previousItem = partitionTable[i - 1];
            if (item.start > start) {   //释放空间在 i-1 和 i 之间
                if (previousItem === undefined) {   //没有空闲块处在释放块之前
                    if ((start + size) === item.start) {   //相邻
                        item.start = start;
                        item.size += size;
                    } else {    //不相邻
                        partitionTable.unshift({ start: start, size: size });
                    }
                } else {
                    //1.释放分区开始处与空闲分区相连
                    if (start === (previousItem.start + previousItem.size)) {
                        if ((start + size) === item.start) {  //2.并且与后一个相连
                            previousItem.size = previousItem.size + size + item.size;
                            partitionTable.splice(i, 1);    //删除当前空闲分区表项
                        } else {    //不与后一个相连
                            previousItem.size += size;
                        }
                    } else if ((start + size) === item.start) { //3. 只与后面相连
                        item.start = start;
                        item.size += size;
                    } else {    //4.前后都不相连
                        partitionTable.splice(i, 0, { start: start, size: size });
                    }
                }
                return;
            }
        }
        //TIPS: 此处没有退出.说明没有空闲块处在释放块后面 (item.start <= start)
        if (item.start === start) {    //相邻
            partitionTable[partitionTable.length - 1].size += size;
        } else {    //不相邻
            partitionTable.push({ start: start, size: size });
        }
        console.log('释放完成..');
    }

    allocate_firstFit(10000);
    allocate_firstFit(10000);
    retrieve(1000, 10);
    retrieve(10, 1);
    retrieve(11, 2);
    retrieve(19999, 1);
    console.log(partitionTable);


})(this);