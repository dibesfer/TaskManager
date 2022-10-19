<template>
  <div
    class="taskItem"
    :data-id="taskData.id"
    :style="{ backgroundColor: taskData.color }"
  >
    <li>
      <div v-if="!editMode">
        <b>{{ taskData.title }} </b><br />
        <i> {{ taskData.description }}</i
        ><br />
        <button v-if="taskData.is_complete" @click="uncompleteOneTask">
          UNDO
        </button>
        <button v-else @click="completeOneTask" class="green_btn">DONE</button>
        <button @click="editMode = true" class="darkgray_btn">Edit</button>
        <button @click="deleteTask" class="red_btn">Delete</button>
      </div>
      <div v-else>
        <input type="text" v-model="taskData.title" /><br />
        <input type="text" v-model="taskData.description" /><br />
        <label for="color"> Color </label>
        <input
          style="width: 50px; height: 50px"
          type="color"
          v-model="taskData.color"
        />
        <button @click="saveEditedTask()" class="green_btn">Save</button>
        <button @click="editMode = false" class="red_btn">Cancel</button>
      </div>
    </li>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task.js";

// Data that TaskItem is recieved when called in Home
const props = defineProps(["taskData"]);
// External event that Home will respond with a function to
const emit = defineEmits(["updateTasksAgain"]);

// Store reference
const taskStore = useTaskStore();

//Current ID
let myID = props.taskData.id;

// Edit mode
let editMode = ref(false);

function changeColor() {}

async function saveEditedTask() {
  myID = props.taskData.id;
  editMode.value = false;
  await taskStore.editTask(
    myID,
    props.taskData.title,
    props.taskData.description,
    props.taskData.color
  );
  emit("updateTasksAgain");
}
async function deleteTask() {
  myID = props.taskData.id;
  if (confirm("Are you sure you want to delete task id " + myID + "?")) {
    await taskStore.deleteSpecificTask(myID);
    emit("updateTasksAgain");
  }
}
async function completeOneTask() {
  myID = props.taskData.id;
  await taskStore.completeTask(myID);
  emit("updateTasksAgain");
}
async function uncompleteOneTask() {
  myID = props.taskData.id;
  await taskStore.uncompleteTask(myID);
  emit("updateTasksAgain");
}
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
