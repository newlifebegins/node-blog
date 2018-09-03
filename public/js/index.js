
$(document).ready(function() {
    const $topnav = $(".topnav");
    const $login = $("#login");
    const $register = $("#register");
    const $popup = $(".popup");
    $topnav.delegate(".login", "click", (event) => {
        $login.show();
    })
    $topnav.delegate(".register", "click", (event) => {
        $register.show();
    })
    $popup.delegate(".close", "click", (event) => {
        $popup.hide();
    })
    $popup.delegate(".login", "click", (event) => {
        $register.hide();
        $login.show();
    })
    $popup.delegate(".register", "click", (event) => {
        $login.hide();
        $register.show();
    })
    // TODO: 注册
    $register.delegate("input[type='submit']", "click", () => {
        $.ajax({
            type: 'POST',
            url: '/api/user/register',
            dataType: 'json',
            data: {
                username: $register.find("input[name='username']").val(),
                password: $register.find("input[name='password']").val(),
                repassword: $register.find("input[name='repassword']").val()
            },
            success: (data) => {
                console.log(data);
                if(data.code == 0) {
                    console.log('注册成功');
                    $register.hide();
                    var $tip = $(".tip");
                    $tip.show().html(data.message);
                    setTimeout(() => {
                        $tip.hide();
                        // $topnav.find(".name").html(`${data.userInfo.username} 您好，欢迎来到我的博客！`)
                    }, 2000)
                }
            },
            error: (xhr) => {
                console.log(xhr);
            }
        });
        return false;
    })
})
