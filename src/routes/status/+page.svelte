<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { serverAddress, securityToken } from '$lib/persistent-store';
    import type { ServerConfig } from '$lib/types';

    import '$lib/styles/rocket.css'

    let loading: boolean = true;
    let data: ServerConfig | null = null;
    let error: string | null = null;

    async function fetchData(): Promise<void> {
        const address: string = $serverAddress;
        const token: string = $securityToken;

        if (browser) {
            try {
                const response: Response = await fetch(`${address}/api/v1/server/settings`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData: ServerConfig = await response.json();
                data = jsonData;
            }
            catch (e: unknown) {
                error = e instanceof Error ? e.message : 'An unexpected error occurred';
            }
            finally {
                loading = false;
            }
        }
    }

    onMount(() => {
        fetchData();
    });
</script>

<div>
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p style="color: red;">Error: {error}</p>
    {:else}
        <div class="grid grid-cols-3 gap-4 p-4">
            <div class="block card card-hover p-4">
                Server is online...
            </div>
            <div class="block card card-hover col-span-2 row-span-3 p-4">
                <div class="text-2xl">{data.serverName}</div>
                <hr>
                <div class="flex justify-between">
                    <div>Map Name:</div>
                    <div>{data.mapName}</div>
                </div>
                <hr>
                <div class="flex justify-between">
                    <div>Players Online:</div>
                    <div>/{data.memberLimit}</div>
                </div>
                <hr>
                <div class="flex justify-between">
                    <div>Description:</div>
                    <div>{data.serverDescription}</div>
                </div>
                <hr>
            </div>
            <div class="block card card-hover p-4 row-span-2 min-h-72 content-evenly">
                <i class="fas fa-group-arrows-rotate fa-spin fa-5x"/>
            </div>
        </div>
    {/if}
</div>
