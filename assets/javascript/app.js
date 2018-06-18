


$(document).ready(function () {

    $(".dropdown-trigger").dropdown({
        hover: true,
        coverTrigger: false,
        alignment: "right"
    }

    );


    $('.sidenav').sidenav({ edge: "right" });

    $('.collapsible').collapsible();
});

$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});
