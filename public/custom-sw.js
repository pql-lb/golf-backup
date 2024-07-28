
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/images/android-chrome-192x192.png',
        badge: '/images/android-chrome-192x192.png'
    };
    console.log('push received')
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});



// Runtime caching for API calls
registerRoute(
    /^https:\/\/chat-golf-project\.vercel\.app\/.*$/,
    new NetworkFirst({
      cacheName: 'api-cache',
      networkTimeoutSeconds: 10,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        }),
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );
  
  // Runtime caching for the homepage
  registerRoute(
    /^https:\/\/chat-golf-project\.vercel\.app\/$/,
    new NetworkFirst({
      cacheName: 'homepage-cache',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 1,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        }),
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );
  
  // Runtime caching for static assets
  registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|css|js)$/,
    new CacheFirst({
      cacheName: 'static-assets',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        }),
      ],
    })
  );
  