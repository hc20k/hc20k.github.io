//https://stackoverflow.com/a/40658647
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$("#arrow").click((e)=> {
    $("section .container").each((idx, e) => {
        if ($(e).isInViewport()) {
            var scrollTo = $("section .container")[idx + 1];
            if (scrollTo) {
                scrollTo = $(scrollTo).parent();
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(scrollTo).offset().top
                }, 400);
            }
            return;
        }
    })
})