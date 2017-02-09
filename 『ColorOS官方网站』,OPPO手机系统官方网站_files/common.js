var agent = window.navigator.userAgent.toLowerCase();
var islessIE = false;
var isFirefox = false;
var isSafari = false;
var ismobile = false;
var scroll_top = 0;
var scroll_timer;
var cur = 0;

if (agent.indexOf("msie 8") != -1 || agent.indexOf("msie 7") != -1 || agent.indexOf("msie 6") != -1) {
    islessIE = true;
}
if (agent.indexOf("firefox") != -1) {
    isFirefox = true;
}
if (agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1) {
    isSafari = true;
}
if (agent.toLowerCase().indexOf("mobile") != -1) {
    ismobile = true;
}


//ColorOS 3.0视频
function playvideo(autoplay) {
    if (autoplay == null) {
        autoplay = 0;
    }
    $("#videopop").html('<iframe height=524 width=860 src="http://v.qq.com/iframe/player.html?vid=w0302r1aqny&tiny=0&auto=' + autoplay + '" frameborder=0 allowfullscreen></iframe><div class="videopopclose" onclick="closevideo()">X</div>');
    popvideo();
}

//手机搬家视频
function playclonephonevideo(autoplay) {
    if (autoplay == null) {
        autoplay = 0;
    }
    $("#videopop").html('<iframe height=524 width=860 src="http://v.qq.com/iframe/player.html?vid=t0302kym88s&tiny=0&auto=' + autoplay + '" frameborder=0 allowfullscreen></iframe><div class="videopopclose" onclick="closevideo()">X</div>');
    popvideo();
}

//通信安全视频
function playcleanvideo(autoplay) {
    if (autoplay == null) {
        autoplay = 0;
    }
    $("#videopop").html('<iframe height=524 width=860 src="https://v.qq.com/iframe/player.html?vid=q0348xv259q&tiny=0&auto=' + autoplay + '" frameborder=0 allowfullscreen></iframe><div class="videopopclose" onclick="closevideo()">X</div>');
    popvideo();
}

//应用安全视频
function playsafevideo(autoplay) {
    if (autoplay == null) {
        autoplay = 0;
    }
    $("#videopop").html('<iframe height=524 width=860 src="https://v.qq.com/iframe/player.html?vid=b0353ywfa2s&tiny=0&auto=' + autoplay + '" frameborder=0 allowfullscreen></iframe><div class="videopopclose" onclick="closevideo()">X</div>');
    popvideo();
}

//支付安全视频
function playpayvideo(autoplay) {
    if (autoplay == null) {
        autoplay = 0;
    }
    $("#videopop").html('<iframe height=524 width=860 src="https://v.qq.com/iframe/player.html?vid=s03589jx5za&tiny=0&auto=' + autoplay + '" frameborder=0 allowfullscreen></iframe><div class="videopopclose" onclick="closevideo()">X</div>');
    popvideo();
}

//3.0年终盘点视频
function playpanvideo(autoplay) {
    if (autoplay == null) {
        autoplay = 0;
    }
    $("#videopop").html('<iframe height=524 width=860 src="https://v.qq.com/iframe/player.html?vid=m03677uub2v&tiny=0&auto=' + autoplay + '" frameborder=0 allowfullscreen></iframe><div class="videopopclose" onclick="closevideo()">X</div>');
    popvideo();
}


//弹出视频播放窗口
function popvideo() {
    $("#videomask").height($(document).height());
    $("#videopop").css("margin-top", -$("#videopop").height() / 2);
    $("#videopop").show();
    $("#videomask").show();
}
//关闭视频播放窗
function closevideo() {
    $("#videopop").hide();
    $("#videomask").hide();

    // 清空播放器
    $("#videopop").html("");
}

function dialog(dialog_id) {
    $(".dialog").hide();
    $("#" + dialog_id).show();
    $("#dialogmask").height($(document).height());
    $("#dialogmask").show();
    $("#dialogmask").bind("click", function () {
        $(".dialog").hide();
        $("#dialogmask").hide();
        $("#dialogmask").unbind("click");
    });
}

// 超过范围的值只取最大范围
function rangval(val, min, max) {
    try {
        if (val > parseInt(max)) {
            val = max;
        }
        else if (val < parseInt(min)) {
            val = min;
        }
    }
    catch (e) {
        console.log(e.message);
    }
    return val;
}

function scroll_navigation() {
    cur = $(window).scrollTop();
    var nav_height = $("#nav_container").height();
    //顶部小导航位置挪动
    if (cur > nav_height) {
        $("#nav_small").css("top", "0px");
    }
    else {
        $("#nav_small").css("top", (nav_height - cur) + "px");
    }
}

// 滚轮事件
function scroll_event() {
    scroll_navigation();

    //低版本IE以及safari取消动画
    if (!islessIE && !isSafari) {
        $("div.animate_activited img.animated").each(function (i) {
            var data = JSON.parse($(this).attr("data-animated"));
            var rang = JSON.parse($(this).attr("data-animated-rang"));
            var matrix = JSON.parse($(this).attr("data-animated-cur"));
            var transform = "";
            var new_matrix = new Object();
            if (cur < scroll_top) {
                //up
                new_matrix['translateX'] = rangval((parseFloat(matrix.translateX) - parseFloat(data.translateX)), -999, 999);
                new_matrix['translateY'] = rangval((parseFloat(matrix.translateY) - parseFloat(data.translateY)), rang['minY'], rang['maxY']);
                new_matrix['rotate'] = rangval((parseFloat(matrix.rotate) - parseFloat(data.rotate)), rang['minRotate'], rang['maxRotate']);
            } else {
                //down
                new_matrix['translateX'] = rangval((parseFloat(matrix.translateX) + parseFloat(data.translateX)), -999, 999);
                new_matrix['translateY'] = rangval((parseFloat(matrix.translateY) + parseFloat(data.translateY)), rang['minY'], rang['maxY']);
                new_matrix['rotate'] = rangval((parseFloat(matrix.rotate) + parseFloat(data.rotate)), rang['minRotate'], rang['maxRotate']);
            }
            transform = "translateX(" + new_matrix['translateX'] + "px) translateY(" + new_matrix['translateY'] + "px) rotate(" + new_matrix['rotate'] + "deg)"
            $(this).css("transform", transform);
            $(this).attr("data-animated-cur", JSON.stringify(new_matrix));
        });
    }
    scroll_top = cur;
}

$(document).ready(function () {
    $("#gotop").bind("click", function () {
        $("#fp-nav a").eq(0).trigger("click");
    });

    //初次加载回顶部
    $(window).scroll(function () {
        if (isFirefox) {
            //firefox一次滚动会触发多次
            clearTimeout(scroll_timer);
            scroll_timer = setTimeout("scroll_event()", 300);
            scroll_navigation();
        }
        else {
            scroll_event();
        }
    });

    //顶部小导航位置挪动
    scroll_navigation();

    //初始化视频遮造蒙版
    if ($("#videomask").length <= 0) {
        $(document.body).append('<div class="videomask" id="videomask"></div>');
    }
    //初始化视频容器
    if ($("#videopop").length <= 0) {
        $(document.body).append('<div class="videopop" id="videopop"></div>');
    }

    // cnzz 统计
    $("body").append('<div style="display:none;"><script src="http://s95.cnzz.com/z_stat.php?id=1260883154&web_id=1260883154" language="JavaScript"></script></div>');

    //自动播放视频
    if (window.location.href.toLowerCase().indexOf("clean.html?init=1") != -1) {
        playcleanvideo(1);
    }
    else if (window.location.href.toLowerCase().indexOf("index.html?init=1") != -1) {
        playsafevideo(1);
    }
    else if (window.location.href.toLowerCase().indexOf("index.html?init=2") != -1) {
        playpayvideo(1);
    }
});