if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
			// Registration was successful
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed :(
			console.log('ServiceWorker registration failed: ', err);
		}).catch(function(err) {
			console.log(err)
		});
	});
} else {
	console.log('service worker is not supported');
}

// this.addEventListener('install', function (event) {
// 	console.log('Service worker установлен');
// 	event.waitUntil(
// 		// находим Cache-объект с нашим именем
// 		caches.open('MY_CACHE')
// 			.then(function (cache) {
// 				// загружаем в наш cache необходимые файлы
// 				return cache.addAll(['/index.html']);
// 			})
// 	)
// });
