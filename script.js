document.addEventListener('DOMContentLoaded', () => {
    let timer, isRunning = false, timeLeft;
    let pomodoroDuration = 25 * 60, breakDuration = 5 * 60;

    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const resetButton = document.getElementById('reset');
    const pomodoroInput = document.getElementById('pomodoroDuration');
    const breakInput = document.getElementById('breakDuration');
    const pomodoroValue = document.getElementById('pomodoroValue');
    const breakValue = document.getElementById('breakValue');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsModal = document.getElementById('settingsModal');
    const closeModal = document.getElementById('closeModal');

    // Load settings and render tasks on page load
    function loadSettings() {
        const savedPomodoro = localStorage.getItem('pomodoroDuration');
        const savedBreak = localStorage.getItem('breakDuration');

        if (savedPomodoro) {
            pomodoroDuration = parseInt(savedPomodoro) * 60;
            pomodoroInput.value = savedPomodoro;
            pomodoroValue.textContent = `${savedPomodoro} minutes`;
        }

        if (savedBreak) {
            breakDuration = parseInt(savedBreak) * 60;
            breakInput.value = savedBreak;
            breakValue.textContent = `${savedBreak} minutes`;
        }

        timeLeft = pomodoroDuration;
        updateDisplay();
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    function updateTimer() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert('Time is up!');
            playSound();
            return;
        }
        timeLeft--;
        updateDisplay();
    }

    function playSound() {
        const audio = new Audio('alarm.mp3'); // Replace with your audio file path
        audio.play();
    }

    pomodoroInput.addEventListener('input', () => {
        pomodoroDuration = parseInt(pomodoroInput.value) * 60;
        pomodoroValue.textContent = `${pomodoroInput.value} minutes`;
        saveSettings();
        if (!isRunning) {
            timeLeft = pomodoroDuration;
            updateDisplay();
        }
    });

    breakInput.addEventListener('input', () => {
        breakDuration = parseInt(breakInput.value) * 60;
        breakValue.textContent = `${breakInput.value} minutes`;
        saveSettings();
    });

    document.getElementById('timer').addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(updateTimer, 1000);
        }
    });

    resetButton.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        timeLeft = pomodoroDuration;
        updateDisplay();
    });

    // Open settings modal
    settingsIcon.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    // Close settings modal
    closeModal.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    loadSettings();
});
