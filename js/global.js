$(window).on("load", function() {
	runAnimation();
});

function runAnimation() {
	new Promise(loadIntro).then(function() {
		new Promise(loadToday).then(function() {
			new Promise(loadUpcoming).then(function() {
				new Promise(loadVote).then(function() {
					reset();
					runAnimation();
				});
			});
		});
	});
}

function reset() {
	$(".brand-animation").addClass("wait").removeClass("reverse");
}

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

	$unused.removeClass("unused").css({
		"top" : $item.css("top"),
		"left" : $item.css("left")
	});
	$unused.data("top", $item.data("top"));
	$unused.data("left", $item.data("left"));
	$item.addClass("hidden");
	setTimeout(function() {
		$unused.removeClass("hidden")
		$item.addClass("unused");
	}, animationTime);
}

function explodeItems() {
	$("#items .item").each(function() {
		//Viewport sizes
		var vw = window.innerWidth;
		var vh = window.innerHeight;

		//Vector <dx, dy> represents item's current offset from center; rcur represents vector length
		var dx = parseInt($(this).css("left")) - vw / 2;
		var dy = parseInt($(this).css("top")) - vh / 2;
		var rcur = Math.sqrt(dx * dx + dy * dy);

		//rmax: maximum distance to send items; equal to the vector length of <vw / 2, vh / 2>
		//rmin: minimum distance to send items; radius of brand animation
		var rmax = 1.33 * vw;
		var rmin = 0.55 * vw;

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
		$(this).css({
			"left" : left,
			"top" : top
		});
	});
}

function implodeItems() {
	$("#items .item").each(function() {
		$(this).css({
			"left" : $(this).data("left"),
			"top" : $(this).data("top")
		})
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
var waitForIntroImplode = 2500 + waitForIntroReverse;
var introFinished = 3000 + waitForIntroImplode;

function loadIntro(resolve) {
	showItems();
	switchItems();
	setTimeout(explodeItems, waitForIntroExplode);
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
var waitForTodayImplode = 2500 + waitForTodayReverse;
var todayFinished = 3000 + waitForTodayImplode;

function loadToday(resolve) {
	loadTodayAnimation();
	explodeItems();
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
var upcomingAnimationDelay = 1000;
var waitForhideItems = 2000;
var waitForUpcomingAnimation = 7000 + upcomingAnimationDelay * 5;
var waitForUpcomingReverse = waitForUpcomingAnimation + upcomingAnimationDelay * 5;
var upcomingFinished = 1000 + waitForUpcomingReverse;

function loadUpcoming(resolve) {
	hideItems();
	setTimeout(loadUpcomingAnimation, waitForhideItems);
	setTimeout(reverseUpcomingAnimation, waitForUpcomingAnimation);
	setTimeout(resolve, upcomingFinished);
}

function loadUpcomingAnimation() {
	toggleUpcomingAnimations(true);
}

function reverseUpcomingAnimation() {
	toggleUpcomingAnimations(false);
}

function toggleUpcomingAnimations(on) {
	$items = $("#upcoming .header, #upcoming .event, #upcoming .footer");
	if(!on) {
		$items = $($items.get().reverse());
	}
	$items.each(function(i) {
		var $el = $(this);
		setTimeout(function(i) {
			$el.toggleClass("wait", !on);
		}, upcomingAnimationDelay * i)
	});
}

////////////////////////////////////////////////
//					VOTE
////////////////////////////////////////////////
var voteAnimationDelay = 1000;
var waitForVoteAnimation = 3000 + voteAnimationDelay * 6;
var voteFinished = 1000 + waitForVoteAnimation + voteAnimationDelay * 6;

function loadVote(resolve) {
	setupVoteUserInteraction();
	loadVoteAnimation();
	setTimeout(reverseVoteAnimation, waitForVoteAnimation);
	setTimeout(resolve, voteFinished);
}

function setupVoteUserInteraction() {
	$("#vote .option").click(function() {
		$(this).toggleClass("active");
	});

	$("#vote .vote").click(function() {
		var options = $("#vote .options.active .option").map(function() {
			return {
				"option" : $(this).data("option"),
				"selected" : $(this).hasClass("active") ? 1 : 0
			};
		}).get();
		var postData = {
			"options" : options,
			"device" : $("#vote").data("device"),
			"id" : $("#vote .options.active").data("id")
		};
		$.ajax({
			url : "ajax/vote.php",
			type : "POST",
			dataType : "JSON",
			data : postData,
			success : function(receivedData) {
				console.log(receivedData);
				$("#vote .confirmation").addClass("active");
				var index = ($("#vote .options.active").index() + 1) % $("#vote .options").length;
				$("#vote .options").removeClass("active").eq(index).addClass("active");
				$("#vote .question").removeClass("active").eq(index).addClass("active");
			}
		})
	});
}

function loadVoteAnimation() {
	toggleVoteAnimations(true);
}

function reverseVoteAnimation() {
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