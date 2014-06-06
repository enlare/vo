$(document).ready(function() {
    $('#myCarousel').carousel({
        interval: 4000
    });
    
    ymaps.ready(init);
    function init() {
        var map = new ymaps.Map("map", {
            center: [55.648245,37.265238,17],
            zoom: 15
        });

        metka = new ymaps.GeoObject({
            geometry: {
                // Тип геометрии - точка
                type: "Point",
                // Координаты точки.
                coordinates: [55.648245,37.265238,17]
            }
        });

        // Добавляем на карту
        map.geoObjects.add(metka);
    }
    
     $(document).on('click touchstart', '.up', function() {
        $('body').scrollTop(0);
    });
    
    $('.booking-select').selectpicker();
//    доки тут 
//    http://silviomoreto.github.io/bootstrap-select/

});