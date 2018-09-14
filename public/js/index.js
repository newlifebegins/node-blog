
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
                    $register.find(".error").hide();
                    $register.hide();
                    var $tip = $(".tip");
                    $tip.show().html(data.message);
                    setTimeout(() => {
                        $tip.hide();
                    }, 2000)
                } else {
                    $register.find(".error").show();
                }
            },
            error: (xhr) => {
                console.log(xhr);
            }
        });
        return false;
    })
    // TODO: 登录
    $login.delegate("input[type='submit']", "click", () => {
        $.ajax({
            type: 'POST',
            url: '/api/user/login',
            dataType: 'json',
            data: {
                username: $login.find("input[name='username']").val(),
                password: $login.find("input[name='password']").val()
            },
            success: (data) => {
                console.log(data);
                if(data.code == 0) {
                    window.location.reload();
                } else {
                    $login.find(".error").show();
                }
            },
            error: (xhr) => {
                console.log(xhr);
            }
        });
        return false;
    })
    // TODO: 退出登录
    $topnav.delegate(".logout", "click", () => {
        $.ajax({
            type: 'GET',
            url: '/api/user/logout',
            dataType: 'json',
            data: {},
            success: (data) => {
                if(data.code == 0) {
                    window.location.reload();
                }
            },
            error: (xhr) => {
                console.log(xhr);
            }
        });
        return false;
    })
    // TODO: 评论
    $(".comment").delegate("input[type='submit']", "click", () => {
        $.ajax({
            type: 'POST',
            url: '/api/content/comment',
            dataType: 'json',
            data: {
                id: $(".comment").find("input[name='contentId']").val(),
                comment: $(".comment").find("textarea[name='comment']").val()
            },
            success: (data) => {
                var data = data.data.comment.reverse();
                $(".comment").find("textarea[name='comment']").val('');
                renderComment(data);
            },
            error: (xhr) => {
                console.log(xhr);
            }
        })
        return false;
    })
    $.ajax({
        type: 'GET',
        url: '/api/show',
        data: {
            id: $(".comment").find("input[name='contentId']").val()
        },
        dataType: 'json',
        success: (data) => {
            var data = data.data.comment.reverse();
            renderComment(data)
        },
        error: (xhr) => {
            console.log(xhr);
        }
    })
    var renderComment = (data) => {
        var html = '';
        for(var i = 0; i < data.length; i ++) {
            html += `<dl>
                        <dt>
                            <img src="" alt="">
                        </dt>
                        <dd>
                            <h5 class="name">${data[i]['username']}</h5>
                            <p>${data[i]['comment']}</p>
                        </dd>
                    </dl>`
        }
        $(".comment").find(".list").html(html);
    }
})
