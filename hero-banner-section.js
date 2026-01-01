const imageBanner = $('.inner_image_banner_section .image_banner_section_main_inner').length;
      if (imageBanner >= 2) {
          $('.inner_image_banner_section').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            speed: 3000,
            dots: true,
            fade: true,
            cssEase: 'ease-in-out',
          });
      }