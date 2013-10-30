(function($){
    var DivSlider = function(element, options) {
    	var me = this;
        var settings = $.extend({}, $.fn.divSlider.defaults, options);
        var currentSlide = 0;
        var slider = $(element);
        var slidesWrap = slider.find(".slides");
        var slides = slidesWrap.children();
        var iSlides = slides.size();

        
        $(slidesWrap.children()[0]).clone().appendTo(slidesWrap);

        slider.addClass("divSlider");

        var width  = slider.width();
        var height = slider.height();

        slides.width(width).height(height);
        slidesWrap.width((iSlides + 1) * width);

        var timer = 0;
        timer = setInterval(function(){ me.run()}, settings.pauseTime);

        if(settings.pauseOnHover){
            slider.hover(function(){
                clearInterval(timer);
                timer = '';
            }, function(){
                timer = setInterval(function(){ me.run()}, settings.pauseTime);
            });
        }

        if(settings.navigation){
            navigationEl = $('<div class="sliderDiv-navigation"></div>');
            slidesWrap.after(navigationEl);
            for(var i = 0; i < iSlides; i++){
	          	navigationEl.append('<a class="sliderDiv-navigation-control" rel="'+ i +'">'+ (i + 1) +'</a>');
            }

            //Set initial active link
            $('a:eq('+ currentSlide +')', navigationEl).addClass('active');
            console.log('a:eq('+ currentSlide +')');
            
            $('a', navigationEl).bind('click', function(){
                if(me.running) return false;
                if($(this).hasClass('active')) return false;
                clearInterval(timer);
                timer = '';
                me.currentSlide = $(this).attr('rel') - 1;
                me.run();
            });

            me.navigation = navigationEl;
        }

        me.settings = settings;
        me.currentSlide = currentSlide;
        me.slidesWrap = slidesWrap;
        me.running = false;
        me.iSlides = iSlides;
        me.iWidth = width;
        me.iHeight = height;
        // /me.$ = $;
    }

    DivSlider.prototype.run = function() {
    	var me = this;
    	//$ = me.$;
        me.currentSlide++;

        if(me.settings.navigation){
            $('a', me.navigation).removeClass('active');
            if(me.currentSlide>=me.iSlides) {
                $('a:eq(0)', me.navigation).addClass('active');  
            } else {
            	$('a:eq(' + me.currentSlide + ')', me.navigation).addClass('active');  
            }
            
        }

        me.slidesWrap.animate(
            {left: -me.currentSlide*me.iWidth},
            me.settings.animSpeed,
            function(){
                if(me.currentSlide == me.iSlides){
                    me.slidesWrap.css("left", 0);
                    me.currentSlide=0;
                }
            }
        );
    };    

    $.fn.divSlider = function(options) {
        return this.each(function(options){
            var element = $(this);

            if (element.data('divSlider')) { return element.data('divSlider'); }

            var divSlider = new DivSlider(this, options);

            element.data('divSlider', divSlider);
        });
    };

    $.fn.divSlider.defaults = {
        pauseTime: 6000,
        animSpeed: 1500,
        pauseOnHover: true,
        navigation: true

    };
})(jQuery);

