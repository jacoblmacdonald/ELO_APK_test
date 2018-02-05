var counter = 0;
var iterationsBeforeReload = 20;
var online = true;

$(window).on("load", function() {
	runAnimation();
	testConnection();
	setupInteractiveOverlay();
	// $("body").click(function() { window.location.reload(); });
	$("#interactive-overlay .header .animation-content, #interactive-overlay .header .logo").click(function() { window.location.reload(); });
});

function runAnimation() {
	new Promise(loadIntro).then(function() {
		new Promise(loadToday).then(function() {
			new Promise(loadUpcoming).then(function() {
				new Promise(loadVote).then(function() {
					if(counter++ == iterationsBeforeReload && online) {
						window.location.reload();
					}
					else {
						reset();
						runAnimation();
					}
				});
			});
		});
	});
}

function testConnection() {
	setInterval(function() {
		$.ajax({
			url : "ajax/test-connection.php",
			success : function() { online = true; },
			error : function() { online = false; }
		});
	}, 5000);
}

function reset() {
	$(".brand-animation").addClass("wait").removeClass("reverse");
	$("#vote .option, #vote .confirmation span").removeClass("active");
	$("#vote .confirmation span.confirm").addClass("active");
}

////////////////////////////////////////////////
//					INTERACTIVE OVERLAY
////////////////////////////////////////////////
var interactiveOverlayTimeoutTime = 60000;
var interactiveOverlayPopupIntervalTime = 60000;
var interactiveOverlayPopupTime = 20000;

function setupInteractiveOverlay() {
	// setupFacialRecognition("facial-recognition-wrapper", onFaceDetection);
	$("body").click(function() {
		if($("#vote .header").hasClass("wait")) {
			$("#interactive-overlay").addClass("active");
			interactiveOverlayTimeout = setTimeout(function() { $("#interactive-overlay").removeClass("active"); }, interactiveOverlayTimeoutTime);
		}
	});
	$("#interactive-overlay-popup").click(function() {
		$("#interactive-overlay").addClass("active");
		interactiveOverlayTimeout = setTimeout(function() { $("#interactive-overlay").removeClass("active"); }, interactiveOverlayTimeoutTime);
	});
	$("#interactive-overlay").click(function() {
		clearTimeout(interactiveOverlayTimeout);
		interactiveOverlayTimeout = setTimeout(function() { $("#interactive-overlay").removeClass("active"); }, interactiveOverlayTimeoutTime);
	});
	setInterval(function() {
		$("#interactive-overlay-popup").addClass("active");
		setTimeout(function() {
			$("#interactive-overlay-popup").removeClass("active");
		}, interactiveOverlayPopupTime);
	}, interactiveOverlayPopupIntervalTime);
	$("#interactive-overlay .wait").removeClass("wait");
	$("#interactive-overlay .about .vote-link").click(function() {
		$("#interactive-overlay .section").removeClass("active").filter(".vote").addClass("active");

	});
	$("#interactive-overlay .vote .about-link").click(function() {
		$("#interactive-overlay .section").removeClass("active").filter(".about").addClass("active");
	});
	$("#interactive-overlay .tab").click(function() {
		$("#interactive-overlay .section").removeClass("active").filter("." + $(this).data("section")).addClass("active");
		$("#interactive-overlay .tab").removeClass("active").filter(this).addClass("active");
	});
	$("#interactive-overlay #vote-overlay .option").click(function() {
		$(this).toggleClass("active");
	});
	$("#interactive-overlay #vote-overlay .vote").click(function() {
		$(this).addClass("active");
		var $el = $(this);
		voteButtonAnimationTimeout = setTimeout(function() { $el.removeClass("active"); }, voteButtonAnimationDelay);
		var options = $("#interactive-overlay #vote-overlay .options.active .option").map(function() {
			return {
				"option" : $(this).data("option"),
				"selected" : $(this).hasClass("active") ? 1 : 0
			};
		}).get();
		if($("#interactive-overlay #vote-overlay .options.active .option.active").length == 0) {
			$("#interactive-overlay #vote-overlay .confirmation span").removeClass("active").filter(".error").addClass("active");
		}
		else {
			var postData = {
				"options" : options,
				"id" : $("#interactive-overlay #vote-overlay .options.active").data("id"),
				"location" : $("#interactive-overlay #vote-overlay").data("location"),
				"device" : $("#interactive-overlay #vote-overlay").data("device")
			};
			$.ajax({
				url : "ajax/vote.php",
				type : "POST",
				dataType : "JSON",
				data : postData,
				success : function(receivedData) {
					$("#interactive-overlay #vote-overlay .confirmation span").removeClass("active").filter(".confirm").addClass("active");
					var index = ($("#interactive-overlay #vote-overlay .options.active").index() + 1) % $("#interactive-overlay #vote-overlay .options").length;
					$("#interactive-overlay #vote-overlay .options").removeClass("active").eq(index).addClass("active");
					$("#interactive-overlay #vote-overlay .question").removeClass("active").eq(index).addClass("active");
				}
			});
		}
	});
}

// function onFaceDetection() {
// 	$("#interactive-overlay-popup").addClass("active");
// 	clearTimeout(interactiveOverlayTimeout);
// 	interactiveOverlayTimeout = setTimeout(function() { $("#interactive-overlay").removeClass("active"); }, interactiveOverlayTimeoutTime);
// }

////////////////////////////////////////////////
//					ITEMS
////////////////////////////////////////////////
var animationTime = 1000;
var waitTime = 3000;
var hideItemsStaggerOffset = 50;
var itemsInterval;

function switchItems() {
	itemsInterval = setInterval(switchItem, waitTime);
}

function switchItem() {
	var numItems = $("#items .item:not(.unused)").length;
	var itemIndex = Math.floor(Math.random() * numItems);
	var $item = $("#items .item:not(.unused)").eq(itemIndex);

	var numUnused = $("#items .item.unused").length;
	var unusedIndex = Math.floor(Math.random() * numUnused);
	var $unused = $("#items .item.unused").eq(unusedIndex);

	// $unused.removeClass("unused").css({
	// 	"top" : $item.css("top"),
	// 	"left" : $item.css("left")
	// });
	$unused.removeClass("unused").css("transform", $item.css("transform"));
	$unused.data("top", $item.data("top"));
	$unused.data("left", $item.data("left"));
	$item.addClass("hidden");
	setTimeout(function() {
		$unused.removeClass("hidden")
		$item.addClass("unused");
	}, animationTime);
}

function explodeItems(large) {
	$("#items .item").each(function() {
		//Viewport sizes
		var vw = window.innerWidth;
		var vh = window.innerHeight;

		//Item's position in pixels
		var left = parseInt($(this).data("left")) / 100 * vw;
		var top = parseInt($(this).data("top")) / 100 * vh;

		//Vector <dx, dy> represents item's current offset from center; rcur represents vector length
		var dx = left - vw / 2;
		var dy = top - vh / 2;
		var rcur = Math.sqrt(dx * dx + dy * dy);

		//rmax: maximum distance to send items; equal to the vector length of <vw / 2, vh / 2> (plus a little more)
		//rmin: minimum distance to send items; radius of brand animation
		//Update: for large brand animation, send items much farther
		var rmax = (large ? 2 : 1.33 + 0.2) * vw;
		var rmin = (large ? 1.5 : 0.55) * vw;

		//rratio: a fraction between 0 and 1, representing the item's distance from the center (higher means closer)
		//Used to move items proportionally away from the center (faster for items closer to the center)
		var rratio = 1 - (rcur / rmax);
		
		//Desired offset from center (vector length); this is where the tweaking happens
		var r = rcur + (rmin * rratio * rratio);

		//<dx1, dy1> represents item's new offset from center
		//<dx, dy> is normalized, then scaled by r (the desired vector length)
		var dx1 = (dx / rcur) * r;
		var dy1 = (dy / rcur) * r;

		//Converted back to usable measurements for animation
		var left = dx1 + vw / 2;
		var top = dy1 + vh / 2;
		// $(this).css({
		// 	"left" : left,
		// 	"top" : top
		// });
		$(this).css("transform", "translate(" + left + "px, " + top + "px)");
	});
}

function implodeItems() {
	$("#items .item").each(function() {
		// $(this).css({
		// 	"left" : $(this).data("left"),
		// 	"top" : $(this).data("top")
		// });
		$(this).css("transform", "translate(" + $(this).data("left") + ", " + $(this).data("top") + ")");
	});
}

function hideItems() {
	clearInterval(itemsInterval);
	var $items = $("#items .item:not(.unused)");
	Array.prototype.sort.call($items, function() {
		return Math.random() < 0.5;
	});
	$items.each(function(i) {
		var $el = $(this);
		setTimeout(function() {
			$el.addClass("hidden");
		}, hideItemsStaggerOffset * i);
	});
}

function showItems() {
	$("#items .item:not(.unused)").removeClass("hidden");
}

////////////////////////////////////////////////
//					INTRO
////////////////////////////////////////////////
var waitForIntroExplode = 1000;
var waitForIntroAnimation = 200 + waitForIntroExplode;
var waitForIntroReverse = 7000 + waitForIntroAnimation;
var waitForIntroImplode = 3250 + waitForIntroReverse;
var introFinished = 3000 + waitForIntroImplode;

function loadIntro(resolve) {
	showItems();
	switchItems();
	setTimeout(explodeItems.bind(false), waitForIntroExplode);
	setTimeout(loadIntroAnimation, waitForIntroAnimation);
	setTimeout(implodeItems, waitForIntroImplode);
	setTimeout(reverseIntroAnimation, waitForIntroReverse);
	setTimeout(resolve, introFinished);
}

function loadIntroAnimation() {
	$("#intro .brand-animation").removeClass("wait");
}

function reverseIntroAnimation() {
	$("#intro .brand-animation").addClass("reverse");
}

////////////////////////////////////////////////
//					TODAY
////////////////////////////////////////////////
var waitForTodayReverse = 7000;
var waitForTodayImplode = 4000 + waitForTodayReverse;
var todayFinished = 3000 + waitForTodayImplode;

function loadToday(resolve) {
	loadTodayAnimation();
	explodeItems(true);
	setTimeout(reverseTodayAnimation, waitForTodayReverse);
	setTimeout(implodeItems, waitForTodayImplode);
	setTimeout(resolve, todayFinished);
}

function loadTodayAnimation() {
	$("#today .brand-animation").removeClass("wait");
}

function reverseTodayAnimation() {
	$("#today .brand-animation").addClass("reverse");
}

////////////////////////////////////////////////
//					UPCOMING
////////////////////////////////////////////////
var upcomingAnimationDelay = 1750;
var upcomingReverseDelay = 1000;
var waitForUpcomingHideItems = 2000;
var waitForUpcomingHeaderAnimation = 1000 + waitForUpcomingHideItems;
var waitForUpcomingAnimation = 7000 + upcomingAnimationDelay * 4;
var waitForUpcomingReverse = waitForUpcomingAnimation + upcomingReverseDelay * 4;
var upcomingFinished = 1000 + waitForUpcomingReverse;

function loadUpcoming(resolve) {
	hideItems();
	setTimeout(loadUpcomingHeaderAnimation, waitForUpcomingHideItems);
	setTimeout(loadUpcomingAnimation, waitForUpcomingHeaderAnimation);
	setTimeout(reverseUpcomingAnimation, waitForUpcomingAnimation);
	setTimeout(reverseUpcomingHeaderAnimation, waitForUpcomingReverse);
	setTimeout(resolve, upcomingFinished);
}

function loadUpcomingHeaderAnimation() {
	$("#upcoming .header").removeClass("wait");
}

function reverseUpcomingHeaderAnimation() {
	$("#upcoming .header").addClass("wait");
}

function loadUpcomingAnimation() {
	toggleUpcomingAnimations(true);
}

function reverseUpcomingAnimation() {
	toggleUpcomingAnimations(false);
}

function toggleUpcomingAnimations(on) {
	$items = $("#upcoming .event, #upcoming .footer");
	if(!on) {
		$items = $($items.get().reverse());
	}
	$items.each(function(i) {
		var $el = $(this);
		setTimeout(function(i) {
			$el.toggleClass("wait", !on);
		}, (on ? upcomingAnimationDelay : upcomingReverseDelay) * i)
	});
}

////////////////////////////////////////////////
//					VOTE
////////////////////////////////////////////////
var voteButtonAnimationTimeout;
var voteButtonAnimationDelay = 1000;
var voteAnimationDelay = 1000;
var reverseVoteAnimationTimeout;
var voteFinishedTimeout;
var voteResolve;
var waitForVoteAnimation = 7000 + voteAnimationDelay * 6;
var voteFinished = 1000 + waitForVoteAnimation + voteAnimationDelay * 6;

function loadVote(resolve) {
	voteResolve = resolve;
	setupVoteUserInteraction();
	loadVoteAnimation();
	setVoteTimeouts();
}

function setVoteTimeouts() {
	clearTimeout(reverseVoteAnimationTimeout);
	reverseVoteAnimationTimeout = setTimeout(reverseVoteAnimation, waitForVoteAnimation);
	clearTimeout(voteFinishedTimeout);
	voteFinishedTimeout = setTimeout(voteResolve, voteFinished);
}

function setupVoteUserInteraction() {
	$("#vote .option").click(function() {
		$(this).toggleClass("active");
		setVoteTimeouts();
	});

	$("#vote .vote").click(function() {
		setVoteTimeouts();
		$(this).addClass("active");
		var $el = $(this);
		voteButtonAnimationTimeout = setTimeout(function() { $el.removeClass("active"); }, voteButtonAnimationDelay);
		var options = $("#vote .options.active .option").map(function() {
			return {
				"option" : $(this).data("option"),
				"selected" : $(this).hasClass("active") ? 1 : 0
			};
		}).get();
		if($("#vote .options.active .option.active").length == 0) {
			$("#vote .confirmation span").removeClass("active").filter(".error").addClass("active");
		}
		else {
			var postData = {
				"options" : options,
				"id" : $("#vote .options.active").data("id"),
				"location" : $("#vote").data("location"),
				"device" : $("#vote").data("device")
			};
			$.ajax({
				url : "ajax/vote.php",
				type : "POST",
				dataType : "JSON",
				data : postData,
				success : function(receivedData) {
					$("#vote .confirmation span").removeClass("active").filter(".confirm").addClass("active");
					var index = ($("#vote .options.active").index() + 1) % $("#vote .options").length;
					$("#vote .options").removeClass("active").eq(index).addClass("active");
					$("#vote .question").removeClass("active").eq(index).addClass("active");
				}
			});
		}
	});
}

function loadVoteAnimation() {
	toggleVoteAnimations(true);
}

function reverseVoteAnimation() {
	$("#vote .option, #vote .vote").off("click");
	toggleVoteAnimations(false);
}

function toggleVoteAnimations(on) {
	$items = $("#vote .header, #vote .options.active .option-container, #vote .vote, #vote .confirmation");
	if(!on) {
		$items = $($items.get().reverse());
	}
	$items.each(function(i) {
		var $el = $(this);
		setTimeout(function(i) {
			$el.toggleClass("wait", !on);
		}, voteAnimationDelay * i)
	});
}