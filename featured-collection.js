const featuredCollection = $('.featured-product-inner-section').length;

if (featuredCollection >= 5) {
  $('.featured-product-row').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    speed: 600,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 551,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }]
  });
}


const productSlider = $('.product_slider_inner').length;

if (productSlider >= 3) {
  $('.product_slider_main_block').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    speed: 600,
    autoplaySpeed: 3000,
    infinite: false
  });
}

