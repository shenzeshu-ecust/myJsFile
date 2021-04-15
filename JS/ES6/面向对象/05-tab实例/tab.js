// let that;
let num = 0;
class Tab {
    constructor(id) {
        // that = this;
        this.main = document.querySelector(id);
        this.tabadd = this.main.querySelector('.tabadd')

        this.ul = this.main.querySelector('.header ul')
        this.content = this.main.querySelector('.content')
        this.init() //调用下初始化——使得在new实例的时候 构造器就能初始化
    }
    init() {
        // 初始化 绑定事件
        this.updateNode()
            // 初始化每个tab 使其绑定一个事件
            // 1 切换按钮绑定
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i; //添加一个index属性
            // this.lis[i].onclick = function() {
            //     // console.log(this.index); //这里this 就是lis[i]
            // }
            this.lis[i].onclick = this.togggleTab.bind(this.lis[i], this) //把这里的this作为参数传进去供使用，但不改变原来的this指向
            this.remove[i].onclick = this.removeTab.bind(this.remove[i], this)
            this.editboxes[i].ondblclick = this.editTab
                // section 双击逻辑和菜单栏一样 
            this.sections[i].ondblclick = this.editTab
        }
        // 2 添加按钮绑定
        this.tabadd.onclick = this.addTab.bind(this.tabadd, this)
    }
    updateNode() {
        // 新添加按钮模块 需要重新绑定事件
        this.lis = this.main.querySelectorAll('li')
            // 下面的这些 也要每次都重新获取
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.close')
        this.editboxes = this.main.querySelectorAll('ul li span:first-child')

    }
    togggleTab(that) {
        // 清空其他类名
        that.clearClass()
            // 这里this指向lis[i] 它没有sections 所以用保存的that
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    addTab(that) {
        // 每次先清除其他模块的选中
        that.clearClass()
        num = num + 1
        let li = '<li class="liactive">新增模块<span class="close">X</li>'
            // 这里this 指向 tabadd按钮
            // insertAdjacentHTML 可以直接添加html元素  beforeend 添加在元素里面的最后  等同于appendChild
        that.ul.insertAdjacentHTML('beforeend', li)
            // 添加content内容
        let section = '<section class="conactive">新内容' + num + '</section>'
        that.content.insertAdjacentHTML('beforeend', section)
            // 添加完元素后 绑定事件_重新获取一次存在的元素
        that.init()

    }
    removeTab(e, that) {
        // 阻止父元素点击事件冒泡
        e.stopPropagation()
            // 获取父元素的index属性 this.parentNode.index
        let index = this.parentNode.index
            // console.log(index);
            // 删除对应模块、内容
        that.lis[index].remove();
        that.sections[index].remove();
        that.init() // 重新初始化下
            // 1 删除后 前一个设置为触发 ————使用点击事件
            // 2 如果删除的不是选中的，那么保持选中。就是不执行前一个按钮的click（）
            // 3 也就是如果有选中 那么保持——不继续执行
        if (document.querySelector('.liactive')) return
        index--
        // index不为负数（删到最后一个时）才执行点击事件
        that.lis[index] && that.lis[index].click()
    }
    editTab(e) {
        // 先获取下原本的内容
        let str = this.innerHTML
            // 先取消本身的双击选中文字
            // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 后加入一个文本框
        this.innerHTML = '<input type="text"/>'
            // 双击后 文本框文字默认为原先内容 且为全部选中状态
            // this就是span元素 里面的第一个元素就是文本框
        let input = this.children[0]
        input.value = str
        input.select()
        input.onblur = function() {
                // 这里的this就是input文本框
                this.parentNode.innerHTML = this.value //把文本框的内容给父元素span作为内容
            }
            // 回车也能实现确认
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur() //主动调用失去焦点事件
            }
        }
    }
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = ''
            this.sections[i].className = ''
        }
    }
}
new Tab('#main')