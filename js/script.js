function carouselClick(sender)
{
    var id = parseInt(sender.data('number'));
    var carousel = sender.closest('.slider-wrapper').find('.rooms-carousel');
    carousel.carousel(id);
    carousel.closest('.slider-wrapper').find('.thumb-img').removeClass('selected-thumb');
    sender.find('.thumb-img').addClass('selected-thumb');
}

$(document).ready(function() {
    $('#myCarousel').carousel({
        interval: 4000
    });

    ymaps.ready(init);
    function init() {
        var map = new ymaps.Map("map", {
            center: [55.648245, 37.265238, 17],
            zoom: 15
        });

        metka = new ymaps.GeoObject({
            geometry: {
                // Тип геометрии - точка
                type: "Point",
                // Координаты точки.
                coordinates: [55.648245, 37.265238, 17]
            }
        });

        // Добавляем на карту
        map.geoObjects.add(metka);
    }

    $(document).on('click touchend', '.up', function() {
        $('body').scrollTop(0);
    });


    $('.rooms-carousel').carousel({
//        interval: 4000
    });

// когда ткнул пользователь 
    $(document).on('click touchend', '.thumb-item-link', function() {
        var sender = $(this);
        carouselClick(sender);
    });

// когда автоматически крутится
    $('.rooms-carousel').on('slid.bs.carousel', function() {
        var sender = $(this);
        var id = sender.find('.item.active').data('slide-number');
        id = parseInt(id);
        var idThumb = sender.data('thumb-id');
        $(idThumb + id).find('.thumb-img').addClass('selected-thumb');
    });
    
    
     $("#rooms-carousel-0").swiperight(function() {
      $("#rooms-carousel-0").carousel('prev');
    });
    
   $("#rooms-carousel-0").swipeleft(function() {
      $("#rooms-carousel-0").carousel('next');
   });
    
});

