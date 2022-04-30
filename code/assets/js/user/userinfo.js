$(function(){
    var form=layui.form
    form.verify({
        nikename:function(value){
           if(value.leng>6) {
               return '昵称长度在1-6个字符内'
           }
        }
    })
    // 初始化用户基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 快速为表单赋值
                form.val('fromUserInfo',res.data)
            }
        })
    }
    initUserInfo()
    $("#btnReset").on('click',function(e){
        // 阻止表单默认重置行为
        e.preventDefault()
       initUserInfo()
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg('更新信息失败')
                }
                layui.layer.msg('更新信息成功')
                Window.parent.getUserInfo()
            }
        })
    })
})