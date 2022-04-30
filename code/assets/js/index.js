$(function(){
    // 获取用户基本信息
    var layer=layui.layer
    function getUserInfo(){
       $.ajax({
           method:'GET',
           url:'/my/userinfo',
        //    headers:{
        //     Authorization: localStorage.getItem('token')||''
        //    },
           success:function(res){
            if(res.status!==0){
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // 挂载到ajaxprefuilter
        // complete:function(res) {
        //     // console.log('执行了complete回调');
        //     console.log(res);
        //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href='../../../login.html'
        //     }

        // }
       })
    }
    // 获取用户头像的函数
    function renderAvatar(data){
        // 获取用户的昵称
        var name=data.nickname||data.username
        // 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
        // 按需渲染用户的头像
        if(data.user_pic!==null) {
            // 渲染图片头像
            $('.layui-nav-img')
            .prop('src',data.user_pic)
            .show()
            $('.text-avatar')
            .hide()
        } else {
            // 渲染文字头像
            $('.layui-nav-img')
            .hide()
            let first=name[0].toUpperCase()
            $('.text-avatar')
            .html(first)
            .show()
        }

    }
    getUserInfo()
    // 给退出按钮注册绑定事件
    $('#btnLogOut').on('click',function(){
        // 提示用户确认是否推出
        layer.confirm('确定退出吗', {icon: 3, title:'提示'}, function(index){
            //do something
          //   1,清除本地的locationstrange
          localStorage.removeItem('token')
        //   2,跳转到登录页
        location.href='../../../login.html'
        //eg2
            // 官方提供的，必须带。关闭confirm询问框
            layer.close(index);      
            
          });
           
                  
    })
})