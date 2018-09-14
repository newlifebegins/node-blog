
$(document).ready(function() {
    const $topnav = $(".topnav");
    const $login = $("#login");
    const $register = $("#register");
    const $popup = $(".popup");
    let comment = [];
    let page = 1;
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
                comment = [...data];
                $(".comment").find("textarea[name='comment']").val('');
                renderComment();
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
            comment = [...data];
            renderComment();
            console.log(comment);
        },
        error: (xhr) => {
            console.log(xhr);
        }
    })
    var renderComment = () => {
        var html = '';
        let limit = 10;
        let pages = Math.ceil(comment.length / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        let start = (page - 1) * limit;
        let end = Math.min(start + limit, comment.length);
        let pageHtml = '';
        for(var i = 0; i < pages; i ++) {
            pageHtml += `<a href="javascript:;" data-count="${i+1}">${i+1}</a>`
        }
        $(".page").html(`<a href="javascript:;" class="prev">
                            <i class="fa fa-angle-left"></i>
                        </a>
                        ${pageHtml}
                        <a href="javascript:;" class="next">
                            <i class="fa fa-angle-right"></i>
                        </a>
                        <span>共 ${pages} 页</span>
                        `);
        for(var i = start; i < end; i ++) {
            let date = format(`${comment[i]['addTime']}`);
            html += `<dl>
                        <dt>
                            <img src="" alt="">
                        </dt>
                        <dd>
                            <h5 class="name">${comment[i]['username']}<span>${date}</span></h5>
                            <p>${comment[i]['comment']}</p>
                        </dd>
                    </dl>`
        }
        $(".comment").find(".list").html(html);
    }
    $(".page").delegate("a", "click", function() {
        if($(this).hasClass("prev")) {
            page --;
            renderComment();
        } else if($(this).hasClass("next")) {
            page ++;
            renderComment();
        } else {
            page = Number($(this).attr("data-count"));
            renderComment();
        }
    })
})
var format = (time) => {
    let date = new Date(time) || new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    return `${year}年${month}月${day}日 ${hour}:${min}:${sec}`
}
