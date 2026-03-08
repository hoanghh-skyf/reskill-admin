"use client";

import { BookOpen, Plus } from "lucide-react";
import AppButton from "@/shared/components/ui/app-button";

export function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 ring-8 ring-orange-50">
        <BookOpen className="h-8 w-8 text-orange-600" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Chưa có khóa học nào
      </h2>
      <p className="mb-6 max-w-sm text-sm text-gray-500">
        Bắt đầu bằng cách tạo khóa học đầu tiên của bạn. Bạn có thể thêm bài học
        và module sau.
      </p>
      <AppButton className="bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 shadow-lg hover:shadow-orange-300 transition-all">
        <Plus className="mr-2 h-4 w-4" />
        Tạo Course Mới
      </AppButton>
    </div>
  );
}
