// jquery入口函数
const layer = layui.layer
const form = layui.form
form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ]
})

$(function () {


    rePwd()



})
// 定义重置密码函数
function rePwd() {
    // 为表单添加submit事件
    $("#from-repwd").on('submit', function (e) {
        e.preventDefault()
        // 验证新密码是否一致
        var oldpwd = $("#oldpwd").val()
        var newpwd = $("#newpwd").val()
        var repwd = $('#repwd').val()

        if (newpwd !== repwd) { return layer.msg('两次密码输入不一致！') }
        // 密码验证通过
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data:{oldpwd:oldpwd,newpwd:newpwd},
            headers: {
                authorization: localStorage.getItem('token')

            },
            success: function (res) {
                
                if(res.status!=0){return layer.msg(res.message)}
                layer.msg(res.message+'请重新登录！')
                // 退出调用父级元素退出登录重新登录
                setTimeout(function(){
                    var loginOut = window.parent.document.getElementById('loginOut')
               
                 loginOut.click()
                
                },3000)
               
            }
        })
    })
}