$(function(){
    getUserinfo()
    loginOut()
})
 // 退出登录功能
 function loginOut(){
    $("#loginOut").click(function(){
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
}

function getUserinfo(){
      // 发起Ajax请求获取用户的信息
      $.ajax({
        method:'GET',
        url:'/my/userinfo',
       headers:{
            authorization:localStorage.getItem('token')
       },
        success:function(res){
            if(res.status!=0){return console.log(res)}

            renderAvatar(res)
        },
     
    })
    
}
// 渲染头像函数
function renderAvatar(res){
    $("#name").html('欢迎 '+res.data.username)
    
    var user = res.data.nickname || res.data.username
    
    var firstName = user.substring(0,1).toUpperCase()
    if(res.data.user_pic){
        $('#avatar').attr('src',res.data.user_pic)
        $('#text-avatar').hide()
    }
    else{
        $('#avatar').hide()
        $('#text-avatar').html(firstName)
    }
   

}