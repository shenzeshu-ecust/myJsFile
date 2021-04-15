// import {sayHello} from './57-m1';
var btn = document.querySelector('button');
btn.addEventListener('click',()=>{
    // 想在这里调用另一个文件的函数方法。普通想法是在本js顶部 import
    // ---------------动态import---------- 
    import('./57-m1.js').then(module=>{
        console.log(module);
        module.sayHello()
    })
})