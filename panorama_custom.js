var randomLat;
var randomLng;

function createPlayer(panoramas) {
    // Убеждаемся, что найдена хотя бы одна панорама.
    if (panoramas.length > 0) {
        // Создаем плеер с одной из полученных панорам.
        var player = new ymaps.panorama.Player(
            'player1',
            // Панорамы в ответе отсортированы по расстоянию
            // от переданной в panorama.locate точки. Выбираем первую,
            // она будет ближайшей.
            panoramas[0],
            { controls: ['zoomControl'], direction: [256, 16], streets: [], suppressMapOpenBlock: true }
        );
        player.events.add(["panoramachange"], function (e) {
            const panorama = player.getPanorama();
            panorama.setMarkers([]);
            player.setPanorama(panorama);
        });
    } else {
        var toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(function () {
            toast.style.display = 'none';
        }, 3000); // Скрываем toast через 3 секунды (3000 миллисекунд)
    }
}

ymaps.ready(function () {
    // Для начала проверим, поддерживает ли плеер браузер пользователя.
    myMap = new ymaps.Map('map', {
        /**
         * When initializing the map, you must specify
         * its center and the zoom factor.
         */
        center: [55.76, 37.64], // Moscow
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    if (!ymaps.panorama.isSupported()) {
        // Если нет, то просто ничего не будем делать.
        return;
    }

    search()

    // Ищем панораму в переданной точке.
    ymaps.panorama.locate([randomLat, randomLng]).done(
        function (panoramas) {
            createPlayer(panoramas);
        },
        function (error) {
            alert(error.message);
        }
    );
});
function search() {
    randomLat = 59.944140 + (Math.random() - 0.5) * 0.1; // Где 0.1 - широта диапазона
    randomLng = 30.359873 + (Math.random() - 0.5) * 0.1; // Где 0.1 - долгота диапазона
}
