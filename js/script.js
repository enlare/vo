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

    $(document).on('click touchstart', '.up', function() {
        $('body').scrollTop(0);
    });


    $('#rooms-carousel-0').carousel({
        interval: 4000
    });

// когда ткнул пользователь 
    $(document).on('click', '.thumb-item-link', function() {
        var sender = $(this);
        var id = parseInt(sender.data('number'));
        $('#rooms-carousel-0').carousel(id);
        $('.thumb-img').removeClass('selected-thumb');
        sender.find('.thumb-img').addClass('selected-thumb');
    });

// когда автоматически крутится
    $('#rooms-carousel-0').on('slid.bs.carousel', function() {
        var id = $('.item.active').data('slideNumber');
        id = parseInt(id);
        $('.thumb-img').removeClass('selected-thumb');
        $('#carousel-selector-' + id).find('.thumb-img').addClass('selected-thumb');
    });
});