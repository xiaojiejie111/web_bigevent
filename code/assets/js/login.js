$(function(){
    $('#link_reg').on('click',function(){
        $(".login-box").hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $(".login-box").show()
        $('.reg-box').hide()
    })
    //从layui中获取form对象
    let form=layui.form
    // 从layui中获取layui属性
    var layer=layui.layer
    //通过form.verifu()函数自定义校验方法
    form.verify({
        // 校验密码
        pwd:[
           /^[\S]{6,12}$/,'密码必须是6到12位,且不能出现空格'
        ],
        // 确认密码   value是确认密码密码的值
        repwd:function(value){
            // 先拿到输入密码的值
            var pwd=$('.reg-box [name=password]').val()
            // 两次值进行判断
            // 判断错误提示错误
            if(value!==pwd) {
                return '密码不一致'
            }
        }
    })
    // 监听注册事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        
        $.post('/api/reguser',{
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val(),
        },function(res){
            if(res.status!==0){
                return layer.msg(res.message);;
            } 
            layer.msg('注册成功，请登录')
            $('#link_login').click()
           
        })
    })
    // 监听登录事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.post('/api/login',{
            username:$('#form_login [name=username]').val(),
            password:$('#form_login [name=password]').val(),
        },function(res){
            if(res.status!==0) {
                return layer.msg('登陆失败')
            }
            layer.msg('登录成功')
            // 将登录成功以后的token字符串保存到本地存储
            localStorage.setItem('token',res.token)
            // 跳转到后台主页
            location.href='../../../index.html'
        })

    })
})