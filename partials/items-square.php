<?php
	$item_locations = array(
		array(
			"top" => 8,
			"left" => 32
		),
		array(
			"top" => 5,
			"left" => 79
		),
		array(
			"top" => 7,
			"left" => 2
		),
		array(
			"top" => 15,
			"left" => 54
		),
		array(
			"top" => 16,
			"left" => 15
		),
		array(
			"top" => 16,
			"left" => 84
		),
		array(
			"top" => 27,
			"left" => 32
		),
		array(
			"top" => 28,
			"left" => 75
		),
		array(
			"top" => 36,
			"left" => 57
		),
		array(
			"top" => 34,
			"left" => 15
		),
		array(
			"top" => 47,
			"left" => 84
		),
		array(
			"top" => 45,
			"left" => 22
		),
		array(
			"top" => 51,
			"left" => 50
		)
	);
	$items = array(
		array(
			"image" => "avocado",
			"width" => 12
		),
		array(
			"image" => "bike",
			"width" => 12
		),
		array(
			"image" => "books",
			"width" => 12
		),
		array(
			"image" => "brushes",
			"width" => 12
		),
		array(
			"image" => "donations",
			"width" => 12
		),
		array(
			"image" => "chess",
			"width" => 6
		),
		array(
			"image" => "coffee",
			"width" => 12
		),
		array(
			"image" => "cards",
			"width" => 12
		),
		array(
			"image" => "drink",
			"width" => 12
		),
		array(
			"image" => "dumbells",
			"width" => 12
		),
		array(
			"image" => "exerciseball",
			"width" => 12
		),
		array(
			"image" => "exercisebike",
			"width" => 12
		),
		array(
			"image" => "flowers",
			"width" => 12
		),
		array(
			"image" => "flowers2",
			"width" => 12
		),
		array(
			"image" => "guitar",
			"width" => 12
		),
		array(
			"image" => "headphones",
			"width" => 12
		),
		array(
			"image" => "kettlebell",
			"width" => 12
		),
		array(
			"image" => "keyboard",
			"width" => 12
		),
		array(
			"image" => "lettuce",
			"width" => 12
		),
		array(
			"image" => "liberty",
			"width" => 12
		),
		array(
			"image" => "lightbulb",
			"width" => 12
		),
		array(
			"image" => "microphone",
			"width" => 12
		),
		array(
			"image" => "motherboard",
			"width" => 12
		),
		array(
			"image" => "pan",
			"width" => 12
		),
		array(
			"image" => "pencils",
			"width" => 12
		),
		array(
			"image" => "pingpong",
			"width" => 12
		),
		array(
			"image" => "ribbon",
			"width" => 12
		),
		array(
			"image" => "saltpepper",
			"width" => 12
		),
		array(
			"image" => "shoes",
			"width" => 12
		),
		array(
			"image" => "spoon",
			"width" => 12
		),
		array(
			"image" => "succulent",
			"width" => 12
		),
		array(
			"image" => "tomato",
			"width" => 12
		),
		array(
			"image" => "tools",
			"width" => 12
		),
		array(
			"image" => "veggies",
			"width" => 12
		),
		array(
			"image" => "videogame",
			"width" => 12
		),
		array(
			"image" => "vr",
			"width" => 12
		),
		array(
			"image" => "wine",
			"width" => 6
		),
		array(
			"image" => "yinyang",
			"width" => 12
		),
		array(
			"image" => "yoga",
			"width" => 12
		)
	);
?>

<div id="items">
	<?php
		foreach($item_locations as &$item) {
			$item["left"] .= ($landscape ? "vh" : "vw");
			$item["top"] .= ($landscape ? "vw" : "vh");
		}
		foreach($items as &$item) {
			$item["width"] .= ($landscape ? "vh" : "vw");
		}
		for($i = 0; $i < count($item_locations); $i++) {
			$top = $item_locations[$i]["top"]; 
			$left = $item_locations[$i]["left"]; ?>
			<img class="item hidden" src="/assets/items/<?= $items[$i]["image"]; ?>.png" style="
				/*top:<?= $top; ?>vh;*/
				/*left:<?= $left; ?>vw;*/
				transform:translate(-50%, -50%) translate(<?= $left; ?>, <?= $top; ?>);
				width:<?= $items[$i]["width"]; ?>;
			" data-top="<?= $top; ?>" data-left="<?= $left; ?>">
		<?php } for($i = count($item_locations); $i < count($items); $i++) { ?>
			<img class="item unused hidden" src="/assets/items/<?= $items[$i]["image"]; ?>.png" style="width:<?= $items[$i]["width"]; ?>;">
		<?php }
	?>
</div>