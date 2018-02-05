<div id="today">
	<?php
		$date = (date("Ymd", strtotime($next_event->date)) == date("Ymd") ? "Today<br>" . date("g:iA", strtotime($next_event->date)) : str_replace(", ", "<br>", $next_event->date));
		$content = "
			<div class=\"content\">
				<img class=\"image\" src=\"{$next_event->image}\">
				<p class=\"title sans xxl-text uppercase\">{$next_event->title}</p>
				<p class=\"date serif xlarge-text uppercase\">{$date}</p>
				<p class=\"sans large-text uppercase\">{$next_event->space}</p>
			</div>
		";
		$large = true;
		include("partials/brand-animation.php");
	?>
</div>