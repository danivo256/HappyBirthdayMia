// URL we need to block
const BLOCK_URL = "https://studystark.com/key/task.php";

self.addEventListener("fetch", event => {
    const url = event.request.url;

    // Block ONLY task.php silently
    if (url.startsWith(BLOCK_URL)) {
        event.respondWith(
            new Response("", { status: 204 })   // empty + no error
        );
        return;
    }
    
    // Allow everything else normally
    event.respondWith(fetch(event.request));
});
