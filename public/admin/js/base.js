$(document).ready(function(){
    // 左侧导航
    $(".item_a").on("click",function(){
        $(this).parent().siblings(".item").find("ul").hasClass("on") ? $(this).css({"color":"#006cfe"}).parent().siblings(".item").find(".item_a").find("i").css({"transform":"rotate(0deg)"}) : $(this).css({"color":"rgba(255,254,254,0.5)"});
        $(this).parent(".item").siblings(".item").find("ul").hide().removeClass("on").end().find(".item_a").css({"color":"rgba(255,254,254,0.4)"});
        $(this).siblings("ul").slideToggle("slow").toggleClass("on");
        $(this).siblings("ul").hasClass("on") ? $(this).css({"color":"#006cfe"}).find("i").css({"transform":"rotate(-90deg)"}) : $(this).css({"color":"rgba(255,254,254,0.5)"}).find("i").css({"transform":"rotate(0deg)"});
        return false;
    }).eq(0).trigger("click");
    $(".navLeft .btn").on("click",function(){
        $(this).toggleClass("open");
        $(".navLeft").toggleClass("slide_hide");
    });

    $(".item li a").on("click",function(){
        $(".item li a").removeClass("on");
        $(this).addClass("on");
        $("#iframe").show().attr("src",$(this).attr("href")).next(".list").hide();
        return false;
    });

    // 内容高度
    setTimeout(function(){
        var heightWin = $(window).height();
        var heightDoc = $(document).height();
        $(".navLeft").css({"min-height":heightWin-50});
        $(".navLeft").css({"height":heightWin-50});
        $(".content").css({"min-height":heightWin-50});
        $(".content").css({"height":heightWin-50});
        $(window).resize(function(){
            var heightWin = $(window).height();
            var heightDoc = $(document).height();
            $(".navLeft").css({"min-height":heightWin-50});
            $(".navLeft").css({"height":heightWin-50});
            $(".content").css({"min-height":heightWin-50});
            $(".content").css({"height":heightWin-50});
        });
    },200);

    // iframe高度设置
    $("iframe").load(function(){
        var iframeheight = $(this).contents().find("body").height() + 30;
        $("iframe").height(iframeheight);
    });

    $(window).resize(function(){
        $("iframe").load(function(){
            var iframeheight = $(this).contents().find("body").height() + 30;
            $("iframe").height(iframeheight);
        });
    });

    // 文档管理
    $(".edit").on("click",function(){
        layer.open({
            title: '新建专题',
            type: 2,
            skin: 'layui-layer-rim', //加上边框
            area: ['682px', '614px'], //宽高
            content: ['tipBox.html','no']
        });
    });
    $(".cancel").click(function(){
        parent.layer.closeAll();
    });
    $(".sure").click(function(){
        parent.layer.msg('成功', {time: 2000,shade: 0.3},function(){
            parent.layer.closeAll();
        })
    });
    $(".delete").click(function(){
        var _this = $(this);
        layer.confirm('确定要删除吗？', {
            btn: ['确定','取消'],closeBtn: 0,title: false
        }, function(index){
            _this.parents("tr").remove();
            layer.close(index);
        }, function(index){
            layer.close(index);
        });
    });

    // 日志管理
    $(".listTable input[type='checkbox']").on("click",function(){
        $(this).siblings("label").toggleClass( "on_check" );
    })
    $(".listTable th input[type='checkbox']").on("click",function(){
        !$(this).siblings("label").hasClass("on_check")? $(".listTable label").removeClass("on_check"):$(".listTable label").addClass("on_check");
    })

    // 参数设置
    $(".list .nav a").on("click",function(){
        var index = $(this).parent().index();
        $(this).parent().addClass("on").siblings("li").removeClass("on");
        $(".paramdl").eq(index).show().siblings(".paramdl").hide();
        return false;
    });
    $(".paramdl .inputRadio").find("input").on("click",function(){
        $(this).parent().addClass("on").siblings().removeClass("on");
    })

    // 顶部导航
    $(".navTop>ul").find("a").on("click",function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
        $(".navLeft").find("."+$(this).attr("data-type")).show().siblings("ul").hide();
    })

});
