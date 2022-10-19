<template>
  <div class="signing">
    <div class="signing_bg"></div>
    <div>
      <h1>Sign in</h1>
      <button
        @click="signInWithGoogle"
        style="display: flex; align-items: center"
      >
        <img
          src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
          alt="Google icon"
          class="userIcon"
        />
        <!-- <a
        href="https://iaqkqmrgnunapjuwbgou.supabase.co/auth/v1/authorize?provider=google"
        > -->
        Sign in with google
        <!-- </a
      > -->
      </button>
      <p v-if="errorMsg" class="">
        {{ errorMsg }}
      </p>
      <form @submit.prevent="signIn">
        <div class="">
          <label class="" for="">Email</label><br />
          <input
            class=""
            type="email"
            placeholder="john@smith.com"
            v-model="email"
            id="email"
          />
        </div>
        <div class="mb-4">
          <label class="" for="">Password</label><br />
          <div class="">
            <input
              class=""
              :type="passwordFieldType"
              onpaste="return false"
              placeholder="************"
              v-model="password"
              id="password"
            />
            <span class="">
              <EyeIcon
                :class="[passwordFieldIcon]"
                @click.prevent="hidePassword = !hidePassword"
              />
            </span>
          </div>
        </div>
        <button class="" type="submit">Sign In</button>
        <p>Don't have an account?</p>
        <p class="">
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
// Route Variables
const route = "/auth/sign-up";
const buttonText = "Create one!";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();
console.log("Welcome to sign in");

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    if (email.value != "" && password.value != "") {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signIn(email.value, password.value);
      // redirects user to the homeView
      if (useUserStore().user) redirect.push({ path: "/" });
    }
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

async function signInWithGoogle() {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signInGoogle();
    console.log("Signed with google");
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
