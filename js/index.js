(function () {

    //-----------------------------------------------------------------
    //todoList Practice
    //2022-5-20-author-liyfn 
    // Web Api,LocalStorage
    //-----------------------------------------------------------------

    var input = document.querySelector('#title');
    var ol = document.querySelector('#todolist');
    var ol_comp = document.querySelector('#completed');
    var arr = [];

    //页面加载--------------------------------------------------------
    //拿数据
    var getStr = localStorage.getItem('key');
    if (getStr) {

        arr = JSON.parse(getStr);
    }

    function load() {


        ol.innerHTML = '';
        ol_comp.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = `<input type="checkbox"/><p>${arr[i].value}</p><a href="javascript:;"></a>`;

            //删除
            var a = li.querySelector('a')
            a.setAttribute('data-index', i)
            a.addEventListener('click', function () {
                arr.splice(this.dataset.index, 1);
                local(arr);
                load();
            })

            //切换
            var check = li.querySelector('input');
            check.addEventListener('click', function () {
                var index = this.parentNode.querySelector('a').dataset.index;

                if (this.checked) {
                    arr[index].key = false;
                    local(arr);
                    load()
                }
                else {
                    arr[index].key = true;
                    local(arr);
                    load()
                }

            })

            //拖拽
            // li.addEventListener('mousedown', function (e) {
            //     var y_s = this.offsetTop;
            //     var y_f = this.parentNode.offsetTop;
            //     var y = y_s + y_f;//元素绝对位置
            //     var y_sub = e.pageY - y;//鼠标在元素内部的距离
            //     var mouse_begin = e.pageY;
            //     //添加移动事件
            //     function move(e) {
            //         li.style.top = `${e.pageY - y_f - y_sub - y_s}px`
            //     }
            //     document.addEventListener('mousemove', move)
            //     document.addEventListener('mouseup', function (e) {

            //         //    移动个数
            //         var index = Math.floor((e.pageY - mouse_begin) / 42)

            //         console.log(index)
            //         document.removeEventListener('mousemove', move)
            //     })

            // })



            //页面分流
            //根据数组键值，判断是在页面哪一部分
            if (arr[i].key) {
                ol.insertBefore(li, ol.children[0]);
            }
            else {
                li.classList.add('completed');
                li.querySelector('input').checked = true;
                ol_comp.insertBefore(li, ol_comp.children[0]);

            }
            //存数据
            local(arr);

        }
    }

    load();


    //input绑定事件------------------------------------------------------

    input.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if (this.value != '') {
                arr.push({ key: true, value: this.value })
                local(arr);
                load();
                this.value = '';
            }
        }
    })


    //数据存储----------------------------------------------------------

    function local(arr) {
        var loadStr = JSON.stringify(arr);
        localStorage.setItem('key', loadStr);
    }

})()
