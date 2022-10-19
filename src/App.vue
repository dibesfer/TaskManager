<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  console.log("App mounted");
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});

async function authChange() {
  console.log("Calling authChange()");
  await userStore.fetchUser();
  await userStore.onAuthChange(router);
}
authChange();
</script>

<template>
  <div id="flex_papa">
    <div class="flex_kiddo">
      <Nav />
    </div>
    <div class="flex_kiddo" id="flex_mainSection">
      <router-view />
    </div>
    <div class="flex_kiddo">
      <Footer />
    </div>
  </div>
</template>