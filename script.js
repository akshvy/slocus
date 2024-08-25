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
    const todoList = document.getElementById('todoList');
    const addTaskButton = document.getElementById('addTask');
    const taskInput = document.getElementById('taskInput');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to render tasks
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'todo-item';
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="removeTask(${index})">❌</button>
            `;
            todoList.appendChild(taskItem);
        });
    }
  
    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }
  
    // Function to toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
  
    // Function to remove a task
    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
  
    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Event listener for adding a task
    addTaskButton.addEventListener('click', addTask);
  
    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
  
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
        renderTasks(); // Render tasks on load
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
  
    loadSettings();
  });
  