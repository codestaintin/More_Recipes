// Create a clone of the menu, right next to original.
function sticky_relocate() {
	var navbarTop = $('.navbar').outerHeight();
	if ($(window).scrollTop() > $('#sticky-anchor').offset().top) {
		$('#sticky').addClass('stick').css({'position':'fixed','top':navbarTop+'px'});
		$('#sticky-anchor').height($('#sticky').outerHeight());
	} else {
		$('#sticky').removeClass('stick').css({'position':'static'});
		$('#sticky-anchor').height(0);
	}
}

$(function() {
	$(window).scroll(sticky_relocate);
	sticky_relocate();
});

$('.recipe-image-thumb').click(function (e) {
	var url = $(this).attr('src');
	if(url)
		$('.recipe-big-img img').attr("src",url);
	e.preventDefault();
});

$('.fav-btn').click(function (e) {
	e.preventDefault();
	var outline = "btn-outline-warning";
	var warning = "btn-warning";
	var $this = $(this);
	if($this.hasClass(outline)){
		$this.removeClass(outline).addClass(warning+" text-white");
	}
	else {
		$this.removeClass(warning+" text-white").addClass(outline);
	}
});

$('.ingredient-btn').click(function () {
	var lastInput = $('.ingredient').last();
	if(lastInput.val()){
		var nextInput = lastInput.clone();
		nextInput.val('').attr('placeholder','Add more recipe').insertBefore($(this));
	}
});

$('.recipe-upload').change(function(){
	var $this = $(this);
	var file = this.files[0];
	var reader = new FileReader();
	var imageUrl = null;

	reader.onload = function(event){
		imageUrl = event.target.result;
		$this.parent('.file-upload').css({'background-image': 'url('+imageUrl+')',color:'#fff'});
	};
	reader.readAsDataURL(file);
});


$('.avatar-input').change(function(){
	var $this = $(this);
	var file = this.files[0];
	var reader = new FileReader();
	var imageUrl = null;

	reader.onload = function(event){
		imageUrl = event.target.result;
		$('.avatar').attr("src",imageUrl);
	};
	reader.readAsDataURL(file);
});

