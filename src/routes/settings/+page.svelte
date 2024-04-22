<script lang="ts">
    import { invoke } from '@tauri-apps/api';
    import type { ServerConfig } from '$lib/types';
    import { serverConfig } from '$lib/persistent-store';

    let address: string = '';
    let token: string = '';
    let errorMessage: string = '';
    let loading: boolean = false;
    let success: boolean = false;

    async function loadSettings() {
        try {
            const result = await invoke('get_server_info');
            if (result) {
                address = result[0];
                token = result[1];
            }
        } catch (error) {
            errorMessage = 'Failed to load settings: ' + error.message;
        }
    }

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        loading = true;

        try {
            await invoke('save_server_info', { serverUrl: address, token: token });
            const response = await fetch(address + "/api/v1/server/settings", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch server settings. Please check your server address and token. (${response.status})`);
            }

            const data: ServerConfig = await response.json();
            serverConfig.set(data);
            success = true;
        } catch (error: any) {
            console.error('Error making API request:', error);
            errorMessage = error.message || 'An unexpected error occurred.';
        } finally {
            loading = false;
        }
    }

    loadSettings();
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
