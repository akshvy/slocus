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
    const playlistUrlInput = document.getElementById('playlistUrl');
    const updatePlaylistButton = document.getElementById('updatePlaylist');
    const spotifyIframe = document.querySelector('.spotify-widget iframe');
    const spotifyFab = document.getElementById('spotifyFab');
    const spotifyWidget = document.getElementById('spotifyWidget');
    const spotifyFrame = document.getElementById('spotifyFrame');

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

    function saveSettings() {
        localStorage.setItem('pomodoroDuration', pomodoroInput.value);
        localStorage.setItem('breakDuration', breakInput.value);
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
        // Optional: Replace with your own sound file if needed
        // const audio = new Audio('alarm.mp3');
        // audio.play();
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

    // Modal open/close logic
    settingsIcon.onclick = () => settingsModal.style.display = 'flex';
    closeModal.onclick = () => settingsModal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === settingsModal) settingsModal.style.display = 'none';
    };

    // Playlist update logic
    updatePlaylistButton.onclick = () => {
        const url = playlistUrlInput.value.trim();
        // Extract playlist ID from Spotify URL
        const match = url.match(/playlist\/([a-zA-Z0-9]+)(\?|$)/);
        if (match) {
            const playlistId = match[1];
            spotifyIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
            playlistUrlInput.style.borderColor = '#ccc';
            playlistUrlInput.placeholder = 'Spotify Playlist URL';
            settingsModal.style.display = 'none';
        } else {
            playlistUrlInput.style.borderColor = 'red';
            playlistUrlInput.value = '';
            playlistUrlInput.placeholder = 'Invalid Spotify URL';
        }
    };

    // Show Spotify widget, hide FAB, start vibration
    spotifyFab.addEventListener('click', (e) => {
        spotifyFab.style.display = 'none';
        spotifyWidget.style.display = 'block';
        spotifyWidget.classList.remove('hide-anim');
        spotifyWidget.classList.add('show-anim');
        spotifyFab.classList.add('vibrating'); // Start vibration
        e.stopPropagation();
    });

    // Hide Spotify widget, show FAB, stop vibration
    function hideSpotifyWidget() {
        spotifyWidget.classList.remove('show-anim');
        spotifyWidget.classList.add('hide-anim');
        setTimeout(() => {
            spotifyWidget.style.display = 'none';
            spotifyFab.style.display = 'flex';
            spotifyFab.classList.remove('vibrating'); // Stop vibration
        }, 400); // Match animation duration
    }

    spotifyWidget.addEventListener('click', hideSpotifyWidget);

    // Hide on click outside the widget
    document.addEventListener('click', function(event) {
        if (
            spotifyWidget.style.display === 'block' &&
            !spotifyWidget.contains(event.target) &&
            event.target !== spotifyFab
        ) {
            hideSpotifyWidget();
        }
    });

    // Vibrate FAB when music is playing
    window.addEventListener('message', function(event) {
        // Spotify iframe sends messages, but not a public API for play state.
        // We'll use a workaround: vibrate when widget is open for demo purposes.
        // For real detection, you'd need Spotify Web Playback SDK.
    });

    // DEMO: Vibrate FAB when widget is open (simulate playing)
    // Remove vibration when widget is closed
    function setFabVibrating(vibrate) {
        if (vibrate) {
            spotifyFab.classList.add('vibrating');
        } else {
            spotifyFab.classList.remove('vibrating');
        }
    }

    // Simulate vibration when widget is open
    spotifyFab.addEventListener('click', () => setFabVibrating(true));
    spotifyWidget.addEventListener('transitionend', () => {
        if (spotifyWidget.style.display === 'none') setFabVibrating(false);
    });
    // Also remove vibration when widget is hidden
    spotifyWidget.addEventListener('click', () => setFabVibrating(false));

    loadSettings();
});
