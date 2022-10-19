import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    async completeTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: true })
        .eq("id", id);
    },

    async editTask(id, mytitle, mydescription, mycolor) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: mytitle, description: mydescription, color: mycolor })
        .eq("id", id);
    },

    async uncompleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: false })
        .eq("id", id);
    },

    async deleteSpecificTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
    },

    async deleteAllTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("is_complete", false);
    },
  },
});
