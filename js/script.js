$(document).ready(function() {
    $('#myCarousel').carousel({
        interval: 4000
    });

// handles the carousel thumbnails
    $(document).on('click', '.thumb-item-link', function() {
        var sender = $(this);
        var id = parseInt(sender.data('number'));
        $('#myCarousel').carousel(id);
        $('.thumb-img').removeClass('selected-thumb');
        sender.find('.thumb-img').addClass('selected-thumb');
    });

// when the carousel slides, auto update
    $('#myCarousel').on('slid.bs.carousel', function() {
        var id = $('.item.active').data('slideNumber');
        id = parseInt(id);
        $('.thumb-img').removeClass('selected-thumb');
        $('#carousel-selector-' + id).find('.thumb-img').addClass('selected-thumb');
    });
    
    $('#carouser-main').carousel({
        interval: 4000
    })
});