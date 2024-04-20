<script lang="ts">
    import {onDestroy, onMount} from 'svelte';
    import { browser } from '$app/environment';
    import { serverAddress, securityToken } from '$lib/persistent-store';
    import type { ServerConfig, HeartbeatStatus } from '$lib/types';

    let loading: boolean = true;
    let data: ServerConfig | null = null;
    let heartbeatData: HeartbeatStatus | null = null;
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

    async function fetchHeartbeat(): Promise<void> {
        const address: string = $serverAddress;
        const token: string = $securityToken;

        if (browser) {
            try {
                const response: Response = await fetch(`${address}/api/v1/server/status`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData: HeartbeatStatus = await response.json();
                heartbeatData = jsonData;
            }
            catch (e: unknown) {
                error = e instanceof Error ? e.message : 'An unexpected error occurred';
            }
            finally {
                loading = false;
            }
        }
    }

    let intervalId: ReturnType<typeof setInterval>;

    onMount(() => {
        fetchData();
        fetchHeartbeat();
        intervalId = setInterval(fetchHeartbeat, 1000);  // Set interval to fetch heartbeat every second
    });

    onDestroy(() => {
        clearInterval(intervalId);  // Clear the interval when the component is destroyed
    });
</script>

<div>
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p style="color: red;">Error: {error}</p>
    {:else}
        <div class="grid grid-cols-3 gap-4 p-4">
            {#if data != null && heartbeatData != null}
            <div class="block card card-hover p-4">
                Server is online!
            </div>
            <div class="block card card-hover col-span-2 row-span-3 p-4">
                {#if data.serverName != null}
                    <div class="text-2xl">{data.serverName}</div>
                    {:else}
                    <div class="text-2xl">Not connected</div>
                {/if}
                <hr>
                <div class="flex justify-between">
                    <div>Map Name:</div>
                    {#if data.mapName != null}
                        <div>{data.mapName}</div>
                    {:else}
                        <div>Not Connected</div>
                    {/if}
                </div>
                <hr>
                <div class="flex justify-between">
                    <div>Players Online:</div>
                    {#if heartbeatData.memberCount != null && data.memberLimit != null}
                        <div>{heartbeatData.memberCount}/{data.memberLimit}</div>
                    {:else}
                        <div>Not Connected</div>
                    {/if}
                </div>
                <hr>
                <div class="flex justify-between">
                    <div>Description:</div>
                    {#if data.serverDescription != null}
                        <div>{data.serverDescription}</div>
                    {:else}
                        <div>Not Connected</div>
                    {/if}
                </div>
                <hr>
                <div class="flex justify-between">
                    <div>Uptime:</div>
                    {#if heartbeatData.uptime != null}
                        <div>{heartbeatData.uptime}</div>
                    {:else}
                        <div>Not Connected</div>
                    {/if}
                </div>
                <hr>
            </div>
            <div class="card card-hover p-4 row-span-2 min-h-72 flex justify-center items-center">
                <i class="fas fa-group-arrows-rotate fa-spin fa-5x"/>
            </div>
            {/if}
        </div>
    {/if}
</div>
