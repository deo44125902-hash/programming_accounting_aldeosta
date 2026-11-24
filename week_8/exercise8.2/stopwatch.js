document.addEventListener('DOMContentLoaded', function() {
    // Stopwatch Logic
    const displayTime = document.getElementById('displayTime');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    let timerInterval;
    let totalSeconds = 0;
    let isRunning = false;

    function formatTime(seconds) {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    function startStopwatch() {
        if (!isRunning) {
            isRunning = true;
            timerInterval = setInterval(() => {
                totalSeconds++;
                displayTime.textContent = formatTime(totalSeconds);
            }, 1000);
        }
    }

    function stopStopwatch() {
        isRunning = false;
        clearInterval(timerInterval);
    }

    function resetStopwatch() {
        stopStopwatch();
        totalSeconds = 0;
        displayTime.textContent = formatTime(totalSeconds);
    }

    startBtn.addEventListener('click', startStopwatch);
    stopBtn.addEventListener('click', stopStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);

    // Timer Logic
    const startTimerBtn = document.getElementById('startTimerBtn');
    const timerMessage = document.getElementById('timerMessage');

    function startCountdownTimer() {
        let countdownSeconds = 5;
        timerMessage.textContent = `Timer started: ${countdownSeconds} seconds left...`;
        timerMessage.style.color = '#333';

        const countdownInterval = setInterval(() => {
            countdownSeconds--;
            if (countdownSeconds > 0) {
                timerMessage.textContent = `Timer: ${countdownSeconds} seconds left...`;
            } else {
                clearInterval(countdownInterval);
                timerMessage.textContent = "Time's Up! Report ready.";
                timerMessage.style.color = 'green';
            }
        }, 1000);
    }

    startTimerBtn.addEventListener('click', startCountdownTimer);
});