import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signInGoogle() {
      this.signOut();
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) {
        console.log("google error");
        throw error;
      }
      if (user) {
        this.user = user;
        console.log("HEEYOOOO" + this.user);
        redirect_to = "/";
      }
    },
    async onAuthChange(router) {
      this.fetchUser();
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event !== "SIGNED_OUT") {
          router.push("/");
        } else {
          router.push("/auth/login");
        }
      });
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.user = null;
      console.log("signed out");
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
