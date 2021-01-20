// jquery入口函数
$(function(){
    var form = layui.form
    var layer = layui.layer
    // 点击事件，切换显示登录和注册页面
    $('#goREG').on('click',function(){
        $('.login').hide()
        $('.regBox').show()
    })
    $('#goLogin').on('click',function(){
        $('.login').show()
        $('.regBox').hide()
    })
    // 对表单进行验证
    form.verify({
        // 自定义密码验证规则
        pass:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        rePwd:function(){
            if($('#rePWD').val()!==$('#pwd').val()){
                return '两次密码输入不一致！'
            }
        },
    });  
    // 发起ajax请求注册用户
    //1 为表单添加submit事件
    $('#RegForm').on('submit',function(e){
        // 1.1阻止表单的默认提交行为
        e.preventDefault()
        var data={
            username:$('#RegForm [name=username]').val(),
            password:$('#RegForm [name=password]').val()
        }
        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:8080/api/register',
            data:data,
            success:function(res){
                if(res.status!==0){
                    console.log(res)
                    return layer.msg('注册失败！')}
                    layer.msg('注册成功！')
                  $("#goLogin").click()
            }
            
        
        })
    })

    // 2 发起ajax请求登录
    $('#loginForm').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:8080/api/login',
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status!=0){return layer.msg('登录失败！')}
                
                layer.msg('登录成功！')
                localStorage.setItem('token',res.token)
                
                location.href= './index.html'
            }
        })
    })

})