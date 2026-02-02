import type { Module } from "./module";

export interface Lesson {
  id: string;
  module_id: string;
  module: Module;
  title: string;
  slug: string;
  order: number;
  lesson_type: "VIDEO" | "TEXT" | "QUIZ" | "PROJECT";
  duration: string; // "10:00", "5 mins"
  content_url: string;
  is_completed: boolean;
}
