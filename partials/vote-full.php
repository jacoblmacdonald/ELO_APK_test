<div id="vote" data-location="<?= $_GET["location-slug"]; ?>" data-device="<?= $_GET["id"]; ?>">
	<div class="header wait">
		<div class="logo"><?= get_svg("assets/icons/shift-logo.svg"); ?></div>
		<div class="questions">
			<?php $i = 0; foreach($surveys as $survey) { ?>
				<div class="question<?= $i == 0 ? ' active' : ''; ?>"><p class="sans xlarge-text uppercase wide"><?= $survey->question; ?></p></div>
			<?php $i++; } ?>
		</div>
	</div>
	<div class="surveys">
		<?php $i = 0; foreach($surveys as $survey) { ?>
			<div class="options row inline-block-container-fix<?= $i == 0 ? ' active' : ''; ?>" data-id="<?= $survey->id; ?>">
				<?php foreach($survey->options as $option) { ?>
					<div class="option-container<?= $i == 0 ? ' wait' : ''; ?>">
						<div class="option" data-option="<?= $option; ?>">
							<p class="option-name serif large-text uppercase wide"><?= $option; ?></p>
						</div>
					</div>
				<?php } ?>
			</div>
		<?php $i++; } ?>
	</div>
	<div class="vote button wait"><p><span class="sans large-text uppercase wide">Vote</span></p></div>
	<p class="confirmation serif italic med-text wait">
		<span class="info active lazy unloaded">Select all that apply.</span>
		<span class="error">Please select at least one option.</span>
		<span class="confirm">Thank you! Your input is appreciated.</span>
	</p>
</div>