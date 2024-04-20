<script lang="ts">
    import '../../app.postcss';

    // Floating UI for Popups
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import {fade} from "svelte/transition";
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<slot />
<!-- App Shell -->

