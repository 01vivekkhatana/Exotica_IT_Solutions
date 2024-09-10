// utils.js
import $ from 'jquery';
import 'slick-carousel'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export const initializeSliders = () => {
  $(".slider-inner").slick({
    autoplay: true,
    infinite: true, 
    autoplaySpeed: 2000, 
    prevArrow:".prev-btn",  
    nextArrow:".next-btn",    
  });

  $(".textimonial-wrap").slick({
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true, 
    autoplaySpeed: 2000,     
  });
};

export const handleNavbarScroll = () => {
  const changeBg = () => {
    var navbar = document.getElementById("header");
    var scrollValue = window.scrollY;

    if (scrollValue < 105) {
      navbar.classList.remove("sticky_menu");
    } else {
      navbar.classList.add("sticky_menu");
    }
  };

  window.addEventListener("scroll", changeBg);

  return () => {
    window.removeEventListener("scroll", changeBg);
  };
};

export const initializeHoverEffect = () => {
  $('.navbar ul li a').hover(function(){
    $(this).addClass("animate_menu", 3000);
  }, function(){
    $(this).removeClass("animate_menu", 3000);
  });
};

export const initializeCounter = () => {
  let count = document.querySelectorAll(".count");
  let arr = Array.from(count);

  arr.forEach(function(item) {
    let startnumber = 0;

    function counterup() {
      startnumber++;
      item.innerHTML = startnumber;

      if (startnumber === parseInt(item.dataset.number, 10)) {
        clearInterval(stop);
      }
    }

    let stop = setInterval(function() {
      counterup();
    }, 50);
  });
};

export const initScrollAnimations = () => {
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

  function revealright() {
    const revealrights = document.querySelectorAll(".revealright");
    for (let i = 0; i < revealrights.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealrights[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        revealrights[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", revealright);
  
  setTimeout(() => {
    $(".home_box").addClass("fixed");
    $(".banner_content").addClass("fixed");
    $(".contactpg_content").addClass("fixed");
    $(".contactpg_img").addClass("fixed");
    $(".about_home_content").addClass("fixed");
    $(".newsletter_box").addClass("fixed");
  }, 500);
};


$(document).ready(() => {
  const initSlickCarousel = () => {
    const $innerProjects = $(".inner_projects");
    const $leftArrow = $(".arrow_sec .left_arrow");
    const $rightArrow = $(".arrow_sec .right_arrow");

    if (typeof $ === 'undefined') {
      console.error("jQuery is not available.");
      return;
    }

    if ($innerProjects.length > 0) {
      console.log('Initializing Slick Carousel');
      $innerProjects.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $leftArrow,
        nextArrow: $rightArrow,
      });
    } else {
      console.warn("Element .inner_projects is not present in the DOM.");
    }
  };

  initSlickCarousel();
});

export const initHamburgerMenu = () => {
  $(".hamburger").click(function() {
    $("#menu-header-menu").toggleClass("is-active");
    $(this).toggleClass("is-active");
  });
};


