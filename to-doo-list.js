const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('task');
const priorityInput = document.getElementById('priority');
const todoTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

function addTask(task, priority) {
  // Create a new row in the table
  const row = todoTable.insertRow();

  // Insert new cells in the row
  const taskCell = row.insertCell(0);
  const priorityCell = row.insertCell(1);
  const actionsCell = row.insertCell(2);

  // Assign values to the cells
  taskCell.textContent = task;
  priorityCell.textContent = priority;
  priorityCell.className = priority; // Assign a class based on priority

  // Add action buttons (edit and delete)
  actionsCell.innerHTML = `
    <button class="edit-task" style="background-color: blue; font-weight: bolder; font-size: large; color: white;">
      <i class="icon-edit"></i>Edit
    </button>
    <button class="delete-task" style="background-color: red; font-weight: bolder; font-size: large; color: white;">
      <i class="icon-trash"></i>Delete
    </button>
  `;
}

function editTask(row, task, priority) {
  const taskCell = row.cells[0];
  const priorityCell = row.cells[1];

  taskCell.textContent = task;
  priorityCell.textContent = priority;

  // Reset the class for priority and apply the new class
  priorityCell.className = priority;
}

function deleteTask(row) {
  // Delete the row from the table
  todoTable.deleteRow(row.rowIndex - 1); // Adjust for thead
}

// Handle form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const task = taskInput.value.trim();
  const priority = priorityInput.value;

  // Validate input
  if (!task || priority === "") {
    alert('Please enter a task and select a valid priority.');
    return;
  }

  // Add the new task
  addTask(task, priority);

  // Reset the form
  todoForm.reset();
});

// Handle table clicks for edit and delete
todoTable.addEventListener('click', function(event) {
  const target = event.target.closest('button');
  if (!target) return;

  const row = target.parentElement.parentElement;

  if (target.classList.contains('edit-task')) {
    // Edit task
    const task = prompt('Enter the updated task:', row.cells[0].textContent);
    const priority = prompt('Enter the updated priority (High, Medium, Low):', row.cells[1].textContent);

    if (task && priority) {
      editTask(row, task, priority);
    }
  } else if (target.classList.contains('delete-task')) {
    // Delete task
    deleteTask(row);
  }
});
