// когда кликаем на thumbnail карусели
function carouselClick(sender)
{
    var id = parseInt(sender.data('number'));
    var carousel = sender.closest('.slider-wrapper').find('.rooms-carousel');
    carousel.carousel(id);
}


//листает слайды для тач устройств и при прокрутке колесом
function setActiveThumb(sender)
{
    var wrapper = sender.closest('.slider-wrapper');
    wrapper.find('.thumb-img').removeClass('selected-thumb');
    var id = sender.find('.item.active').data('slide-number');
    id = parseInt(id);
    var idThumb = sender.data('thumb-id');
    $('#' + idThumb + id).find('.thumb-img').addClass('selected-thumb');
}



/**
 * 
 * @param {type} sender - карусель верхняя
 * @param {type} event - событие прокрутки колесом
 * прокрутка каруселей колесом мыши над большой картинкой
 * как на главной, так и на номерах
 */
function mouseWheel(sender, event)
{
    //листаем назад
    if (event.deltaY > 0)
    {
        sender.carousel('prev');
    }
    else
    {
        //вперед 
        sender.carousel('next');
    }
    //запрет скрола страницы, пока курсор над большой картинкой карусели
    event.preventDefault();
}



$(document).ready(function() {

    //на главной карусель
    $('#myCarousel').carousel({
        interval: 4000
    });




    $("#foo").carouFredSel({
        items: {
            visible: 4,
            minimum: 4
        },
        auto: false,
        swipe: true,
        mousewheel: true,
        scroll: {
            items: 1,
            onAfter: function(data)
            {
                if (data.scroll.direction == 'prev')
                {
                    $('.rooms-carousel').carousel('prev');
                }
                else
                {
                    $('.rooms-carousel').carousel('next');
                }
            }
        }
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
        //так они не крутятся автоматически
        interval: false
    });


    /**
     * когда ткнул пользователь в thumbnails 
     */
//    $(document).on('click touchstart', '.thumb-item-link', function() {
//        var sender = $(this);
//        carouselClick(sender);
//    });

// 
    /**
     * вызывает смену функции смены превью, 
     * только после того как прокрутит большую картинку
     */
    $('.rooms-carousel').on('slid.bs.carousel', function() {
        setActiveThumb($(this));
    });



////листалка карусели номеров на тач устройствах (для главной картинки)
//    $('.rooms-carousel').swiperight(function() {
//        $(this).carousel('prev');
//    }).swipeleft(function() {
//        $(this).carousel('next');
//    });
//    //свайп на главной странице
//    $('#myCarousel').swiperight(function() {
//        $(this).carousel('prev');
//    }).swipeleft(function() {
//        $(this).carousel('next');
//    });

    /**
     * свайп для основных каруселей
     * (на номерах и на главной)
     */
    $('.carousel').swiperight(function() {
        $(this).carousel('prev');
    }).swipeleft(function() {
        $(this).carousel('next');
    });

//листалка карусели номеров на тач устройствах (для превьюшек)
//    $('.slider-thumbs').swiperight(function() {
//        var sender = $(this).closest('.slider-wrapper').find('.rooms-carousel');
//        sender.carousel('prev');
//    }).swipeleft(function() {
//        var sender = $(this).closest('.slider-wrapper').find('.rooms-carousel');
//        sender.carousel('next');
//    });


    /**
     * прокрутка колесом на номерах (большая картинка)
     * и на главной
     */
//    $('.rooms-carousel').mousewheel(function(event, delta) {
//        mouseWheel($(this), event);
//    });
//      //прокрутка колесом на главной
//    $('#myCarousel').mousewheel(function(event) {
//        var sender = $(this);
//        mouseWheel(sender, event);
//    });
    $('.carousel').mousewheel(function(event, delta) {
        mouseWheel($(this), event);
    });



//    //прокрутка колесом на номерах (превьюшки)
//    $('.slider-thumbs').mousewheel(function(event, delta) {
//        var sender = $(this).closest('.slider-wrapper').find('.rooms-carousel');
//        //листаем назад
//        if (event.deltaY > 0)
//        {
//            sender.carousel('prev');
////            selected - thumb
//        }
//        else
//        {
//            //вперед
//            sender.carousel('next');
//        }
//
//        //запрет скрола страницы, пока курсор над большой картинкой карусели
//        event.preventDefault();
//    });






});





