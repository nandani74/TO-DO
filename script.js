document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const dueTimeInput = document.getElementById("dueTimeInput");
    const taskValue = taskInput.value.trim();
    const dueTimeValue = dueTimeInput.value;

    if (taskValue && dueTimeValue) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = taskValue;

        // Get current time and format it
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const timestamp = `${hours}:${minutes}`;

        // Create and append the timestamp
        const timeSpan = document.createElement("span");
        timeSpan.classList.add("timestamp");
        timeSpan.textContent = `Added at ${timestamp}`;

        // Create and append the due time
        const dueTimeSpan = document.createElement("span");
        dueTimeSpan.classList.add("due-time");
        dueTimeSpan.textContent = `Due at ${dueTimeValue}`;

        // Mark task as complete when clicked
        span.addEventListener("click", function() {
            li.classList.toggle("completed");
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(timeSpan); // Append the timestamp
        li.appendChild(dueTimeSpan); // Append the due time
        li.appendChild(deleteBtn);

        // Check if the task is past due and highlight it
        const dueTime = new Date();
        const [dueHours, dueMinutes] = dueTimeValue.split(":").map(Number);
        dueTime.setHours(dueHours, dueMinutes, 0, 0);

        if (currentTime > dueTime) {
            li.classList.add("due-past");
        }

        document.getElementById("taskList").appendChild(li);

        // Play the alarm when the due time is reached
        checkTaskDueTime(dueTime, li);

        taskInput.value = "";
        dueTimeInput.value = "";
    }
});

document.getElementById("clearAllBtn").addEventListener("click", function() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";  // Clear all tasks
});

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        document.getElementById("addTaskBtn").click();
    }
});

// Function to check if the task's due time is reached
function checkTaskDueTime(dueTime, li) {
    const alarmSound = document.getElementById("alarmSound");

    const intervalId = setInterval(function() {
        const currentTime = new Date();
        
        // Check if current time is equal to or past the due time
        if (currentTime >= dueTime) {
            // Play the alarm sound
            alarmSound.play();

            // Highlight the task with a red color for overdue
            li.classList.add("due-past");

            // Notify the user about the alarm
            alert(`Task "${li.querySelector('span').textContent}" is overdue!`);

            // Stop the interval after alarm is triggered
            clearInterval(intervalId);
        }
    }, 1000); // Check every second
}
