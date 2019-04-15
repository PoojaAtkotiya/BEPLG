$(function () {
	loadBgImage();
	showHideMenu();
	iconHoverEffect();
	detectIpad();
	showSearchResult();
	innerPageBottomCarousels();
	innerPageYearTabs();
	activateGalleryFunc();
	showLightbox();
	clearInput();
	ShowPlansTabs();
	showContactTabs();
	contactLhsScroll();
	//innerNav();
	custGuideAccordian();
	updateProjectSearch();
	menuSubNav();
	applyBullets();
	showAmenitiesContent();
	defaultSearchSelectboxValues();
	leadershipTeamViewMore();
	ieHack();
	locationMap();
	showFormLightbox()
	// Esc key action
	$(document).keyup(function (e) {
		if (e.keyCode == 27) { // Esc
			$(".closeLtBox").click() // close lightbox
		}
	});
	telLinks()
	loadIframeData();

});

/*---------------------------------------------------------------------------------------------------------------*/

jQuery.fn.outerHTML = function () {
	return $($('<div></div>').html(this.clone())).html();
}
function loadIframeData() {
	if ($('.formIframe').length > 0) {
		setTimeout(function () {
			var url = window.location.href;
			var url1 = url.split('http://');
			var url2 = url1[1].split('/');
			var url3 = "http://" + url2[0] + "/ProjectwiseContacts.aspx";;
			$('.formIframe').attr('src', url3);
		}, 300)
	}

}

function showHideMenu() {
	setTimeout(function () {
		var url = ($(".video_container").find("iframe").attr("src")) + '?wmode=transparent&rel=0';
		$(".video_container").find("iframe").attr("src", url);
	}, 100);

	$('.navWrap2').hide();
	$('.navWrap1 a').click(function () {
		$(this).slideUp();
		$('.navWrap2').css('visibility', 'visible');
		$('.navWrap2').slideDown(500);
	});
	$('.navWrap2 .closeMenu').click(function () {
		$('.navWrap2').slideUp();
		$('.navWrap1 a').slideDown();
	});
	$('.navWrap1 a').hover(function () {
		$(this).animate({ 'margin-top': '0' }, 150);

	}, function () {
		$(this).animate({ 'margin-top': '-8px' }, 150);
	});
}
function iconHoverEffect() {
	$('.bannerWrap a .blank').css({ 'opacity': '0.5' }).hide();

	$('.icoL, .icoR').hover(function () {
		_this = $(this);
		icoLR_mouseOver(_this);
	}, function () {
		_this = $(this);
		icoLR_mouseOut(_this);
	});
	$('.icoT, .icoB').hover(function () {
		_this = $(this);
		icoTB_mouseOver(_this);
	}, function () {
		_this = $(this);
		icoTB_mouseOut(_this);
	});

	$('.bannerWrap a').hover(function () {
		$(this).find('.blank').stop(false, true).fadeIn();
		_this = $(this).find('span');
		icoLR_mouseOver(_this);
	}, function () {
		$(this).find('.blank').stop(false, true).fadeOut();
		_this = $(this).find('span');
		icoLR_mouseOut(_this);
	});
	setTimeout(function () {
		var selThs;
		$("select").each(function () {
			selThs = $(this).index();
			$(this).children("option").each(function (selThs) {
				if ($(this).attr("selected")) {
					//$(".selectedvalue").html( $(this).html() );
					//$(this).parent().parent().css('border','1px red solid');
					var thsVal = $(this).html();
					$(this).parent().parent().find('.selectedvalue').html(thsVal);
				}
			});
		});
	}, 10);
	$("select").change(function () {
		var text = $(this).find('option:selected').text();
		$(this).prev().html(text);
	});
}
function icoLR_mouseOver(_this) {
	return false;// clients feedback
	if (_this.hasClass('disable')) { return false }
	$('.icoL img, .icoR img').removeAttr('style');//reset img values
	var ths1 = _this.find('img').stop(true, false);
	var marT = Number(ths1.css('margin-top').split('px')[0]);
	var marL = Number(ths1.css('margin-left').split('px')[0]);
	var hght = Number(ths1.css('height').split('px')[0]);
	var incre = 25;//default Top values..
	if (ths1.parent().hasClass('icoR')) { incre = incre * (-1) }
	else if (ths1.parent().hasClass('icoRR')) { incre = incre * (-1) }
	ths1.animate({ 'margin-left': (marL - (incre)) + 'px', 'opacity': '0.5' }, 150, function () {
		ths1.css({ 'margin-left': (marL + (incre)) + 'px', 'opacity': '1' });
		ths1.animate({ 'margin-left': (marL) + 'px' }, 150, function () {
			ths1.removeAttr('style');
		});
	});
}
function icoLR_mouseOut(_this) {
	return false;
}
function icoTB_mouseOver(_this) {
	return false;// clients feedback
	if (_this.hasClass('disable')) { return false }
	$('.icoT img, .icoB img').removeAttr('style');//reset img values
	var ths1 = _this.find('img').stop(true, false);
	var marT = Number(ths1.css('margin-top').split('px')[0]);
	var marL = Number(ths1.css('margin-left').split('px')[0]);
	var hght = Number(ths1.css('height').split('px')[0]);
	var incre = 25;//default Top values..
	if (ths1.parent().hasClass('icoB')) { incre = incre * (-1) }
	ths1.animate({ 'margin-top': (marT - (incre)) + 'px', 'opacity': '0.5' }, 150, function () {
		ths1.css({ 'margin-top': (marT + (incre)) + 'px', 'opacity': '1' });
		ths1.animate({ 'margin-top': (marT) + 'px' }, 150, function () {
			ths1.removeAttr('style');
		});
	});
}
function icoTB_mouseOut(_this) {
	return false;
}
function detectIpad() {
	if (navigator.userAgent.match(/iPad/i)) {
		$('html').addClass('ipad');
		setTimeout(function () {
			$('body *').hover(function () {
				return false;
			}, function () {
				return false;
			});
		}, 1000);
	}
}
var curVal;
function showSearchResult() {

	$('.ui-autocomplete li a').live('click', function () {
		curVal = $(this).text();
		$('#tempVal').text(curVal);
		setTimeout(function () {
			curValNew = $('#tempVal').text();
			$('#txtProjectname').val(curVal);
			$('#btnSearch').click();
		}, 100);
	});
	$(document).keyup(function (e) {
		//if( $('#txtProjectname').val().length > 1 ){
		if (e.keyCode == 13) {//enter button
			$('#btnSearch').click();

		}
		//}
	});
	/*
	*/
	$('.searchProjectBox').append('<span id="tempVal" style="display:none"></span>');

	if ($('.searchResultScroller').length > 1) {
		$('.btnOurProjects').hide();
		$('.headerWrap #searchResultWrapper').remove();
	}
	if ($('.searchResultScroller').length != 0) {
		$('.searchResultScroller').removeAttr('style');
		var srs_ht = (($('.searchResultScroller').css('height')).split('px')[0]);
		var srsWrap_ht = $('.searchResultRight').height();

		if (srs_ht < srsWrap_ht) { $('.searchResultRight .top, .searchResultRight .bottom').addClass('disable').css('opacity', '0.3'); }


		$('.searchResultRight .top').click(function () {
			var scrThs = '0';
			var ths = $(this);
			if (!$('.searchResultScroller').is(":animated") && !ths.hasClass('disable')) {
				var srs_ht = (($('.searchResultScroller').css('height')).split('px')[0]) - srsWrap_ht;
				var srs_marT = ($('.searchResultScroller').css('margin-top')).split('px')[0];
				var aniVal = (srs_marT - (-272));
				if (aniVal == 0) { aniVal = 55 }
				$('.searchResultScroller').animate({ 'margin-top': aniVal + 'px' }, 800, function () {
					srs_marT = ($('.searchResultScroller').css('margin-top')).split('px')[0];
					$('.searchResultRight .disable').removeAttr('style').removeClass('disable');
					if (srs_marT >= 0) {
						$('.searchResultScroller').animate({ 'margin-top': '0px' }, 300);
						ths.addClass('disable').css('opacity', '0.3');
						return false;
					}
				});
			}
		});
		$('.searchResultRight .bottom').click(function () {
			var ths = $(this);
			if (!$('.searchResultScroller').is(":animated") && !ths.hasClass('disable')) {
				var srs_ht = (($('.searchResultScroller').css('height')).split('px')[0]) - srsWrap_ht;
				var srs_marT = ($('.searchResultScroller').css('margin-top')).split('px')[0];
				$('.searchResultScroller').animate({ 'margin-top': srs_marT - 272 + 'px' }, 800, function () {
					srs_marT = ($('.searchResultScroller').css('margin-top')).split('px')[0];
					$('.searchResultRight .disable').removeAttr('style').removeClass('disable');
					if (-srs_marT >= srs_ht) {
						$('.searchResultScroller').animate({ 'margin-top': -srs_ht + 'px' }, 300);
						ths.addClass('disable').css('opacity', '0.3');
						return false;
					}
				});
			}
		});

		$('a.btnOurProjects').click(function () {

			$('a.btnOurProjects').fadeOut();
			if ($('.bannerCarouselWrapper').length != 0) {///////below code is just for homepage 
				if ($('.bannerCarouselWrapper').css('overflow') == 'visible') {
					$('.openLyteboxCarousel').animate({ 'top': '50px', 'opacity': '0' }, 400, function () {
						$('.openLyteboxCarousel').css({ 'top': '0px', 'opacity': '1', 'visibility': 'hidden' });
						$('.openLyteboxCarousel').removeAttr('style').removeClass('openLyteboxCarousel');
					});
					$('.bannerCarouselWrapper .close').fadeOut();
				}
				else {
					$('.bannerCarouselWrapper').css('overflow', 'visible');
					$('#lyteboxCarouselOverlay').show().animate({ 'top': '0', 'height': '575px', 'opacity': '0.5' }, 500, function () {
						$('#lyteboxCarouselOverlay').css({ 'border': '0' });
					});
				}
				$('#searchResultWrapper').animate({ 'border': '0' }, 400, function () {
					$('#searchResultWrapper').addClass('openLyteboxCarousel').css({ 'top': '-100px', 'opacity': '0', 'visibility': 'visible' });
					$('#searchResultWrapper').delay(500).animate({ 'top': '0px', 'opacity': '1' }, 600, function () {
						$('#searchResultWrapper').animate({ 'top': '-50px' }, 700);
					});
				});
			}
			else {///////below code is just for all inner pages
				$('.closeMenu').click();
				$('#searchResultWrapper').addClass('openLyteboxCarousel').css({ 'margin-top': '0px', 'top': '-100px', 'opacity': '0', 'visibility': 'visible' });
				$('#searchResultWrapper').delay(500).animate({ 'margin-top': '149px', 'top': '0px', 'opacity': '1' }, 600, function () {
					$('#searchResultWrapper').animate({ 'top': '-50px' }, 700);
				});
			}

			/* reset all the values  options in the search box Start */
			$('.searchResultLeft .selectBoxWrap option').removeAttr('selected');
			$('.searchResultLeft').addClass('searchResultDisable');
			$('.searchResultLeft .selectBoxWrap').eq(0).find('option').eq(0).attr('selected', 'selected').parents('.selectBoxWrap').find('.selectedvalue').text('All');
			$('.searchResultLeft .selectBoxWrap').eq(1).css('opacity', '0.3').find('option').eq(0).attr('selected', 'selected').parents('.selectBoxWrap').find('.selectedvalue').text('All');
			$('.searchResultLeft .selectBoxWrap').eq(2).css('opacity', '0.3').find('option').eq(0).attr('selected', 'selected').parents('.selectBoxWrap').find('.selectedvalue').text('All');
			getAllProjects();
			/* reset all the values  options in the search box Start */


			/*if( $('.video_container').length != 0 ){
				$('.video_container').delay(100).animate({'padding-top':'300px'},400);
			}*/
		});
		$('.searchResultHeading a').click(function () {
			/*if( $('.video_container').length != 0 ){
				$('.video_container').delay(100).animate({'padding-top':'0px'},400);
			}*/
			closeHomepageBanner();
		})

		$('#ddlProjectType').change(function () {
			if ($(this).val() == 0) {
				$('.searchResultLeft').addClass('searchResultDisable');
				$('.searchResultLeft .selectBoxWrap').eq(1).css('opacity', '0.3');
				$('.searchResultLeft .selectBoxWrap').eq(2).css('opacity', '0.3');
			}
			if ($(this).val() != 0) {
				$('.searchResultLeft').removeClass('searchResultDisable');
				$('.searchResultLeft .selectBoxWrap').eq(1).removeAttr('style').find('option').eq(0).attr('selected', 'selected').siblings().removeAttr('selected').parents('.selectBoxWrap').find('.selectedvalue').text('All');
				$('.searchResultLeft .selectBoxWrap').eq(2).removeAttr('style').find('option').eq(0).attr('selected', 'selected').siblings().removeAttr('selected').parents('.selectBoxWrap').find('.selectedvalue').text('All');
			}
		});
		$('.searchResultLeft').append('<div class="searchDisableDiv"></div>')
	}
}
function closeHomepageBanner() {
	if ($('.searchResultRight').length != 0) {
		$('body .hiddenOverlay').hide().remove('.hiddenOverlay');
		$('a.btnOurProjects').fadeIn();
		$('.bannerCarouselWrapper .close').fadeOut();
		$('.openLyteboxCarousel').animate({ 'top': '50px', 'opacity': '0' }, 400, function () {
			$('.openLyteboxCarousel').css({ 'top': '0px', 'opacity': '1', 'visibility': 'hidden' });
			$('.openLyteboxCarousel').removeAttr('style').removeClass('openLyteboxCarousel');
		});
		$('#lyteboxCarouselOverlay').css({ 'border-top': '2px #555 solid', 'border-bottom': '2px #555 solid' });
		$('#lyteboxCarouselOverlay').animate({ 'top': '287px', 'height': '1px', 'opacity': '1' }, 600, function () {
			$('#lyteboxCarouselOverlay').hide().removeAttr('style');
			$('.bannerCarouselWrapper').css('overflow', 'hidden');
		});
	}
};

function innerPageBottomCarousels() {
	var cLen = $('.carousel_wrapper').length;
	$('.bottomLeft .carouselPrev .icoL').addClass('disable');

	for (var c = 0; c < cLen; c++) {
		var thsWrap = $('.carousel_wrapper').eq(c);
		var cLiLen = thsWrap.find('.imgWrapper li').length;
		var cUlWid = parseInt(thsWrap.css('width'));

		thsWrap.find('.imgWrapper').css('width', (cLiLen * cUlWid) + 'px');
		thsWrap.find('.contWrapper').css('width', (cLiLen * cUlWid) * 2 + 'px');

		var liCont = '';
		for (var d = 0; d < cLiLen; d++) {
			liCont += '<li>' + thsWrap.find('.contWrapper li').eq(cLiLen - (d + 1)).html() + '</li>';
		}
		thsWrap.find('.imgWrapper').css('margin-left', '0px');
		thsWrap.find('.contWrapper').css('margin-left', (-cUlWid * (cLiLen - 1)) * 2 + 'px').html(liCont);

		if (cLiLen <= 1) {
			thsWrap.parent().find('.icoR').addClass('disable');
		}
	}
	$('.bottomMid .imgWrapper li a').click(function () {
		//showLitbox();
		$('.custSpeak .ltBoxContent').find('img').hide();
		//$('.custSpeak').show(); 
		var thsSrc = '<iframe width="660" height="420" src="' + $(this).attr('rel') + '?wmode=transparent&rel=0" frameborder="0"></iframe>';
		$('.custSpeak .ltBoxContent').append(thsSrc);


		setTimeout(function () {
			var overlayHeight = $(document).height();
			var centerDiv = $('.custSpeak');
			var height = $(window).height();
			var width = $(window).width();
			var left = ((width - parseInt(centerDiv.css('width'))) / 2) - (16);

			$(".ltBox").find('.closeLtBox').attr('href', 'javascript:;');

			$("html,body").animate({ scrollTop: 0 }, 500);
			centerDiv.css({ 'left': left, 'top': '80px' });

			$(".overlay").css({ 'height': overlayHeight, 'opacity': '0', 'visibility': 'visible' }).animate({ 'opacity': '0.65' }, 300);
			$(".custSpeak").delay(200).show().css({ 'opacity': '0', 'margin-top': '-100px' }).animate({ 'opacity': '1', 'margin-top': '0px' }, 800);
		}, 50);




	});
	$('.bottomLeft .carouselNext').click(function () {
		var ths = $(this);
		innerPageBottomCarouselDirection(ths, 'nxt');
	});
	$('.bottomLeft .carouselPrev').click(function () {
		var ths = $(this);
		innerPageBottomCarouselDirection(ths, 'prv');
	});
	function innerPageBottomCarouselDirection(ths, direction) {
		if (!ths.parents('.bottomLeft').find('*').is(":animated")) {
			var curWrapWid = parseInt(ths.parent().find('.carousel_wrapper').css('width'));
			var curPosiImg = parseInt(ths.parent().find('.imgWrapper').css('margin-left'));
			var curPosiCont = parseInt(ths.parent().find('.contWrapper').css('margin-left'));
			var b_aniImg = curWrapWid, b_aniCont = curWrapWid;

			if (direction == 'nxt') {
				b_aniCont = -curWrapWid;
				if (curPosiCont == 0) { return false; }
			}
			else if (direction == 'prv') {
				b_aniImg = -curWrapWid;
				if (curPosiImg == 0) { return false; }
			}
			ths.parent().find('.imgWrapper').animate({ 'margin-left': (curPosiImg - (b_aniImg)) + 'px' }, 800);
			//ths.parent().find('.contWrapper').animate({'margin-left':(curPosiCont-((b_aniCont)*2))+'px'},800);		
			ths.parent().find('.contWrapper').animate({ 'opacity': 0.3, 'margin-left': (curPosiCont - ((b_aniCont))) + 'px' }, 600);
			ths.parent().find('.contWrapper').animate({ 'opacity': 1, 'margin-left': (curPosiCont - ((b_aniCont) * 2)) + 'px' }, 600, function () {
				curPosiImg = parseInt(ths.parent().find('.imgWrapper').css('margin-left'));
				curPosiCont = parseInt(ths.parent().find('.contWrapper').css('margin-left'));
				ths.parents('.bottomLeft').find('.disable').removeClass('disable');
				if (direction == 'nxt' && curPosiCont == 0) { ths.find('span').addClass('disable'); }
				else if (direction == 'prv' && curPosiImg == 0) { ths.find('span').addClass('disable'); }
			});
		}
	}
}
function innerPageYearTabs() {
	if ($('.yearList').length != 0) {
		$('.yearList li a').click(function () {
			/********Start Code used in News Page************/
			$(".hdnVal").val(1); /*On Each click Need to set hidden value 1*/
			$($('.activeYearContent').find('.newsSegment')).each(function (index) {
				if (index < 6) {
					$(this).fadeIn();
				} else {
					$(this).fadeOut();
				}
			});

			$(this).parent().addClass('activeYear').siblings().removeClass('activeYear');
			id = '.year' + $(this).attr('title');
			$(id).addClass('activeYearContent').siblings().removeClass('activeYearContent');

			if ($('.activeYearContent').find('.newsSegment').length <= 6) {
				$(".highlight_content .viewMoreMaster .viewMore").hide();
			} else {
				$(".highlight_content .viewMoreMaster .viewMore").show();
				$(".highlight_content .viewMoreMaster .viewMore").find('span:first-child').text('View more').next().removeAttr("class").addClass("moreArrow").parent().removeClass('actView');
			}
			/********End Code used in News Page************/


			/*********Start Code used in Awards ane leadershipTeam****************/
			if ($(".NewContainer").length <= 0) {
				if ($(id).find('.yearDetails').length == 0) {
					$('.viewMore').fadeOut();
				}
				else if ($(id).find('.yearDetails').length == 1) {
					$('.viewMore').fadeIn();
				}
				if ($(id).find('.yearDetails').css("display") == "block") {
					$('.viewMore').find('span:first-child').text('Less').next().removeAttr("class").addClass("lessArrow").parent().addClass('actView');
				}
				else {
					$('.viewMore').find('span:first-child').text('View more').next().removeAttr("class").addClass("moreArrow").parent().removeClass('actView');
				}
			}
			/*********End Code used in Awards ane leadershipTeam****************/

		}).eq(0).click();

		$('.viewMore').click(function () {
			/********Start Code used in News Page************/
			var ths = $('.activeYearContent').find('.newsSegment');
			var cnt = ths.length;
			var hdnVal = $(".hdnVal").val();
			var flag = true;
			var ClickedText = $(this).text();

			if (ClickedText == 'Less') {
				$($('.activeYearContent').find('.newsSegment')).each(function () {
					$(this).fadeOut();
				});
			}

			$($('.activeYearContent').find('.newsSegment')).each(function (index) {
				if (index < (parseInt(hdnVal) * 6) + 6) {

					$(this).fadeIn();

					if ((ClickedText == 'Less') && index == 5) { /*Once Less clicked show only top six records*/
						$(".viewMoreMaster .viewMore").find('span:first-child').text('View more').next().removeAttr("class").addClass("moreArrow").parent().removeClass('actView');
						$(".hdnVal").val(1);
						return false;
					}

					if (index + 1 == cnt) { /*To Set Less text once reach the end limit*/
						$(".viewMoreMaster .viewMore").find('span:first-child').text('Less').next().removeAttr("class").addClass("lessArrow").parent().addClass('actView');
						$(".hdnVal").val(1);
					}

					if (flag) { /*To Set hidden Value*/
						$(".hdnVal").val(parseInt($(".hdnVal").val()) + 1);
						flag = false;
					}
				}
			})
			/********End Code used in News Page************/


			/*********Start Code used in Awards ane leadershipTeam****************/
			if ($(".NewContainer").length <= 0) {
				var ths = $('.activeYearContent').find('.yearDetails');

				if (ths.hasClass('activeYearDetails')) {
					ths.removeClass('activeYearDetails').slideUp();
					$(this).find('span:first-child').text('View more').next().removeAttr("class").addClass("moreArrow").parent().removeClass('actView');
				}
				else {
					//alert(0)
					ths.addClass('activeYearDetails').slideDown();
					$(this).find('span:first-child').text('Less').next().removeAttr("class").addClass("lessArrow").parent().addClass('actView');
				}
			}
			/*********End Code used in Awards ane leadershipTeam****************/
		}) //yearContent year2012 activeYearContent
	}
}

function activateGalleryFunc_test() {
	//alert('clicked');
}
var GTim;
var mCSB_draggerContainerFlag = false;
function activateGalleryFunc() {
	if ($('.imgGalleryWrapper').length != 0) {
		setTimeout(function () {
			//$(window).load(function(){
			$(".content_5").mCustomScrollbar({
				scrollButtons: {
					enable: false
				}
			});
			$(document).mouseup(function () {
				if (mCSB_draggerContainerFlag == true) {
					imgGalleryScroller();
				}
			});
			$('.mCSB_draggerContainer').mouseup(function () {
				imgGalleryScroller();
			});
			$('.mCSB_draggerContainer').mousedown(function () {
				mCSB_draggerContainerFlag = true;
			});
			$('.content_5').bind('mousewheel', function (e) {
				imgGalleryScroller();
			});
			function imgGalleryScroller() {
				clearInterval(GTim);
				var tVal1 = 0;
				var tVal2 = 0;
				GTim = setInterval(function () {
					tVal1 = parseInt($('.mCSB_container').css('top'));
					if (tVal1 != tVal2) {
						tVal2 = tVal1;
					}
					else if (tVal1 == tVal2) {
						var topPosi = Math.abs(parseInt($('.smlImgWrapper .mCustomScrollBox .mCSB_container').css('top')));
						var scrPosi = Math.round((Math.round(topPosi / 100)) * 100);

						$(".content_5").mCustomScrollbar("scrollTo", scrPosi);
						clearInterval(GTim);
					}
					mCSB_draggerContainerFlag = false;
				}, 50);
			}

			$('.imgGalleryWrapper .smlImgWrapper li').live('click', function () {
				if (!$('.imgGalleryWrapper .aniObj').is(':animated') && !$(this).hasClass('active')) {
					if (parseInt($(this).find('.big').css('height')) < 50) {
						alert('Image not loaded');
						return false;
					}

					var clickImgSrc = $(this).find('.big').attr('src');
					$(this).addClass('active').siblings().removeClass('active').parent().find('.big').removeAttr('style');

					_stagePosiT = getOffset('.bigImgWrapper', 'T');
					_stagePosiL = getOffset('.bigImgWrapper', 'L');
					_objPosiT = getOffset($(this), 'T');
					_objPosiL = getOffset($(this), 'L');

					_targetT1 = (_stagePosiT) - (-113);
					_targetL1 = (_stagePosiL) - (-210);

					_targetT2 = (_stagePosiT) - (-7);
					_targetL2 = (_stagePosiL) - (-6);

					_objAni = $(this).find('.big');
					_objAni = $('.imgGalleryWrapper .aniObj');

					$('.imgGalleryWrapper .aniObj').removeAttr('style').show().attr('src', clickImgSrc).css({ 'top': _objPosiT + 'px', 'left': _objPosiL + 'px', 'margin-top': '3px', 'margin-left': '3px' });
					$('.imgGalleryWrapper .bigImg img').fadeOut(1300);
					_objAni.animate({ 'top': _targetT1 + 'px', 'left': _targetL1 + 'px' }, 400, function () {
						_objAni.animate({ 'top': _targetT2 + 'px', 'left': _targetL2 + 'px', 'width': '531px', 'height': '300px' }, 300, function () {

							var newSrc = _objAni.attr('src');
							$('.imgGalleryWrapper .bigImg img').stop().attr('src', newSrc).removeAttr('style');
							_objAni.removeAttr('style');

						});

					});
				}
				var image_title = $(this).find("img").attr('title');
				$(".imgTitle").text(image_title);
			})
			function getOffset(ths, dir) {
				if (dir == 'T') { off = $(ths).offset().top; }
				if (dir == 'L') { off = $(ths).offset().left; }
				return off;
			}
			setTimeout(function () {
				$('.imgGalleryWrapper .smlImgWrapper li').eq(0).click();
			}, 500)

			//});

			/*$('#body_ddlPhotoType').change(function(){
				setTimeout(function(){
					alert('go');
					activateGalleryFunc();
				},500);
			});*/

		}, 200);
	}
}

function showFormLightbox() {
	if ($('.formLtbox').length != 0) {
		//showLitbox()
		setTimeout(function () {
			var overlayHeight = $(document).height();
			var centerDiv = $('.formLtbox');
			var height = $(window).height();
			var width = $(document).width() + 15;
			var left = ((width - parseInt(centerDiv.css('width'))) / 2) - (16);
			//$(".ltBox").find('.closeLtBox').attr('href','javascript:;');
			$("html,body").animate({ scrollTop: 0 }, 500);
			centerDiv.css({ 'left': left, 'top': '50px' });
			$(".overlay").css({ 'height': overlayHeight, 'opacity': '0', 'visibility': 'visible' }).animate({ 'opacity': '0.65' }, 300);
			$(".formLtbox").delay(200).show().css({ 'opacity': '0', 'margin-top': '-100px' }).animate({ 'opacity': '1', 'margin-top': '0px' }, 800);

		}, 50);
	}
}

function showLightbox() {
	$(".boxLink, .zoom, .popUpLink").click(function () {
		if ($(this).hasClass('zoom')) {
			var imgLocation = $(this).parent().find("img").attr('src');
			$(".ltBoxContent").find('img').attr('src', imgLocation);
		}
		if ($(this).hasClass('boxLink')) {

			var lytCont = $(this).parents('.box').find('.ltBoxContent').html();
			$(".ltBox .ltBoxContent").html(lytCont);
		}
		showLitbox();
	});
	$(".closeLtBox, .overlay").click(function () {
		$(".ltBox").fadeOut();
		$(".overlay").delay(300).animate({ 'opacity': '0' }, 300, function () {
			$(this).removeAttr("style");
			if ($('.custSpeak').length != 0) {
				$('.custSpeak .ltBoxContent iframe').remove();
			}
		});
	});
}
function showLitbox() {
	$('.ltBoxContent').find('img').show();
	setTimeout(function () {
		var overlayHeight = $(document).height();
		var centerDiv = $('.ltBox');
		var height = $(window).height();
		var width = $(document).width() + 15;
		var left = ((width - parseInt(centerDiv.css('width'))) / 2) - (16);
		$(".ltBox").find('.closeLtBox').attr('href', 'javascript:;');
		$("html,body").animate({ scrollTop: 0 }, 500);
		centerDiv.css({ 'left': left, 'top': '50px' });
		$(".overlay").css({ 'height': overlayHeight, 'opacity': '0', 'visibility': 'visible' }).animate({ 'opacity': '0.65' }, 300);
		$(".ltBox").delay(200).show().css({ 'opacity': '0', 'margin-top': '-100px' }).animate({ 'opacity': '1', 'margin-top': '0px' }, 800);

	}, 50);
}

function clearInput() {
	$('input').focus(function () {
		var value = $(this).val();
		var title = $(this)[0].title;
		if (value == title) {
			$(this).val("");
		}
	});
	$('input').blur(function () {
		if ($(this).val() == "") {
			$(this).val($(this)[0].title)
		}
	});
}

function photoGal2(ths) {
	if (!ths.parent().parent().find('*').is(':animated')) {
		//alert(0)
		if (ths.attr('style') == undefined || ths.attr('style') == '') {
			var imdWrp = ths.show().find('img');
			var imgCln = ths.html();
			var imdWid = imdWrp.width();
			var imdHig = imdWrp.height();
			var tmpDiv = '';
			var imgCSS = 'position:absolute; top:0; left:0; z-index:110; overflow:hidden;';
			var imgCut = 5;
			var imdWidNew = imdWid / imgCut;
			var imgTotalD = (100 * imgCut) + 800;
			if ('v' == '\v') { imgTotalD = (400 * imgCut) + 800; }

			//alert(imdWid);
			ths.css({ 'z-index': '100' }).find('img').hide();
			for (var i = 0; i < imgCut; i++) {
				tmpDiv += '<div class="galSld" style="' + imgCSS + '">' + imgCln + '</div>';
			}
			ths.append(tmpDiv);
			ths.find('.galSld').css({ 'height': imdHig + 'px', 'width': imdWidNew, 'margin-left': '50px', 'opacity': '0' }).find('img').css({ 'height': imdHig + 'px', 'width': imdWid });
			for (var j = 0; j < imgCut; j++) {
				ths.find('.galSld').eq(j).css({ 'left': imdWidNew * j }).find('img').css({ 'margin-left': -imdWidNew * j });
				if ('v' == '\v') {
					ths.find('.galSld').eq(j).delay(400 * j).animate({ 'margin-left': 0, 'opacity': '1' }, 800);
				}
				else {
					ths.find('.galSld').eq(j).delay(100 * j).animate({ 'margin-left': 0, 'opacity': '1' }, 800);
				}
			}
			ths.delay(imgTotalD).animate({ 'border': '0' }, 0, function () {
				ths.removeAttr('style').show().css({ 'z-index': '5' }).siblings('li').removeAttr('style');
				ths.find('img').show();
				ths.find('.galSld').remove();
			});
		}
	}
}

function ShowPlansTabs() {
	if ($('.plans_tabs').length != 0) {

		$('.innerLinks').show();
		if ($('.plans_tabs').height() > 400) {
			if ($(".plans_tabs .up").length == 0) {
				var ulCont = '<div style="height:340px; overflow:hidden; float:left;"><ul class="innerLinks" style="display:block;">' + $('.plans_tabs li').eq(1).find('ul').html() + '</ul></div><a href="javascript:;" class="up">up</a><a href="javascript:;" class="dwn">down</a>';
				$('.plans_tabs li').eq(1).find('ul').remove();
				$('.plans_tabs li').eq(1).append(ulCont);


				$(".activeTb .up").live('click', function () {
					var thsBt = $(this);
					if (thsBt.hasClass('disable')) { return false }
					var thsUl = $(this).parent().find('ul');
					var posT = parseInt(thsUl.css('margin-top')) - 100;
					thsUl.animate({ 'margin-top': posT }, 300, function () {
						var upVal = thsUl.height() - 330;
						if (Math.abs(parseInt(thsUl.css('margin-top'))) >= upVal) {
							thsUl.animate({ 'margin-top': -upVal }, 300);
							thsBt.addClass('disable');
						}
						thsBt.siblings().removeClass('disable');
					});
				});

				$(".activeTb .dwn").live('click', function () {
					var thsBt = $(this);
					if (thsBt.hasClass('disable')) { return false }
					var thsUl = $(this).parent().find('ul');
					var posT = parseInt(thsUl.css('margin-top')) + 100;
					thsUl.animate({ 'margin-top': posT }, 300, function () {
						if (parseInt(thsUl.css('margin-top')) >= 0) {
							thsUl.animate({ 'margin-top': 0 }, 300);
							thsBt.addClass('disable');
						}
						thsBt.siblings().removeClass('disable');
					});
				});
			}
		}

		$(".tabs_content .plans_tabs li a.ddText").live('click', function () {
			if (!$(this).parent().parent().find('*').is(':animated')) {
				$(".tab_content_rhs .rhs_content").eq($(this).parent().index()).show().siblings().hide();
				$(this).parent().parent().find('.Arrw').removeClass('Arrw');
				$(this).parent().addClass("activeTb").siblings().removeClass("activeTb").find(".innerLinks").slideUp();
				$(this).find('span').addClass('Arrw');
				$(this).parent().find(".innerLinks").slideDown();
			}
		}).eq(0).click();



		$(".tabs_content .innerLinks li a").live('click', function () {
			$(".tabbed_img_container .innerTabContainer").eq($(this).parent().index()).show().siblings().hide();
			$(this).parent().addClass("activeInnerLink").siblings().removeClass("activeInnerLink");
		}).eq(0).click();
		/**/
	}
}
function clearFields() {
	$(".formTabsCOntent .formContent").find("input").not(".submitBtn").val("");
	$(".formTabsCOntent .formContent").find("textarea").val("");
	$(".formTabsCOntent .formContent").find('input:radio').eq(0).click();
	$(".formTabsCOntent select").each(function () {
		$(this).find('option').removeAttr("selected").eq(0).attr("selected", "selected");
		$(this).prev().text("Select")
	});
	$(".errormsg").hide()
}
function showContactTabs() {
	if ($('ul.formTabs').length != 0) {
		$("ul.formTabs li").click(function () {
			$(".formTabsCOntent .formContent").eq($(this).index()).show().siblings().hide();
			$(this).addClass("activeForm").siblings().removeClass("activeForm");
			if ($('#body_cvMessage').css('display') == 'none') {
				if ($('#body_CustomValidator2').css('display') == 'none') {
					clearFields();
				}
				//clearFields();
			}
			inputt();
		}).eq(0).click();
		var currentUrl = $(location).attr('href');
		var value = currentUrl.substring(currentUrl.lastIndexOf('#') + 1);

		$("ul.formTabs li#" + value).click();

		setTimeout(function () {
			if ($('#body_txtTest').length != 0) {
				var ProjectType = (($('#body_txtTest').val()).split('|')[0]).split('ProjectType:')[1];
				var ProjectName = (($('#body_txtTest').val()).split('|')[1]).split('ProjectName:')[1];

				for (var i = 0; i < $('#body_ddlProjectType option').length; i++) {
					if ($('#body_ddlProjectType option').eq(i).val() == ProjectType) {
						$('#body_ddlProjectType option').eq(i).attr('selected', 'selected').siblings().removeAttr('selected');
						break;
					}
				}
				for (var i = 0; i < $('#body_ddlProject option').length; i++) {
					if ($('#body_ddlProject option').eq(i).val() == ProjectName) {
						$('#body_ddlProject option').eq(i).attr('selected', 'selected').siblings().removeAttr('selected');
						break;
					}
				}
			}
		}, 10)
	}
}


function contactLhsScroll() {
	if ($('#applyScroll').length != 0) {
		$("#applyScroll").mCustomScrollbar({
			scrollButtons: {
				enable: false
			}
		});
	}
}


function inputt() {
	if ($('input').prev('span').length == 0) {

		$("<span></span>").insertBefore('input');
	}
	/*$('input:checkbox').live('click', function(){
		var Check = $(this).is(':checked');
		if(Check){
			$(this).prev('span').addClass('cheked').removeClass('uncheked');
		}else{		
			$(this).prev('span').addClass('uncheked').removeClass('cheked');
		}
	});	*/

	$('input:radio').live('click', function () {
		var Check = $(this).is(':checked');
		if (Check) {
			//$(this).prev('span').addClass('cheked').removeClass('uncheked').parent().siblings().find('span').addClass('uncheked').removeClass('cheked');
			$(this).parent().addClass('cheked').removeClass('uncheked').siblings().addClass('uncheked').removeClass('cheked');
		}
	}).eq(0).click();
	//$('input:checked').parent).addClass('cheked').removeClass('uncheked');
	//$('input:checked').prev('span').addClass('cheked').removeClass('uncheked');
}

function innerNav() {
	if ($('.inner_nav').length != 0 && !$('.inner_nav').hasClass('projectNav')) {
		$("ul.inner_nav li").click(function () {
			$(".detailed_content .divContent").eq($(this).index()).show().siblings().hide();
			$(this).find('a').addClass("active").parent().siblings().find('a').removeClass("active");
			if ($('.accordian-header').length != 0) {
				$(".detailed_content .divContent").eq($(this).index()).find(".accordian-header").eq(0).click();
			}
		}).eq(0).click();

		var currentUrl = $(location).attr('href');
		var value = currentUrl.substring(currentUrl.lastIndexOf('#') + 1);
		$("ul.inner_nav li").eq(value).click();
	}
}
/*accordianjs*/

function custGuideAccordian() {
	if ($('.accordian-header').length != 0) {
		$(".divContent .accordian-header").click(function () {
			if ($(this).hasClass('selected')) return false; //This line is to cancel click event for the current header
			$(".accordian-header").removeClass('selected').next().slideUp();//this line is for the headers other then the clicked one
			$(this).addClass("selected").next().slideToggle(); //This line is for the current clicked header
		}).eq(0).click();
	}
}


function updateProjectSearch() {
	$('.searchResultRight .searchResultScroller').css('margin-top', '0px');
	$('.searchResultRight .icoT, .searchResultRight .icoB').addClass('disable').css('opacity', '0.3');
	if ($('.searchResultScroller').height() > $('.searchResultRight').height()) {
		$('.searchResultRight .icoB').removeClass('disable').removeAttr('style');
	}

	if ($('.srw .searchResultRight .searchResultScroller ul').length == 0 && $('.srw .searchResultRight .searchResultScroller h5').length == 0) {
		var type = $("#ddlProjectType").find('option:selected').text();
		var location = $("#ddlCity").find('option:selected').text();
		var status = $("#ddlProjectStatus").find('option:selected').text();

		var strMsg = "There are no records found for";

		if (type != 'All') {
			var strType = type;
		}
		else {
			var strType = "";
		}

		if (location != 'All') {
			var strLoc = "in " + location;
		}
		else {
			var strLoc = " ";
		}

		if (status != 'All') {
			var strStatus = status;
		}
		else {
			var strStatus = " ";
		}

		var finalStr = strMsg + " " + strStatus + " " + strType + " " + "projects " + strLoc;
		$('.srw .searchResultRight .searchResultScroller').append("<p>" + finalStr + "</p>");
	}

}
function menuSubNav() {
	$(".subNav li a").click(function () {
		$(".closeMenu").click();
		$("ul.inner_nav li").eq($(this).parent().index() - 1).click();
	})
	$(".navContact li a").click(function () {
		$(".closeMenu").click();
		setTimeout(function () {
			window.location.reload();
		}, 1000)
		//$("ul.formTabs li#"+value).click();
	})
}
function applyBullets() {
	if ($('.projectHightlights').length != 0) {
		$(".projectHightlights li").each(function () {
			$(this).prepend('<span></span>')
		})
	}
}
function showAmenitiesContent() {
	if ($('.content_lists_wrapper ul').length != 0) {

		$('.content_lists_wrapper ul, .content_lists_wrapper ul li').removeAttr('style');
		$(".content_lists_wrapper ul li").each(function () {
			$(this).prepend('<span></span>');
		})

		$('.tab_list li').live('click', function () {
			var ind = $(this).index();
			$(this).addClass('activeTb').siblings().removeClass('activeTb');
			var galThs = $(this).parents('.tabs_content').find('.tabbed_img li').eq(ind);
			$('.detailed_content h1').html($(this).text());
			$('.content_lists_wrapper ul').slideUp(400);
			$('.content_lists_wrapper ul').eq(ind).delay(1000).slideDown(600);
			photoGal2(galThs);
		}).eq(0).click();

	}
}
function updateSearchSelectbox() {
	setTimeout(function () {
		var cityArr = ($('#txtcity').val()).split(',');
		var cityArrDel = '0123456789';
		var statusArr = ($('#txtStatus').val()).split(',');
		var statusArrDel = '0123456789';
		var len1 = cityArr.length;
		var len2 = statusArr.length;
		var ddValue1 = '', ddValue2 = '';

		$('#ddlCity').html($('#dummyDD #dd1').html());
		$('#ddlProjectStatus').html($('#dummyDD #dd2').html());

		for (var i = 0; i < 10; i++) {
			if ($('#ddlCity option').eq(i).val() == cityArr[0]) {
				$('#ddlCity option').eq(i).attr('selected', 'selected');
				$('#ddlCity').parent().find('.selectedvalue').text($('#ddlCity option').eq(i).text());
			}
		}

		for (var i = 0; i < 10; i++) {
			if ($('#ddlProjectStatus option').eq(i).val() == statusArr[0]) {
				$('#ddlProjectStatus option').eq(i).attr('selected', 'selected');
				$('#ddlProjectStatus').parent().find('.selectedvalue').text($('#ddlProjectStatus option').eq(i).text());
			}
		}

		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if (cityArrDel.charAt(j) == cityArr[i]) {
					ddValue1 = cityArrDel = cityArrDel.replace(cityArrDel.charAt(j), '');
				}
			}
			for (var k = 0; k < 10; k++) {
				if (statusArrDel.charAt(k) == statusArr[i]) {
					ddValue2 = statusArrDel = statusArrDel.replace(statusArrDel.charAt(k), '');
				}
			}
		}
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if ($('#ddlCity option').eq(i).val() == ddValue1.charAt(j)) {
					$('#ddlCity option').eq(i).addClass('deleteOpt');
				}
			}
		}
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if ($('#ddlProjectStatus option').eq(i).val() == ddValue2.charAt(j)) {
					$('#ddlProjectStatus option').eq(i).addClass('deleteOpt');
				}
			}
		}

		$('#ddlCity option').eq(0).removeAttr('class');
		$('#ddlProjectStatus option').eq(0).removeAttr('class');

		$('body .deleteOpt').remove();
	}, 1);
}
function defaultSearchSelectboxValues() {
	setTimeout(function () {
		var selectBk1 = '<select name="ddlCity" id="dd1">' + $('#ddlCity').html() + '</select>';
		var selectBk2 = '<select name="ddlCity" id="dd2">' + $('#ddlProjectStatus').html() + '</select>';
		$('body').append('<div id="dummyDD" class="hide">' + selectBk1 + ' ' + selectBk2 + '</div>');
	}, 500);
}

function leadershipTeamViewMore() {
	if ($('.box').length != 0) {
		$('#viewMore').click(function () {
			var ths = $('.contentBox').find('.corpDetails');
			if (ths.hasClass('activeCorpDetails')) {
				ths.removeClass('activeCorpDetails').slideUp();
				$(this).find('span:first-child').text('View more').next().removeAttr("class").addClass("moreArrow").parent().removeClass('actView');
			}
			else {
				ths.addClass('activeCorpDetails').slideDown();
				$(this).find('span:first-child').text('Less').next().removeAttr("class").addClass("lessArrow").parent().addClass('actView');
			}
		})
	}
}

function ieHack() {
	if ($.browser.msie) {
		var navLen = $(".navWrap3 .title").length;
		if ($(".navWrap3 .title span").length == 0) {
			for (i = 0; i < navLen; i++) {
				var thsTxt = '<span class="ieTitle">' + $(".navWrap3 .title").eq(i).text() + '</span>';
				$(".navWrap3 .title").eq(i).css('color', '#069').prepend(thsTxt);
			}
		}
	}
}

function locationMap() {
	$(".conatner1").click(function () {
		$("#map_image").hide();
		$("#map_canvas").show();
		initialize(document.getElementById('cph_ScriptManager_hdnLatitude').value, document.getElementById('cph_ScriptManager_hdnLongitude').value);
		$(this).hide();
		$(".conatner2").show()
	})

	$(".conatner2").click(function () {
		$("#map_canvas").hide();
		$("#map_image").show();
		$(this).hide();
		$(".conatner1").show()
	})
}
function telLinks() {
	var telNum;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$(".telNo").each(function () {
			telNum = 'tel:' + $(this).text().replace(/[^a-zA-Z0-9]/g, '');
			$(this).attr('href', telNum);
		})
	}
	else {
		$(".telNo").attr('href', 'javascript:;');
	}
}
function loadBgImage() {
	var bgClsName = $("#bgImage").attr('class');
	$("#wrapper").addClass(bgClsName)
}

/*$(window).load(function(){
	$("ul.formTabs li#"+value).click();						
});*/



/************************Start Devloped Murli on 6th May 2013*************************************/
function ValidateImageFile(sender, args) {
	//var file= document.getElementById('<%=fileProjectStatusImage.ClientID %>')
	var file = document.getElementById(sender.controltovalidate)
	if (validateFileExtension(file, true)) {
		args.IsValid = false;
		return false;
	}
	if (validateFileSize(file, 1048576)) {
		args.IsValid = false;
		return false;
	}
	args.IsValid = true;
}

function ValidateFile(sender, args) {
	//var file= document.getElementById('<%=fileProjectStatusImage.ClientID %>')
	var file = document.getElementById(sender.controltovalidate)
	if (validateFileExtension(file, false)) {
		args.IsValid = false;
		return false;
	}
	if (validateFileSize(file, 1048576)) {
		args.IsValid = false;
		return false;
	}
	args.IsValid = true;
}

function validateFileSize(component, maxSize) {
	if (navigator.appName == "Microsoft Internet Explorer") {
		if (component.value) {
			var oas = new ActiveXObject("Scripting.FileSystemObject");
			var e = oas.getFile(component.value);
			var size = e.size;
			//add your site to trusted zone and change following options in ie Tools Menu -> Internet Options -> Security -> Custom level -> "Initialize and script ActiveX controls not marked as safe for scripting"
		}
	} else {
		if (component.files[0] != undefined) {
			var size = component.files[0].size;
		}
	}

	Flag = (size != undefined && size > maxSize) ? true : false;
	return Flag;
}

function validateFileExtension(component, Isimage) {
	var Flag = false;
	var found = component.value.lastIndexOf('.') + 1;
	if (Isimage) {
		switch (found > 0 ? component.value.substr(found).toLowerCase() : "") {
			case "jpg":
			case "gif":
			case "png":
			case "jpeg":
				Flag = false;
				break;
			default:
				Flag = true;
				break;
		}
	}
	else {
		switch (found > 0 ? component.value.substr(found).toLowerCase() : "") {
			case "pdf":
			case "doc":
			case "docx":
				Flag = false;
				break;
			default:
				Flag = true;
				break;
		}
	}
	return Flag;
}
/************************End Devloped Murli on 6th May 2013*************************************/
