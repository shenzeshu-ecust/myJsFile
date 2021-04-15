// 1 缓慢动画（让移动速度慢慢减小）：让盒子每次移动的距离（步长）慢慢减小
// 2 缓慢动画移动公式：步长= （目标值 - 当前位置）/ 10
// 3 停止条件：到达目标位置：停止计时器
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //步长写在 定时器内：每次都要变化
        // 步长需要取整 ，否则到不了目标位置
        // 步长为正 取大
        // 步长为负 取小（此函数也可实现倒退效果）
        var step = (target - obj.offsetLeft) / 10;
        //!!!        step重新赋值
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写在定时器事件结束后
            //判断有没有回调函数，有则 执行
            // if (callback) {
            //     callback();
            // }
            callback && callback(); //两侧都为true才会执行
        }
        //变步长~
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);

}