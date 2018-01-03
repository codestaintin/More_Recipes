/* eslint-disable */
// Create a clone of the menu, right next to original.
/**
 * Custom javascript file
 */
function sticky_relocate() {
  const navbarTop = $('.navbar').outerHeight();
  if ($(window).scrollTop() > $('#sticky-anchor').offset().top) {
    $('#sticky')
      .addClass('stick')
    $('#sticky-anchor').height($('#sticky').outerHeight());
  } else {
    $('#sticky')
      .removeClass('stick')
      .css({position: 'static'});
    $('#sticky-anchor').height(0);
  }
}

$(() => {
  $(window).scroll(sticky_relocate);
  sticky_relocate();
});

$('.recipe-image-thumb').click(function (e) {
  let url = $(this).attr('src');
  if (url) {
    $('.recipe-big-img img').attr("src", url);
  }
  e.preventDefault();
});

$('.fav-btn').click(function (e) {
  e.preventDefault();
  let outline = 'btn-outline-warning';
  let warning = 'btn-warning';
  let $this = $(this);
  if ($this.hasClass(outline)) {
    $this
      .removeClass(outline)
      .addClass(`${warning} text-white`);
  } else {
    $this
      .removeClass(`${warning} text-white`)
      .addClass(outline);
  }
});

$('.recipe-upload').change(function () {
  let $this = $(this);
  let file = this.files[0];
  let reader = new FileReader();
  let imageUrl = null;

  reader.onload = function (event) {
    imageUrl = event.target.result;
    $this
      .parent('.file-upload')
      .css({'background-image': `url(${imageUrl})`, color: '#fff'});
  };
  reader.readAsDataURL(file);
});

$('.avatar-input').change(function () {
  let $this = $(this);
  let file = this.files[0];
  let reader = new FileReader();
  let imageUrl = null;

  reader.onload = function (event) {
    imageUrl = event.target.result;
    $('.avatar').attr('src', imageUrl);
  };
  reader.readAsDataURL(file);
});
