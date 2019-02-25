;(function(window, $){
    if($ === null) return;
    var $win = $(window),
        height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        $body = $('body'),
        direction = 'down',
        beforeScroll = $win.scrollTop(),
        yonoms = [],
        yonom = {
            v: '1.0.0',
            bind: function(id, callback){
                id = $(id);
                if(!id[0]) return;
                callback = typeof callback === 'object' ? callback : typeof callback === 'function' ? {yonom:callback} : {};
                yonoms.push({
                    state: '',
                    isYonom:false,
                    selector: id,
                    show: callback.show || function(){},
                    yonom: callback.yonom || function(){},
                    hide: callback.hide || function(){},
                    viewCheck: Math.min(Math.max(callback.viewCheck,1), 10 ) || 2
                });

                if(yonoms.length === 1 ) $win.on('scroll.yonom', yonomCheck);
            }
        };

    function yonomCheck(){
        var i = yonoms.length,
            scroll = $win.scrollTop();

        if(i === 0 || scroll === beforeScroll) return;
        direction = scroll > beforeScroll ? 'down' : 'up';
        beforeScroll = scroll;

        function getState(data){
            var sec = data.selector,
                start = sec.offset().top,
                secEnd = start + sec.height(),
                end = sec.find('.end')[0] ? sec.find('.end').offset().top : start + sec.height(),
                secHeight = end - start,
                yoStart = start-Math.max((height/2),0),
                yoEnd = yoStart + secHeight;
            if(scroll + height > start && scroll < secEnd) {
                if(data.state !== 'show') {
                    data.isYonom = false;
                    data.state = 'show';
                    sec.removeClass('yonom-hide');
                    sec.addClass('yonom-show');
                    data.show.call(sec);
                }
            }
            else {
                if(data.state !== 'hide'){
                    data.state = 'hide';
                    data.isYonom = false;
                    sec.removeClass('yonom-show yonom');
                    sec.addClass('yonom-hide');
                    data.hide.call(sec);
                }
            }

            if(data.state === 'show' && !data.isYonom && Math.max(0, Math.min(Math.max(0, scroll + height - start ),sec.height()) -  Math.max(0, scroll - start)) >= Math.min(sec.height(),height)/data.viewCheck){
                data.isYonom = true;
                sec.addClass('yonom');
                data.yonom.call(sec);
            }
        }

        for(i; i--;){
            getState(yonoms[i]);
        }
    }

    if(typeof mvm === 'function' && mvm.core){
        mvm('module.yonom', function(){
            return yonom.bind;
        });
    }

    $.fn.yonom = function(data){

        return this.each(function(){
            yonom.bind(this, data);
        });
    }
})(window, jQuery);
