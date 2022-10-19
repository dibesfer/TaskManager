<template>
  <div id="displayFlex">
    <h1>
      <img id="logo" src="../assets/logo.png" alt="" /><a href=""
        >Task Manager</a
      >
    </h1>
    <h3 class="displayOnMobile">
      <img
        class="userIcon"
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        alt=""
        @click="openUserMenu"
      />
    </h3>
    <h3 class="dontDisplayOnMobile" v-if="useUserStore().user != null">
      {{ username }}
      <button type="submit" @click="signOut">🔴 Sign Out</button>
    </h3>
  </div>
  <div class="displayOnMobile displayNone" id="mobileUserMenu">
    <h3 v-if="userStore.user != null">
      <p>{{ username }}</p>
      <p @click="signOut">🔴 Sign Out</p>
    </h3>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// Router to push user once SignedIn to the HomeView
import { useRouter } from "vue-router";
//coger el email del usuario
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const redirect = useRouter();

const username = computed(() => {
  let s = userStore.user.email;
  return s.substring(0, s.indexOf("@"));
});

//Arrow function to Sign Out
const signOut = async () => {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
};

function openUserMenu() {
  let userMenu = document.getElementById("mobileUserMenu");
  userMenu.classList.toggle("displayNone");
}

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that saves the user email and cleans out the @client from the user
</script>

<style scoped>
#displayFlex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
}
* {
  margin: 0;
}

h1 {
  margin-left: 5px;
}

h1,
h3 {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.displayOnMobile {
  cursor: pointer;
}

@media screen and (min-width: 600px) {
  .displayOnMobile {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .dontDisplayOnMobile {
    display: none;
  }
  .displayOnMobile {
    display: block;
  }
  h1 {
    font-size: 26px;
  }
}
.displayNone {
  display: none;
}
</style>
