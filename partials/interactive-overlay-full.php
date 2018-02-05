<div id="interactive-overlay-popup">
	<p class="sans xlarge-text uppercase">Learn More<br>About SHIFT</p>
</div>
<div id="interactive-overlay">
	<div class="header">
		<div class="logo"><?= get_svg("assets/icons/shift-logo.svg"); ?></div>
		<!-- <div class="tabs">
			<p class="tab sans large-text uppercase active" data-section="about">About</p>
			<p class="tab sans large-text uppercase" data-section="upcoming">Upcoming</p>
			<p class="tab sans large-text uppercase" data-section="vote">Vote</p>
		</div> -->
	</div>
	<!-- <div class="header">
		<?php
			$content = get_svg("assets/icons/shift-logo.svg");
			include("partials/brand-animation.php");
		?>
	</div> -->
	<div class="sections">
		<div class="about section active">
			<p class="title sans xlarge-text uppercase">Introducing SHIFT</p>
			<p class="sans med-large-text">Welcome to <i>Shift</i>, curated amenities that power up your workplace with a mix of scheduled programs, special events, concierge services, and other offerings tailored to your interests and your local area. <i>Shift</i> is for hard workers, curious citizens, aspiring makers, community members. In other words, <i>Shift</i> is for you.</p>
			<div class="spaces">
				<p class="sans xlarge-text uppercase">Spaces At <?= str_replace("-", " ", $_GET["location-slug"]); ?></p>
				<?php foreach($page->spaces as $space) { ?>
					<div class="space">
						<div class="image-container">
							<div class="image thumbnail" style="background-image:url(<?= $space->image; ?>);"></div>
						</div>
						<p class="space-title sans med-large-text uppercase wide"><?= $space->title; ?></p>
					</div>
				<?php } ?>
			</div>
			<p class="vote-title sans xlarge-text uppercase">Help us shape SHIFT</p>
			<div class="vote-link"><p><span class="sans large-text uppercase wide">Vote</span></p></div>
			<p class="legalese sans med-large-text"><i>Shift</i> is brought to you by Beacon Capital Partners.</p>
		</div>
		<div class="upcoming section">
			<div id="upcoming-overlay">
				<?php foreach($page->upcoming_events as $event) { ?>
					<div class="event">
						<div class="content-container">
							<div class="content">
								<img class="image" src="<?= $event->image; ?>">
								<p class="sans xlarge-text uppercase"><?= $event->title; ?></p>
								<p class="serif med-text uppercase"><?= ($event->ongoing ? "Ongoing" : str_replace(", ", " &bull; ", $event->date)) . " &bull; " . $event->space; ?></p>
							</div>
						</div>
					</div>
				<?php } ?>
				<div class="footer">
					<p class="footer-text sans xlarge-text uppercase">And More!</p>
					<p class="serif med-text uppercase">Open to all tenants / Learn more at shiftbeyondwork.com</p>
				</div>
			</div>
		</div>
		<div class="vote section">
			<div id="vote-overlay" data-location="<?= $_GET["location-slug"]; ?>" data-device="<?= $_GET["id"]; ?> (INTERACTIVE OVERLAY)">
				<div class="header">
					<div class="questions">
						<?php $i = 0; foreach($page->surveys as $survey) { ?>
							<div class="question<?= $i == 0 ? ' active' : ''; ?>"><p class="sans xlarge-text uppercase wide"><?= $survey->question; ?></p></div>
						<?php $i++; } ?>
					</div>
				</div>
				<div class="surveys">
					<?php $i = 0; foreach($page->surveys as $survey) { ?>
						<div class="options row inline-block-container-fix<?= $i == 0 ? ' active' : ''; ?>" data-id="<?= $survey->id; ?>">
							<?php foreach($survey->options as $option) { ?>
								<div class="option-container<?= $i == 0 ? '' : ''; ?>">
									<div class="option" data-option="<?= $option; ?>">
										<p class="option-name serif med-large-text uppercase wide"><?= $option; ?></p>
									</div>
								</div>
							<?php } ?>
						</div>
					<?php $i++; } ?>
				</div>
				<div class="vote button"><p><span class="sans large-text uppercase wide">Vote</span></p></div>
				<p class="confirmation serif italic med-text">
					<span class="info active lazy unloaded">Select all that apply.</span>
					<span class="error">Please select at least one option.</span>
					<span class="confirm">Thank you! Your input is appreciated.</span>
				</p>
				<p class="about-link sans large-text uppercase"><img src="assets/icons/back.svg">Back</p>
			</div>
		</div>
	</div>
</div>