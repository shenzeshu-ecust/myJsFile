window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var w = focus.offsetWidth;
    //1 设置一个index，使得每过2s，index加1. 滚动的距离就是index*w
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translateX = -index * w;
        //优雅过渡：transitions  注意s单位
        ul.style.transition = 'all .3s';
        //使用transform的translateX移动盒子完成动画效果
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
    // 过渡结束才切换 ：监听事件：transitionend
    // 最后一张图到达时index = 3，此时index重置0
    ul.addEventListener('transitionend', function() {
        //2 无缝滚动
        // 如果index = 3 说明到了最后一张，需要切换回第一张，index重置0.且这个过程不需要动画
        if (index >= 3) {
            index = 0;
            // 无需动画
            ul.style.transition = 'none';
            translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            //说明到了看不见的那一张，要回到index = 2
            index = 2;
            ul.style.transition = 'none';
            translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';

        }
        // 3 小圆点跟随变化(这里不用for循环)：在过渡结束后才变化
        // 1)把ol里带有current类名的选出，并去掉类名 classList.remove('current);
        var ol = document.querySelector('ol');
        ol.querySelector('li.current').classList.remove('current');
        // 2)对于当前索引号的小li，加上current类名 add('current')
        ol.children[index].classList.add('current');
    });
    // 4 手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    var flag = false; // 用来判断是否移动了，不移动不执行end中的操作
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 触摸ul时就要停止自动滑动计时器
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX; //盒子原来位置 + 移动距离 = 最终位置
        // 手指移动时 不需要动画过渡
        ul.style.transition = 'none';
        // 移动
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault(); //取消滚动屏幕行为；
    });
    // 5 手指滑动超过一定距离就进入下一张(触摸结束时)
    ul.addEventListener('touchend', function(e) {
        // move过才执行，否则单纯点击一下不执行
        if (flag) {
            // moveX 是全局变量 可以访问到
            if (Math.abs(moveX) > 50) {
                //判断左右滑
                // 左滑为负，右滑为正
                if (moveX > 0) {
                    index--; //右滑index减1
                } else {
                    index++;
                }
                // 滑动，且有动画效果
                ul.style.transition = 'all .3s';
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';

            } else {
                //小于50，返回原位(index不变)
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';

            }
        }
        //手指离开：开启定时器轮播
        //先关闭之前的定时器
        clearInterval(timer);
        //开启
        timer = setInterval(function() {
            index++;
            var translateX = -index * w;
            //优雅过渡：transitions  注意s单位
            ul.style.transition = 'all .3s';
            //使用transform的translateX移动盒子完成动画效果
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    })
})