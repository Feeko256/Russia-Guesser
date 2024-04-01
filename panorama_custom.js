var randomLat;
var randomLng;
var myMap;

function createPlayer(panoramas) {
    // Убеждаемся, что найдена хотя бы одна панорама.
    if (panoramas.length > 0) {
        // Удаляем существующий плеер, если он есть
        var existingPlayer = document.getElementById('player1');
        if (existingPlayer) {
            existingPlayer.innerHTML = ''; // Очищаем содержимое элемента с ID 'player1'
        }

        // Создаем плеер с одной из полученных панорам.
        var player = new ymaps.panorama.Player(
            'player1',
            panoramas[0],
            { controls: ['zoomControl'], direction: [256, 16], streets: [], suppressMapOpenBlock: true }
        );
        player.events.add(["panoramachange"], function (e) {
            const panorama = player.getPanorama();
            panorama.setMarkers([]);
            player.setPanorama(panorama);
        });
    } else {
        loadNewPanorama()
        var toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(function () {
            toast.style.display = 'none';
        }, 1000); // Скрываем toast через 3 секунды (3000 миллисекунд)
    }
}

ymaps.ready(function () {
    // Для начала проверим, поддерживает ли плеер браузер пользователя.
    myMap = new ymaps.Map('map', {
        
        center: [59.944140, 30.359873 ], 
        zoom: 10, 
    }, {
        searchControlProvider: 'yandex#search'
    });

    if (!ymaps.panorama.isSupported()) {
        // Если нет, то просто ничего не будем делать.
        return;
    }
    loadNewPanorama()
});
function loadNewPanorama() {
    search()
    ymaps.panorama.locate([randomLat, randomLng]).done(
        function (panoramas) {
            createPlayer(panoramas);
        },
        function (error) {
            alert(error.message);
        }
    );
}

function search() {
   randomLat = 59.944140 + (Math.random() - 0.5) * 0.2; // Где 0.2 - широта диапазона
   randomLng = 30.359873 + (Math.random() - 0.5) * 0.15; // Где 0.15 - долгота диапазона
}
function addMarker(map) {
    var coords = [randomLat, randomLng];
    var marker = new ymaps.Placemark(coords, {
        balloonContent: 'Метка'
    });
    map.geoObjects.add(marker);
}
