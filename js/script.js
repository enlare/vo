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

    $(".custom-slider-thumb").carouFredSel({
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
                $(this).find('li').removeClass('selected-thumb').eq(0).addClass('selected-thumb').trigger("click");
            }
        }
    }).find("li").on('click touchstart', function() {
        var sender = $(this);
        sender.closest('.custom-slider-thumb').trigger("slideTo", [sender, 0]).find('li').removeClass('selected-thumb');
        var data = sender.data('number');
        sender.addClass('selected-thumb').closest('.slider-wrapper').find('.rooms-carousel').carousel(data);
    }).css("cursor", "pointer");



    $(".rooms-carousel").carouFredSel({
        items: {
            visible: 1,
            minimum: 4
        },
        responsive: true,
        auto: false,
        swipe: true,
        mousewheel: true,
        scroll: {
            items: 1
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

    //свайп на главной странице
    $('#myCarousel').swiperight(function() {
        $(this).carousel('prev');
    }).swipeleft(function() {
        $(this).carousel('next');
    });

//      //прокрутка колесом на главной
    $('#myCarousel').mousewheel(function(event) {
        var sender = $(this);
        mouseWheel(sender, event);
    });


});





