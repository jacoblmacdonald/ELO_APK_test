<?php if(isset($happening_now)) { ?>
	<div id="happening-now">
		<?php
			$content = "
				<div class=\"content\">
					<img class=\"image\" src=\"{$happening_now->image}\">
					<p class=\"title sans xxl-text uppercase\">{$happening_now->title}</p>
					<p class=\"date serif xlarge-text uppercase\">Happening Now</p>
					<p class=\"sans large-text uppercase\">{$happening_now->space}</p>
				</div>
			";
			$large = true;
			include("partials/brand-animation.php");
		?>
	</div>
<?php } ?>