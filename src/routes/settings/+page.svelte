<script lang="ts">
    import { serverAddress, securityToken, serverConfig } from '$lib/persistent-store';
    import type { ServerConfig } from '$lib/types';
    import type { Writable } from 'svelte/store';

    let address: string = '';
    let token: string = '';
    let errorMessage: string = '';  // Error message state
    let loading: boolean = false;
    let success: boolean = false;

    const addressStore: Writable<string> = serverAddress;
    const tokenStore: Writable<string> = securityToken;

    addressStore.subscribe($serverAddress => address = $serverAddress);
    tokenStore.subscribe($securityToken => token = $securityToken);

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        addressStore.set(address);
        tokenStore.set(token);
        errorMessage = '';  // reset error message on new submission
        loading = true; // begin loading

        try {
            const response = await fetch(address + "/api/v1/server/settings", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch server settings. Please check your server address and token. (' + response.status + ")");
            }

            const data: ServerConfig = await response.json();
            serverConfig.set(data);
            success = true;
        }
        catch (error: any) {
            console.error('Error making API request:', error);
            errorMessage = error.message || 'An unexpected error occurred.';
        }
        finally {
            loading = false;
        }
    }
</script>

<div>
    {#if errorMessage}
        <div class="p4">
            <aside class="alert transition:fade|local={{ duration: 200 }} bg-primary-500">
                <!-- Icon -->
                <div>
                    <i class="fas fa-warning" />
                </div>
                <!-- Message -->
                <div class="alert-message">
                    <h3 class="h3">Error!</h3>
                    <p>{errorMessage}</p>
                </div>
            </aside>
        </div>
    {/if}
</div>
<div class="p-4">
    <form class="max-w-sm mx-auto" on:submit="{handleSubmit}">
        <div class="mb-5">
            <label class="label">
                <span>Server Address</span>
                <input class="input" type="text" bind:value={address} placeholder="http://localhost" />
            </label>
        </div>
        <div class="mb-5">
            <label class="label">
                <span>Security Token</span>
                <input class="input" type="password" bind:value={token} placeholder="Enter your token" />
            </label>
        </div>
        <span>
            <button type="submit" class="btn variant-filled-primary" disabled={loading}>
                {#if loading}
                    <i class="fas fa-spinner fa-spin"></i> Loading...
                {:else}
                    Save
                {/if}
            </button>
            {#if success}
                <kbd class="kbd text-success-500">Connection Success!</kbd>
            {/if}
        </span>
    </form>
</div>
