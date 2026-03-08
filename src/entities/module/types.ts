export type TModule = {
  id: string;
  title: string;
  slug: string;
  scope: number; // 1, 2
  scope_order: number; // 1.1, 1.2 => 1, 2
  order: number;
  is_locked: boolean;
  is_completed: boolean;
  course_id: string;
  course?: [];
};
