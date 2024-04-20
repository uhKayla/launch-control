<script lang="ts">
    import { onMount } from 'svelte';
    import { invoke, event } from "@tauri-apps/api";
    import type {ChatMessage, Messages} from "$lib/types";

    let elemChat: HTMLElement;

    let messages: Messages[] = [];
    let currentMessage = '';
    let messageFeed: ChatMessage[] = [];

    async function connectWebSocketUsingRust() {
        try {
            await invoke('connect_websocket');
            console.log("WebSocket connection initiated from Rust");
        } catch (error) {
            console.error('Error initiating WebSocket connection:', error);
        }
    }

    function setupEventListeners() {
        event.listen('message_from_server', (event) => {
            console.log('Received message:', event.payload);
            if (event.payload != null)
                try {
                    const messageData = JSON.parse(event.payload as string);
                    // Use array spreading to ensure reactivity
                    messages = [...messages, {
                        authorName: messageData.authorName,
                        message: messageData.message,
                        channel: messageData.channel,
                        author: messageData.author,
                    }];
                    addConsoleMessage(messageData);
                    console.log('Updated messages array:', messages);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
        });
    }

    function scrollChatBottom(behavior?: ScrollBehavior): void {
        elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
    }

    function addConsoleMessage(msg:Messages): void {
        const newMessage = {
            id: messageFeed.length,
            host: false,
            name: msg.authorName,
            timestamp: new Date(),
            message: msg.message,
            color: 'variant-soft-primary'
        };
        messageFeed = [...messageFeed, newMessage];
        setTimeout(() => { scrollChatBottom('smooth'); }, 0);
    }

    function addMessage(): void {
        const newMessage = {
            id: messageFeed.length,
            host: true,
            name: 'Jane',
            timestamp: new Date(),
            message: currentMessage,
            color: 'variant-soft-primary'
        };
        // Append the new message to the message feed
        messageFeed = [...messageFeed, newMessage];
        // Clear the textarea message
        currentMessage = '';
        // Smoothly scroll to the bottom of the feed
        setTimeout(() => { scrollChatBottom('smooth'); }, 0);
    }


    onMount(() => {
        connectWebSocketUsingRust();
        setupEventListeners();
    });
</script>


<div class="flex flex-col min-h-full p-4 gap-4">
    <div class="grow card p-4 min-h-96">
        <div bind:this={elemChat} class="overflow-y-auto">
            <section class="w-full max-h-[400px] p-4 overflow-y-auto space-y-4">
                {#each messageFeed as bubble, i}
                    {#if bubble.host === true}
                        <div class="grid grid-cols-[1fr_auto] gap-2">
                            <div class="card card-hover p-4 rounded-tr-none space-y-2 {bubble.color}">
                                <header class="flex justify-between items-center">
                                    <p class="font-bold">{bubble.name}</p>
                                    <small class="opacity-50">{bubble.timestamp.getHours()}:{bubble.timestamp.getMinutes()}</small>
                                </header>
                                <p>{bubble.message}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="grid grid-cols-[auto_1fr] gap-2">
                            <div class="card card-hover p-4 variant-soft rounded-tl-none space-y-2">
                                <header class="flex justify-between items-center">
                                    <p class="font-bold">{bubble.name}</p>
                                    <small class="opacity-50">{bubble.timestamp.getHours()}:{bubble.timestamp.getMinutes()}</small>
                                </header>
                                <p>{bubble.message}</p>
                            </div>
                        </div>
                    {/if}
                {/each}
            </section>
        </div>
    </div>
    <div class="card p-4">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
            <button class="input-group-shim">+</button>
            <textarea
                    bind:value={currentMessage}
                    class="bg-transparent border-0 ring-0"
                    name="prompt"
                    id="prompt"
                    placeholder="Write a message..."
                    rows="1"
            />
            <button class="variant-filled-primary" on:click={addMessage}>Send</button>
        </div>
    </div>
</div>
