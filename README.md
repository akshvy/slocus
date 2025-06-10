# Pomodoro Timer with Spotify Integration

A modern, responsive Pomodoro Timer web app with customizable durations and integrated Spotify playlist support.  
Features a settings modal, background blur, and a floating Spotify button with animated feedback.

---

## Features

- **Pomodoro Timer:** Start, pause, and reset a customizable Pomodoro timer.
- **Custom Durations:** Set your preferred Pomodoro and break durations in the settings modal.
- **Spotify Integration:**  
  - Floating Spotify button (FAB) always visible.
  - Click the button to reveal a Spotify playlist player with animation.
  - Paste any Spotify playlist URL in settings to change the playlist.
  - The FAB vibrates (dances) when the player is open.
- **Responsive Design:** Works and looks great on desktop and mobile.
- **Aesthetic UI:** Clean, modern look with background blur and smooth transitions.
- **Persistent Settings:** Your timer settings are saved in your browser.

---

## Screenshots

![Main Timer UI](./assets/screenshot-main.png)
![Settings Modal](./assets/screenshot-settings.png)
![Spotify FAB and Player](./assets/screenshot-spotify.png)

---

## Getting Started

1. **Clone or Download this Repository**
    ```sh
    git clone https://github.com/yourusername/pomodoro-spotify.git
    cd pomodoro-spotify
    ```

2. **Add Your Assets**
    - Place your background image as `hero.png` in the project root or `assets/` folder.
    - (Optional) Update screenshots in the `assets/` folder.

3. **Open `index.html` in your browser**

---

## Usage

- **Start Timer:** Click on the timer to start.
- **Reset Timer:** Click the "Reset" button.
- **Open Settings:** Click the ⚙️ icon (top right) to adjust durations and playlist.
- **Change Playlist:** Paste a Spotify playlist URL in the settings modal and click "Update Playlist".
- **Spotify Player:**  
  - Click the floating Spotify icon (bottom left) to open the player.
  - Click outside the player or on the player to close it.
  - The icon vibrates while the player is open.

---

## Customization

- **Background:** Replace `hero.png` with your own image for a new look.
- **Colors & Styles:** Edit `style.css` for further customization.
- **Sounds:** Add your own alarm sound in `script.js` if desired.

---

## Limitations

- **Spotify Embed:** Only plays 30 seconds unless the user is logged in with a Spotify Premium account in their browser.
- **No Play/Pause Detection:** The FAB vibrates when the player is open, not based on actual playback state (due to Spotify embed limitations).

---

## Credits

- [Spotify](https://spotify.com) for the embed player and icon.
- [Simple Icons](https://simpleicons.org/) for the Spotify SVG.
- Inspired by the Pomodoro Technique.

---

## License

MIT License

---
