// когда кликаем на thumbnail карусели
function carouselClick(sender)
{
    var id = parseInt(sender.data('number'));
    var carousel = sender.closest('.slider-wrapper').find('.rooms-carousel');
    carousel.carousel(id);
}


//листает слайды для тач устройств и при прокрутке колесом
function swipe(sender, direction)
{
//    sender.on('slide.bs.carousel', function () {
//  alert('eee');
//});
    var wrapper = sender.closest('.slider-wrapper');
    wrapper.find('.thumb-img').removeClass('selected-thumb');
    wrapper.find('.thumb-item').removeClass('thumb-item-active');
    var id = sender.find('.item.active').data('slide-number');
    id = parseInt(id);
//    console.log(id);
    var idThumb = sender.data('thumb-id');

  
    var cloneFirst = wrapper.find('.custom-slider-thumb').find('.thumb-item').eq(0);
    var offset = cloneFirst.width();
//    console.log(cloneFirst);
    wrapper.find('.custom-slider-thumb').find('.thumb-item').eq(0).remove();
     wrapper.find('.custom-slider-thumb').append(cloneFirst);
//     wrapper.find('.custom-slider-thumb').find('.thumb-item').eq(id).addClass('thumb-item-active').find('.thumb-img').addClass('selected-thumb');
    $('#' + idThumb + id).find('.thumb-img').addClass('selected-thumb');
    $('#' + idThumb + id).parent().addClass('thumb-item-active');
//    console.log($('#' + idThumb + id).find('.thumb-img'), $('#' + idThumb + id).parent());
}


//прокрутка каруселей колесом мыши
function mouseWheel(sender, event)
{
    //листаем назад
    if (event.deltaY > 0)
    {

        sender.carousel('prev');
//                swipe(sender, 'prev');

    }
    else
    {
        //вперед 

        sender.carousel('next');
//                swipe(sender, 'next');

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
    $('.rooms-carousel').on('slide.bs.carousel', function(event) {
        var sender = $(this);
        swipe(sender, event.direction);
    });



//листалка карусели номеров на тач устройствах (для главной картинки)
    $('.rooms-carousel').swiperight(function() {
        var sender = $(this);
        swipe(sender);
        sender.carousel('prev');
    }).swipeleft(function() {
        var sender = $(this);
//        swipe(sender);
        sender.carousel('next');
    });

//листалка карусели номеров на тач устройствах (для превьюшек)
    $('.slider-thumbs').swiperight(function() {
        var sender = $(this).closest('.slider-wrapper').find('.rooms-carousel');
        sender.carousel('prev');
    }).swipeleft(function() {
        var sender = $(this).closest('.slider-wrapper').find('.rooms-carousel');
        sender.carousel('next');
    });


    //свайп на главной странице
    $('#myCarousel').swiperight(function() {
        var sender = $(this);
//        swipe(sender);
        sender.carousel('prev');
    }).swipeleft(function() {
        var sender = $(this);
//        swipe(sender);
        sender.carousel('next');
    });



//прокрутка колесом на номерах (основная картинка)
    $('.rooms-carousel').mousewheel(function(event, delta) {
        var sender = $(this);
        mouseWheel(sender, event);
    });


    //прокрутка колесом на номерах (превьюшки)
    $('.slider-thumbs').mousewheel(function(event, delta) {
        var sender = $(this).closest('.slider-wrapper').find('.rooms-carousel');
        //листаем назад
        if (event.deltaY > 0)
        {
            sender.carousel('prev');
//            selected - thumb
        }
        else
        {
            //вперед
            sender.carousel('next');
        }

        //запрет скрола страницы, пока курсор над большой картинкой карусели
        event.preventDefault();
    });

    //прокрутка колесом на главной
    $('#myCarousel').mousewheel(function(event) {
        var sender = $(this);
        mouseWheel(sender, event);
    });




});





