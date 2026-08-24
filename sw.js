/**
 * sw.js
 * Minimal service worker. Registered so the standard PWA/push
 * architecture is in place, but this alone does NOT enable background
 * (closed-tab) push notifications — that requires a push server (Web
 * Push + VAPID keys) this project has no backend to run. Today, rain and
 * severe-weather alerts only fire while the tab is open, via
 * notifications.js's in-tab interval check.
 *
 * No 'push' event handler is registered here on purpose: there is no push
 * server to send one, so adding a handler would be dead code implying a
 * capability that doesn't exist yet.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
