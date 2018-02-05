<div id="upcoming">
	<div class="header wait">
		<div class="logo"><?= get_svg("assets/icons/shift-logo.svg"); ?></div>
		<p class="serif med-text uppercase">Upcoming</p>
	</div>
	<?php foreach($upcoming_events as $event) { ?>
		<div class="event wait">
			<div class="content-container">
				<div class="content">
					<img class="image" src="<?= $event->image; ?>">
					<p class="sans xlarge-text uppercase"><?= $event->title; ?></p>
					<p class="serif med-text uppercase"><?= ($event->ongoing ? "Ongoing" : str_replace(", ", " &bull; ", $event->date)) . " &bull; " . $event->space; ?></p>
				</div>
			</div>
		</div>
	<?php } ?>
	<div class="footer wait">
		<p class="footer-text sans xlarge-text uppercase">And More!</p>
		<p class="serif med-text uppercase">Open to all tenants / Learn more at shiftbeyondwork.com</p>
	</div>
</div>