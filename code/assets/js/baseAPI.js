$(function(){
    // 每次调 $.get() $.post() $.ajax()的时候会调用ajaxPrefilter函数
    //在这个函数中。可以拿到我们给ajax提供的数据
    $.ajaxPrefilter(function(option){
        // 在发起真正的ajax请求之前，统一拼接请求的根路径
       
        option.url='http://www.liulongbin.top:3007'+option.url
    //  判断有没有my开头的，开的的话有权限
         if (option.url.indexOf('/my/')!==-1) {
        // 统一为有权限的借口设置headers请求头
            option.headers={
             Authorization: localStorage.getItem('token')||''
             }
         }
      // 全局统一挂载complete回调函数
        option.complete=function(res){
            if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！') {
                localStorage.removeItem('token')
                location.href='../../../login.html'
            }
        }
       
    })
})