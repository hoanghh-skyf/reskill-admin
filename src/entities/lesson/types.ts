import type { TModule } from "../module";
import type { ELessonType } from "./enum";

export type TLesson = {
  id: string;
  module_id: string;
  module: TModule;
  title: string;
  slug: string;
  order: number;
  lesson_type: ELessonType;
  duration: string; // "10:00", "5 mins"
  content_url: string;
  is_completed: boolean;
};
