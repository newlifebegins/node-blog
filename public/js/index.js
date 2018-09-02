
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
            },
            error: (xhr) => {
                console.log(xhr);
            }
        });
        return false;
    })
})
