<template>
  <div class="signing">
    <h1>Sign Up</h1>

    <p>Create your personal account to manage your own tasks.</p>

    <form @submit.prevent="signUp">
      <div class="">
        <label class="" for="">Email</label><br />
        <input
          class=""
          type="email"
          placeholder="john@example.com"
          v-model="email"
          id="email"
        />
      </div>
      <div class="">
        <label class="" for="">Password</label><br />
        <input
          class=""
          type="password"
          placeholder="************"
          v-model="password"
          id="password"
        />
      </div>
      <div class="">
        <label class="" for="">Confirm Password</label><br />
        <input
          class=""
          type="password"
          placeholder="************"
          v-model="confirmPassword"
          id="confirmPassword"
        />
      </div>
      <br />
      <button class="" type="submit">Sign Up</button>
      <p class="">
        <span class="">Already have an account? </span>
        <PersonalRouter :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Sign in";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>

<!-- <template>
  <h1>Sign up</h1>
  <p>Email</p>
  <p>Password</p>

  <PersonalRouter :route="route" :buttonText="buttonText" />
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

// Input Fields

// Error Message

// Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
</script>

<style></style> -->
