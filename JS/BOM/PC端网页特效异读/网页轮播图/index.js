window.addEventListener('load', function() {
    // 1 鼠标进入focus，左右按钮显示；离开隐藏
    var focus = document.querySelector('.focus');
    var arrow = document.querySelector('.arrow');
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    focus.addEventListener('mouseenter', function() {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        //停止计时器：不轮播
        clearInterval(timer);
        timer = null;

    })
    focus.addEventListener('mouseleave', function() {
            arrowl.style.display = 'none';
            arrowr.style.display = 'none';
            // 离开，启动轮播：不要加var ，timer已经声明过了，再次声明就是生成新的计时器，会越来越快
            timer = setInterval(function() {
                //调用点击功能
                arrowr.click();
            }, 2000);
        })
        // 2 根据图片数量自动添加圆点，并绑定事件
    var ul = focus.querySelector('ul');
    var circle = document.querySelector('.circle');
    //图片宽度
    var picWidth = focus.offsetWidth;
    //不用下面的。用ul的children
    // var lis = focus.querySelectorAll('li');
    for (let i = 0; i < ul.children.length; i++) {
        //1创建元素
        var li = document.createElement('li');
        //增加自定义属性：可以判断点击了哪个li
        li.setAttribute('index', i);
        //2添加元素
        circle.appendChild(li);
        // 3 给每个li添加点击事件:1)排他变色 2)切换图片（利用自定义属性）
        li.addEventListener('click', function() {

            //1） 变色
            for (let i = 0; i < circle.children.length; i++) {

                //这么写错误，这里li只有一个并不是一个数组！ li[i].className = '';
                //利用children
                circle.children[i].className = '';
            }
            this.className = 'current';
            //2） 切换图片
            // var index = li.getAttribute('index'); 这个用li不行，index会一直保持3
            var index = this.getAttribute('index');
            // bug修改：当点击li ，将index赋值给num,circle_num
            num = index;
            circle_num = index;
            // console.log(index);

            // 左移
            animate(ul, -index * picWidth);
        })
    }
    //默认第一个选中：黄色
    circle.children[0].className = 'current';
    var arrowr = document.querySelector('.arrow-r');
    var num = 0;
    //小圆圈跟随图片
    var circle_num = 0;
    // 4 添加一个新的li。复制第一个li; clone;
    //使得当到最后一张图片时显示的是第一张图片，再点击，ul回到最左侧
    var li_clone = ul.children[0].cloneNode(true);
    ul.appendChild(li_clone);
    // 5 右按钮

    // ----------  节流阀：防止轮播按钮点击过快造成播放过快
    //-----------  目的：让 上一个动画内容执行完毕再执行下一个函数动画
    //-----------  思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数
    //-----------  设置一个变量flag = true  if(flag) {flag = false;do something}
    //-----------   动画执行完毕，flag = true
    var flag = true;
    arrowr.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 最后一张图 ul回到原位
                if (num == ul.children.length - 1) {
                    num = 0;
                    ul.style.left = 0;
                }
                num++;
                // 动画执行完毕，打开节流阀
                animate(ul, -picWidth * num, function() {
                    flag = true;
                });
                circle_num++;
                // 到最后一张图时重置
                if (circle_num == circle.children.length) {
                    circle_num = 0;
                }
                colorChange();
            }


        })
        // 6 左按钮

    arrowl.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 第一张图 ul回到最后一张图
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * picWidth + 'px'; //单位
            }
            num--;

            animate(ul, -picWidth * num, function() {
                flag = true;
            });
            circle_num--;
            // 如果circle_num < 0说明第一张图片，则小圆圈要改为最后一个 
            // if (circle_num < 0) {
            //     circle_num = circle.children.length - 1; //3 但是circle.children[3]就是最后一个元素
            // }
            //三元表达式
            circle_num = circle_num < 0 ? circle.children.length - 1 : circle_num;
            colorChange();
        }
    });
    // 圆圈改色：排他
    function colorChange() {
        for (let i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';

        }
        circle.children[circle_num].className = 'current';
    }
    // 7 自动播放
    var timer = setInterval(function() {
        //调用点击功能
        arrowr.click();
    }, 2000);


})