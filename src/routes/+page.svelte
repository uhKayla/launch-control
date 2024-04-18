<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	function handleHeroButtonClick() {
		console.log("Hero button clicked!");
	}
</script>

<div class="py-20">
	<Hero
			title="Welcome Engineer!"
			subtitle="The universe is waiting for you..."
			buttonText="Server Status"
			onButtonClick={handleHeroButtonClick}
	/>
</div>