<?php
	for($i = count($upcoming_events) - 1; $i >= 0; $i--) {
		if(!$upcoming_events[$i]) {
			unset($upcoming_events[$i]);
		}
	}
	if(count($upcoming_events) != 0) { ?>
		<div id="upcoming">
			<div class="header wait">
				<div class="logo"><?= get_svg("assets/icons/shift-logo.svg"); ?></div>
				<p class="title serif large-text uppercase">Upcoming</p>
				<p class="sans med-text uppercase wide">In <?= $_GET["space"]; ?></p>
			</div>
			<div class="events-slider">
				<?php foreach($upcoming_events as $event) { ?>
					<div class="event">
						<div class="slide-content">
							<?php
								$content = "
									<div class=\"content\">
										<img class=\"icon\" src=\"" . $event->image . "\">
										<p class=\"title sans xlarge-text uppercase\">{$event->title}</p>
										<p class=\"serif med-text uppercase\">" . ($event->ongoing ? "Ongoing" : str_replace(", ", " &bull; ", $event->date)) . "</p>
									</div>
								";
								$tight = true;
								include("partials/brand-animation.php");
							?>
						</div>
					</div>
				<?php } ?>
			</div>
		</div>
	<?php }
?>