$(window).on("load", function() {
	$(".hidden").removeClass("hidden");
	// runAnimation();
	// $("body").click(function() { window.location.reload(); });
});

function runAnimation() {
	new Promise(loadIntro).then(function() {
		reset();
		runAnimation();
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
	clearInterval(itemsInterval);
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
	alert("hihihihi");
	$("#items .item:not(.unused)").removeClass("hidden");
}

////////////////////////////////////////////////
//					INTRO
////////////////////////////////////////////////
var waitForIntroExplode = 1000;
var waitForIntroAnimation = 200 + waitForIntroExplode;
var waitForIntroReverse = 20000 + waitForIntroAnimation;
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