$.ajaxPrefilter(function(options){
    // 在每次发起ajax请求前，会先执行这个函数配置ajax的参数
    // options为ajax的参数配置
    options.url='http://127.0.0.1:8080'+options.url
   
    // 为有权限的接口全局挂载complete回调函数，防止出现没有token验证而登录到后台
    options.complete = function(res){
        if(res.responseJSON.status ==1 &&res.responseJSON.message =='身份认证失败！'){
            // 2 强制跳转到登录页面
            location.href = '/login.html'
            // 1 强制清空token
            localStorage.removeItem('token')
        }
    }
})