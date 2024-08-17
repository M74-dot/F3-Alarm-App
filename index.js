document.addEventListener('DOMContentLoaded', () => {
    const timerForm = document.querySelector('#timerForm');
    const activeTimers = document.querySelector('#activeTimers');
    const timers = [];  // Array to store active timers

    timerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const hours = parseInt(document.querySelector('#hours').value) || 0;
        const minutes = parseInt(document.querySelector('#minutes').value) || 0;
        const seconds = parseInt(document.querySelector('#seconds').value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please set a time for the timer.');
            return;
        }

        const totalTime = hours * 3600 + minutes * 60 + seconds;
        createTimer(totalTime);
    });

    function createTimer(duration) {
        const timerId = Date.now();
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        timerElement.setAttribute('data-id', timerId);

        timerElement.innerHTML = `
            <span class="time">${formatTime(duration)}</span>
            <button class="stop-timer">Stop Timer</button>
        `;

        activeTimers.appendChild(timerElement);

        const timer = {
            id: timerId,
            duration: duration,
            element: timerElement,
            interval: setInterval(() => {
                duration--;
                updateTimer(timer, duration);
                if (duration <= 0) {
                    clearInterval(timer.interval);
                    endTimer(timer);
                }
            }, 1000)
        };

        timers.push(timer);

        const stopButton = timerElement.querySelector('.stop-timer');
        stopButton.addEventListener('click', () => {
            stopTimer(timer);
        });
    }

    function updateTimer(timer, duration) {
        const timeElement = timer.element.querySelector('.time');
        timeElement.textContent = formatTime(duration);
    }

    function stopTimer(timer) {
        clearInterval(timer.interval);
        timer.element.remove();
        const index = timers.indexOf(timer);
        if (index > -1) {
            timers.splice(index, 1);
        }
    }

    function endTimer(timer) {
        const timeElement = timer.element.querySelector('.time');
        timeElement.textContent = "Time is up!";
        const audio = new Audio('path_to_your_audio_file.mp3');
        audio.play();
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
});
