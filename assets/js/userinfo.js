
// jquery入口函数
const layer = layui.layer
$(function(){

    getUsername()
    // 更新用户信息
    // 监听表单的submit事件
    $("#updateUserinfo").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updateinfo',
            headers:{
                authorization:localStorage.getItem('token')

            },
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status!=0){return layer.msg('更新信息失败！')}
                layer.msg('更新信息成功！')
                window.parent.getUserinfo()
            }
        })
    })
})
// 获取用户名
function getUsername(){
    // 发起ajax请求获得用户名
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        headers:{
            authorization:localStorage.getItem('token')
        },
        success:function(res){
           if(res.status!=0){return layer.msg('获取用户信息失败！') }
           $('#username').val(res.data.username)
           $('#nickname').val(res.data.nickname)
           $('#email').val(res.data.email)
        }
        
    })
}
