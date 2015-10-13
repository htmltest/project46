var sliderSpeed     = 1000; // скорость смены слайда
var sliderPeriod    = 5000; // время автоматической смены слайда (0 - отключено)
var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            if (sliderPeriod > 0) {
                sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
            }
        });

        function sliderNext() {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-item').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-item').eq(curIndex).css({'z-index': 3});
                curSlider.find('.slider-item').eq(newIndex).css({'z-index': 2}).show();

                curSlider.find('.slider-ctrl li.active').removeClass('active');
                curSlider.find('.slider-ctrl li').eq(newIndex).addClass('active');

                curSlider.find('.slider-item').eq(curIndex).fadeOut(sliderSpeed, function() {
                    curSlider.data('disableAnimation', true);
                    if (sliderPeriod > 0) {
                        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                    }
                });
            }
        }

        $('.slider-ctrl a').click(function(e) {
            var curLi = $(this).parent();

            if (!curLi.hasClass('active')) {
                var curSlider = $('.slider');

                if (curSlider.data('disableAnimation')) {
                    window.clearTimeout(sliderTimer);
                    sliderTimer = null;

                    var curIndex = curSlider.data('curIndex');
                    var newIndex = curSlider.find('.slider-ctrl li').index(curLi);

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.slider-item').eq(curIndex).css({'z-index': 3});
                    curSlider.find('.slider-item').eq(newIndex).css({'z-index': 2}).show();

                    curSlider.find('.slider-ctrl li.active').removeClass('active');
                    curSlider.find('.slider-ctrl li').eq(newIndex).addClass('active');

                    curSlider.find('.slider-item').eq(curIndex).fadeOut(sliderSpeed, function() {
                        curSlider.data('disableAnimation', true);
                        if (sliderPeriod > 0) {
                            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                        }
                    });
                }
            }

            e.preventDefault();
        });

        $('.video-link').click(function() {
            $('.video-link').hide();
            $('.videoWrapper').show();
            $('video').each(function (i, el) {
                var player = new bVideoPlayer(el);
            });
        });

        $('.header-city a, .buy-city-select a').click(function(e) {
            $('.overlay, .window').show();
            e.preventDefault();
        });

        $('.window-close').click(function(e) {
            $('.overlay, .window').hide();
            e.preventDefault();
        });

        $('.overlay').click(function() {
            $('.overlay, .window').hide();
        });

        $('body').bind('keyup', function(e) {
            if (e.keyCode == 27) {
                $('.overlay, .window').hide();
            }
        });

        $('.window-list a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLi.hasClass('active')) {
                $('.window-list li.active').removeClass('active');
                curLi.addClass('active');
                $('.header-city a span').html(curLink.html());
                $('.buy-city-select a').html(curLink.html());
                $('.buy-list-item').removeClass('active');
                $('.buy-list-item[data-city="' + curLink.data('city') + '"]').addClass('active');
            }
            $('.overlay, .window').hide();
            e.preventDefault();
        });

        $('.top-inner a').click(function(e) {
            var curIndex = $('.top-inner a').index($(this));
            $.scrollTo($('.product').eq(curIndex), 500, {offset: -100});
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        var maxHeight = 0;
        $('.product-text dl').css({'min-height': '0px'});
        if ($(window).width() > 480) {
            $('.product-text dl').each(function() {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });
            $('.product-text dl').css({'min-height': maxHeight + 'px'});
        }

        if ($(window).width() > 600) {
            $('video').attr('width', '594').attr('height', '334');
        } else {
            $('video').attr('width', '480').attr('height', '270');
        }
    });

    $(window).bind('load resize scroll', function() {
        if ($(window).scrollTop() > $('.info').offset().top - 200) {
            $('.top').addClass('visible');
        } else {
            $('.top').removeClass('visible');
        }


    });

})(jQuery);