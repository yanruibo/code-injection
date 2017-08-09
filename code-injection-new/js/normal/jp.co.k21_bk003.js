






var admob_vars = {
 pubid: 'a14f3a3b6098456', // publisher id
 bgcolor: '000000', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};







$(function() {

(function() {
    // prev and next btn
    var f7 = Flipsnap("#flipsnap7");
    var $next = $(".next").click(function() { f7.toNext(); });
    var $prev = $(".prev").click(function() { f7.toPrev(); });
    var nohas = "noHasNext";
    f7.element.addEventListener('flipsnap.moveend', function() {
        f7.hasNext() ? $next.removeClass(nohas) : $next.addClass(nohas);
        f7.hasPrev() ? $prev.removeClass(nohas) : $prev.addClass(nohas);
    }, false);
})();

});


var admob_vars = {
 pubid: 'a14f3a3b6098456', // publisher id
 bgcolor: '000000', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};









var admob_vars = {
 pubid: 'a14f3a3b6098456', // publisher id
 bgcolor: '000000', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};









var admob_vars = {
 pubid: 'a14f3a3b6098456', // publisher id
 bgcolor: '000000', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};


