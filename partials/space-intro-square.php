<div id="space-intro">
	<?php
		$content = "
			<div class=\"content\">
				<div class=\"logo\">" . get_svg("assets/icons/shift-logo.svg") . "</div>
				<p class=\"sans bold med-text uppercase wider\">" . $_GET["space"] . "</p>
			</div>
		";
		include("partials/brand-animation.php");
	?>
</div>