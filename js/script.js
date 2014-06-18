// когда кликаем на thumbnail карусели
function carouselClick(sender)
{
    var id = parseInt(sender.data('number'));
    var carousel = sender.closest('.slider-wrapper').find('.rooms-carousel');
    carousel.carousel(id);
}


//листает слайды для тач устройств и при прокрутке колесом
function swipe(sender)
{
    sender.closest('.slider-wrapper').find('.thumb-img').removeClass('selected-thumb');
    var id = sender.find('.item.active').data('slide-number');
    id = parseInt(id);
    var idThumb = sender.data('thumb-id');

    $('#' + idThumb + id).find('.thumb-img').addClass('selected-thumb');
}


//прокрутка каруселей колесом мыши
function mouseWheel(sender, event)
{
    //листаем вперед
    if (event.deltaY > 0)
    {
        swipe(sender);
        sender.carousel('prev');
    }
    else
    {
        //назад
        swipe(sender);
        sender.carousel('next');
    }

    //запрет скрола страницы, пока курсор над большой картинкой карусели
    event.preventDefault();
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

    //кнопка вверх (в футере)
    $(document).on('click touchstart', '.up', function() {
        $('body').scrollTop(0);
    });


    $('.rooms-carousel').carousel({
        //так она не крутится автоматически
        interval: false
    });

// когда ткнул пользователь в thumbnails 
    $(document).on('click touchstart', '.thumb-item-link', function() {
        var sender = $(this);
        carouselClick(sender);
    });

// отмечается активный thumbnail при прокрутке слайдов
    $('.rooms-carousel').on('slid.bs.carousel', function() {
        var sender = $(this);
        sender.closest('.slider-wrapper').find('.thumb-img').removeClass('selected-thumb');

        var id = sender.find('.item.active').data('slide-number');
        id = parseInt(id);
        var idThumb = sender.data('thumb-id');
        $('#' + idThumb + id).find('.thumb-img').addClass('selected-thumb');
    });



//листалка карусели номеров на тач устройствах
    $('.rooms-carousel').swiperight(function() {
        var sender = $(this);
        swipe(sender);
        $(this).carousel('prev');
    }).swipeleft(function() {
        var sender = $(this);
        swipe(sender);
        sender.carousel('next');
    });


    //свайп на главной странице
    $('#myCarousel').swiperight(function() {
        var sender = $(this);
        swipe(sender);
        $(this).carousel('prev');
    }).swipeleft(function() {
        var sender = $(this);
        swipe(sender);
        sender.carousel('next');
    });

//прокрутка колесом на номерах
    $('.rooms-carousel').mousewheel(function(event, delta) {
        var sender = $(this);
        mouseWheel(sender, event);
    });

    //прокрутка колесом на главной
    $('#myCarousel').mousewheel(function(event) {
        var sender = $(this);
        mouseWheel(sender, event);
    });
});





