(function($){
//右下部返回顶部等按钮事件
    $('body').on('mouseover','#showMore',function () {
        $(this).find('div i').addClass('show').end()
               .find('#btnList').html('X');
    }).on('mouseout','#showMore',function () {
        $(this).find('div i').removeClass('show').end()
               .find('#btnList').html('O');
    }).on('click','#toTop',function () {
            var v = $('html').height() / 2 > 1000 ? 1000 : $('html').height() / 2;//滑动的速度
            $('body,html').animate({ scrollTop: 0 }, v);
            return false;
    }).on('click','#MoreMenu',function () {
        $('.outer').removeClass('outer-other');
    });

})(jQuery);