<script lang="ts">
	import '../app.postcss';
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';


    // Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
    import {page} from "$app/stores";
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

    // Dark Mode Switch
    import { LightSwitch } from '@skeletonlabs/skeleton';

</script>

<AppShell >
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <a href="/">
                    <div>
                        <h1>
                            <i class="fas p-3 fa-2xl fa-satellite-dish" />
                            Launch Control
                        </h1>
                    </div>
                </a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
<!--                <a-->
<!--                        class="btn btn-sm variant-ghost-surface"-->
<!--                        href="https://discord.angelware.net"-->
<!--                        target="_blank"-->
<!--                        rel="noreferrer"-->
<!--                >-->
<!--                    Discord-->
<!--                </a>-->
<!--                <a-->
<!--                        class="btn btn-sm variant-ghost-surface"-->
<!--                        href="https://twitter.com/angeIware"-->
<!--                        target="_blank"-->
<!--                        rel="noreferrer"-->
<!--                >-->
<!--                    Twitter-->
<!--                </a>-->
                <LightSwitch />
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <svelte:fragment slot="sidebarLeft">
        <AppRail>
            <AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
                <i class="fas fa-home p-2 scale-150"></i><br>
                <span>Home</span>
            </AppRailAnchor>
            <AppRailAnchor href="/store" selected={$page.url.pathname === '/store'}>
                <i class="fas fa-store p-2 scale-150"></i><br>
                <span>Console</span>
            </AppRailAnchor>
            <AppRailAnchor href="/settings" selected={$page.url.pathname === '/settings'}>
                <i class="fas fa-info-circle p-2 scale-150"></i><br>
                <span>Settings</span>
            </AppRailAnchor>
        </AppRail>
    </svelte:fragment>
    <slot />
</AppShell>
