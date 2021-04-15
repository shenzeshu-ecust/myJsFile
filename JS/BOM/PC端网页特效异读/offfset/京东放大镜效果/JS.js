window.addEventListener('load', function() {
    var show = document.querySelector('.show');
    var yellow = document.querySelector('.yellow');
    var big = document.querySelector('.big');
    show.addEventListener('mouseover', function(e) {
        yellow.style.display = 'block';
        big.style.display = 'block';


    })
    show.addEventListener('mouseout', function() {
        yellow.style.display = 'none';
        big.style.display = 'none';
    })
    show.addEventListener('mousemove', function(e) {
        // 把鼠标在盒子内的坐标给遮盖层，因为遮盖层是绝对定位，父级是相对定位的盒子
        var x = e.pageX - this.offsetLeft; //offsetLeft是距离左侧 没有定位的 盒子的距离，需要检查父级元素有没有定位！

        var y = e.pageY - this.offsetTop;

        //需要减去盒子的高宽的一半，使指针在遮盖层中级
        //去单位
        var xMask = x - yellow.offsetWidth / 2;
        var yMask = y - yellow.offsetHeight / 2;
        //不能超过盒子大小   
        //在固定宽高内移动   widthMax = show.width - yellow.width
        var xMax = show.offsetWidth - yellow.offsetWidth;
        var yMax = show.offsetHeight - yellow.offsetHeight;
        if (xMask <= 0) {
            xMask = 0;
        } else if (xMask >= xMax) {
            xMask = xMax;

        }
        if (yMask < 0) {
            yMask = 0;
        } else if (yMask > yMax) {
            yMask = yMax;
        }


        yellow.style.left = xMask + 'px';
        yellow.style.top = yMask + 'px';
        // 2 大图片跟随移动
        // 大图片移动距离 = 大图片最大移动距离 * （遮挡层移动距离/遮挡层最大移动距离）
        // 与小图片反方向移动
        var pic = document.querySelector('.big-pic');
        //图片比盒子大：图片大小- 盒子大小 = 最大移动距离
        var xBigMax = pic.offsetWidth - big.offsetWidth;
        var yBigMax = pic.offsetHeight - big.offsetHeight;

        var xBig = xBigMax * (xMask / xMax);
        var yBig = yBigMax * (yMask / yMax);
        pic.style.left = -xBig + 'px';
        pic.style.top = -yBig + 'px';
    })





})