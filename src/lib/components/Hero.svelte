<script>
    import '../styles/stars.css'
    export let title = "Default Title";
    export let subtitle = "Default subtitle";
    export let buttonText = "Click me";
    export let onButtonClick = () => {};
</script>


<div class="stars-container">
    <div class="sky">
        <div class="stars"></div>
        <div class="stars1"></div>
        <div class="stars2"></div>
        <div class="shooting-stars"></div>
    </div>
</div>

<div class="text-primary text-right p-12">
    <h1 class="text-4xl font-bold mb-2">{title}</h1>
    <p class="text-xl mb-4">{subtitle}</p>
    <button on:click={onButtonClick} class="btn variant-ghost-surface">
        <span>{buttonText}</span>
        <span><i class="fa-solid fa-square-arrow-up-right" /></span>
    </button>
</div>
