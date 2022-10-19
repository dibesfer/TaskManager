<template>
  <div id="flexbox">
    <div class="flexbox_element">
      <NewTask @childNewTask="sendToStore" />

      <h2 id="_totalTasks">
        Total tasks: {{ doneTaskArray.length }} / {{ taskArray.length }}
      </h2>
      <br />
    </div>
    <div id="todoTasks" class="flexbox_element">
      <h2 class="taskTitle">({{ todoTaskArray.length }}) 💪TO-DO</h2>

      <div class="taskContainerElement">
        <ol>
          <TaskItem
            @updateTasksAgain="readFromStore"
            v-for="(task, index) in todoTaskArray"
            :key="index"
            :taskData="task"
          ></TaskItem>
        </ol>
      </div>
    </div>
    <div id="doneTasks" class="flexbox_element">
      <h2 class="taskTitle">({{ doneTaskArray.length }}) ⭐DONE</h2>
      <div class="taskContainerElement">
        <ol>
          <TaskItem
            @updateTasksAgain="readFromStore"
            v-for="(task, index) in doneTaskArray"
            :key="index"
            :taskData="task"
          ></TaskItem>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewTask from "@/components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { useTaskStore } from "../stores/task.js";
//coger el email del usuario
import { useUserStore } from "@/stores/user.js";

// nos definimos la tienda del usuario dentro de una constante
const taskStore = useTaskStore();

// Inicializamos array de tareas
let taskArray = ref([]);
let todoTaskArray = ref([]);
let doneTaskArray = ref([]);

async function readFromStore() {
  taskArray.value = await taskStore.fetchTasks();
  todoTaskArray.value = taskArray.value.filter(
    (element) => element.is_complete == false
  );
  doneTaskArray.value = taskArray.value.filter(
    (element) => element.is_complete == true
  );
}
readFromStore();

// Enviamos los datos de la tarea a la Tienda taskStore
async function sendToStore(title, description) {
  await taskStore.addTask(title, description);
  readFromStore();
}
</script>

<style scoped>
#_totalTasks {
  text-align: center;
}
#todoTasks {
  background-color: #7779ff;
  display: flex;
  flex-direction: column;
}
.taskContainerElement {
  overflow: auto;
  padding: 15px;
}
#doneTasks {
  background-color: rgb(94, 207, 94);
  display: flex;
  flex-direction: column;
}
#todoTasks .taskTitle {
  background-color: darkblue;
}
#doneTasks .taskTitle {
  background-color: darkgreen;
}
.taskTitle {
  color: white;
  padding: 15px;
}
</style>

<!-- 
**Hints**
2. (NewTask, TaskItem, Footer, Nav) components are used here! 

4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function

6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.

7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 

7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 

7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.

-->
