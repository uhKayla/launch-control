<script lang="ts">
    import { serverAddress, securityToken } from '$lib/persistent-store';
    import type { Writable } from 'svelte/store';

    let address: string = '';
    let token: string = '';

    const addressStore: Writable<string> = serverAddress;
    const tokenStore: Writable<string> = securityToken;

    addressStore.subscribe($serverAddress => address = $serverAddress);
    tokenStore.subscribe($securityToken => token = $securityToken);

    async function handleSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        addressStore.set(address);
        tokenStore.set(token);

        try {
            const response = await fetch(address + "/api/v1/server/settings", {
                method: 'GET', // or 'POST' depending on your requirements
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log('API Response:', data); // Logging the data

            // Optionally, handle the data in the UI or perform further actions
        } catch (error) {
            console.error('Error making API request:', error);
            // Optionally, handle errors in the UI
        }
    }
</script>

<div class="p-4">
    <form class="max-w-sm mx-auto" on:submit="{handleSubmit}">
        <div class="mb-5">
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Server Address</label>
            <input type="text" id="address" bind:value="{address}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://localhost:8080" required />
        </div>
        <div class="mb-5">
            <label for="token" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security Token</label>
            <input type="password" id="token" bind:value="{token}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">Submit</button>
    </form>
</div>
