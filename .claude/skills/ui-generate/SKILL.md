---
name: re-skill-admin-structure
description: >
  Architectural guide and coding rules for the re-skill-admin project. Use this skill
  whenever you are creating, editing, or refactoring any file inside the `src/` directory
  of the re-skill-admin project. Triggers include: adding a new feature, creating a new
  page, adding a UI component, defining an API call, writing a server action, creating
  a DTO or mapper, or placing any new file anywhere in the project. If the user says
  anything like "add a new module", "create a form", "add an entity", "build a page",
  "call an API", or "scaffold a feature", always consult this skill first.
---

# re-skill-admin: Project Structure & Architecture Skill

This skill defines exactly where each type of code belongs in the `src/` directory and how layers depend on each other. Always follow these rules when generating or modifying any code in the project.

---

## Directory Overview

```
src/
├── app/               # Next.js App Router — pages & layouts only
├── entities/          # Domain types, interfaces, constants
├── modules/           # Feature logic (actions, APIs, schemas, UI)
└── shared/            # Reusable, app-agnostic code
```

---

## Layer 1 — `app/` (Application Layer)

**Purpose:** Next.js routing, pages, and layouts. Zero business logic.

**Current structure:**

```
app/
├── layout.tsx                  # Root layout
├── favicon.ico
├── (auth)/                     # Auth route group (unauthenticated)
│   ├── page.tsx                # Login page
│   ├── forgot-password/page.tsx
│   ├── otp/page.tsx
│   └── reset-password/page.tsx
└── (main)/                     # Authenticated dashboard area
    ├── layout.tsx
    └── statistics/page.tsx
```

**Rules:**

- Pages **compose** components from `modules/<feature>/ui/` and layouts from `shared/components/layouts/`.
- No raw fetch calls, no Zod schemas, no business logic inline.
- New authenticated pages go inside `(main)/`. New auth pages go inside `(auth)/`.

**Example page pattern:**

```tsx
// app/(auth)/page.tsx
import { LoginForm } from "@/modules/authentication/ui/LoginForm";
import { AuthLayout } from "@/shared/components/layouts/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
```

---

## Layer 2 — `entities/` (Domain Layer)

**Purpose:** Core business types and constants. Shared across the whole app.

**Current structure:**

```
entities/
├── index.ts
├── course/
│   ├── index.ts
│   └── types.ts
├── lesson/
│   ├── index.ts
│   └── types.ts
└── module/
    ├── index.ts
    └── types.ts
```

**Rules:**

- Only TypeScript `interface`, `type`, `enum`, and constants here.
- ❌ No UI components.
- ❌ No imports from `modules/` or `app/`.
- ✅ Can be imported by `modules/` and `shared/`.

**Example:**

```ts
// entities/course/types.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  publishedAt: Date | null;
}
```

**When to add a new entity:** When a new business domain is introduced (e.g., `quiz`, `instructor`). Create `entities/<domain>/types.ts` + `entities/<domain>/index.ts`.

---

## Layer 3 — `modules/` (Feature Layer)

**Purpose:** All feature-specific logic. One folder per business capability.

**Current modules:**

```
modules/
├── authentication/
│   ├── actions.ts         # Next.js Server Actions
│   ├── apis.ts            # fetch / API route calls
│   ├── schema.ts          # Yup validation schemas
│   ├── dtos/
│   │   └── sign-in.dto.ts
│   ├── mappers/
│   │   └── sign-in.mapper.ts
│   ├── components/        # Private sub-components used by ui/
│   │   └── card.ts
│   └── ui/                # Top-level feature components (consumed by app/)
│       ├── LoginForm.tsx
│       ├── OTPValidationForm.tsx
│       ├── ForgotPasswordForm.tsx
│       └── ResetPasswordForm.tsx
└── courses/
    └── ui/
```

### File responsibilities

| File/Folder   | What goes here                                                           |
| ------------- | ------------------------------------------------------------------------ |
| `actions.ts`  | `"use server"` Next.js Server Actions (mutations, form submissions)      |
| `apis.ts`     | Client-side `fetch` wrappers, API route definitions                      |
| `schema.ts`   | Yup validation schemas for forms and API payloads                        |
| `dtos/`       | TypeScript types for raw API request/response shapes                     |
| `mappers/`    | Pure functions converting DTOs ↔ domain entities                         |
| `components/` | **Private** sub-components imported only by `ui/` within the same module |
| `ui/`         | **Public** top-level feature components consumed by `app/` pages         |

### `components/` vs `ui/` — Key Distinction

|                 | `components/`                                | `ui/`                                       |
| --------------- | -------------------------------------------- | ------------------------------------------- |
| **Visibility**  | Private to the module                        | Public — imported by `app/`                 |
| **Content**     | Smaller building blocks, sub-sections, cards | Full forms, full views, page-level sections |
| **Example**     | `LoginCard.tsx`, `OtpInputGroup.tsx`         | `LoginForm.tsx`, `OTPValidationForm.tsx`    |
| **Who imports** | Only files inside the same module            | Pages in `app/`                             |

### Rules

- ✅ Can import from `entities/` and `shared/`.
- ⚠️ Avoid importing from other modules. If logic is needed by multiple modules, move it to `entities/` or `shared/`.
- ❌ Never import directly from `shared/components/base/`. Always use `shared/components/ui/` (`app-*` wrappers).

### How to scaffold a new feature module

```
modules/<feature-name>/
├── actions.ts
├── apis.ts
├── schema.ts
├── dtos/
│   └── <resource>.dto.ts
├── mappers/
│   └── <resource>.mapper.ts
├── components/            # Private sub-components (only used inside this module)
│   └── <SubComponent>.tsx
└── ui/                    # Public components (imported by app/ pages)
    └── <FeatureView>.tsx
```

**Example DTO + mapper + schema:**

```ts
// modules/courses/dtos/create-course.dto.ts
export interface CreateCourseRequestDto {
  title: string;
  description: string;
}

// modules/courses/mappers/create-course.mapper.ts
import type { CreateCourseRequestDto } from "../dtos/create-course.dto";
import type { Course } from "@/entities/course";

export function mapCreateCourseDtoToEntity(
  dto: CreateCourseRequestDto,
): Partial<Course> {
  return { title: dto.title, description: dto.description };
}

// modules/courses/schema.ts
import * as yup from "yup";
export const createCourseSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});
export type CreateCourseFormValues = yup.InferType<typeof createCourseSchema>;
```

**Example sub-component in `components/` consumed by `ui/`:**

```tsx
// modules/courses/components/CourseFormCard.tsx
// Private — only imported by files inside modules/courses/
import { AppCard } from "@/shared/components/ui/app-card";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function CourseFormCard({ children, title }: Props) {
  return (
    <AppCard>
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {children}
      </div>
    </AppCard>
  );
}

// modules/courses/ui/CreateCourseForm.tsx
// Public — imported by app/(main)/courses/page.tsx
import { CourseFormCard } from "../components/CourseFormCard";

export function CreateCourseForm() {
  return (
    <CourseFormCard title="New Course">{/* form fields */}</CourseFormCard>
  );
}
```

---

## Layer 4 — `shared/` (Shared Layer)

**Purpose:** Universal, reusable code. No feature knowledge whatsoever.

**Structure:**

```
shared/
├── components/
│   ├── base/          # Raw Shadcn UI primitives (DO NOT import directly in features)
│   │   └── button.tsx, input.tsx, table.tsx ... (20 components)
│   ├── ui/            # App-level wrappers (ALWAYS use these)
│   │   └── app-button.tsx, app-input.tsx, app-table.tsx ... (22 components)
│   ├── layouts/       # Structural chrome
│   │   └── sidebar.tsx, header.tsx, auth-layout.tsx ...
│   └── icons/
│       └── index.tsx
├── lib/
│   └── utils/
│       ├── array.ts
│       ├── cn.ts       # Tailwind class merging utility
│       └── index.ts
└── styles/
    ├── globals.css
    └── fonts.ts
```

### ⚠️ Critical UI Import Rule

| ✅ CORRECT                                                      | ❌ WRONG                                                   |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| `import { AppButton } from '@/shared/components/ui/app-button'` | `import { Button } from '@/shared/components/base/button'` |
| `import { AppInput } from '@/shared/components/ui/app-input'`   | `import { Input } from '@/shared/components/base/input'`   |

Always use `app-*` wrappers. Never import base components directly in modules or app layers.

### Available `shared/components/ui/` components

| Wrapper                               | Base           |
| ------------------------------------- | -------------- |
| `app-badge`                           | `badge`        |
| `app-breadcrumb`                      | `breadcrumb`   |
| `app-button`                          | `button`       |
| `app-button-group`                    | `button-group` |
| `app-card`                            | `card`         |
| `app-checkbox` / `app-checkbox-field` | `checkbox`     |
| `app-data-table`                      | `table`        |
| `app-drawer`                          | `drawer`       |
| `app-dynamic-breadcrumb`              | `breadcrumb`   |
| `app-field`                           | `field`        |
| `app-input`                           | `input`        |
| `app-input-group`                     | `input-group`  |
| `app-input-otp`                       | `input-otp`    |
| `app-input-password`                  | `input`        |
| `app-pagination`                      | `pagination`   |
| `app-popover`                         | `popover`      |
| `app-select`                          | `select`       |
| `app-separator`                       | `separator`    |
| `app-skeleton`                        | `skeleton`     |
| `app-table`                           | `table`        |
| `app-tooltip`                         | `tooltip`      |

### Rules

- ❌ Must NOT import from `app/`, `modules/`, or `entities/`.
- ✅ Can be imported by any other layer.

---

## Dependency Flow (Strict)

```
app/  →  modules/  →  entities/
 ↓           ↓            ↑
 └───────→  shared/  ──────┘
```

Allowed imports:

- `app` → `modules`, `shared`, `entities`
- `modules` → `shared`, `entities`
- `shared` → nothing (no internal `src/` imports)
- `entities` → nothing

---

## Step-by-Step: Building a New Feature

1. **Define the domain model** → `entities/<domain>/types.ts`
2. **Create the module folder** → `modules/<feature>/`
3. **Write data contracts** → `modules/<feature>/dtos/<resource>.dto.ts`
4. **Write mappers** → `modules/<feature>/mappers/<resource>.mapper.ts`
5. **Write validation** → `modules/<feature>/schema.ts`
6. **Write API calls** → `modules/<feature>/apis.ts`
7. **Write server actions** → `modules/<feature>/actions.ts`
8. **Build feature UI** → `modules/<feature>/components/` cho sub-components, `modules/<feature>/ui/` cho top-level views — dùng `shared/components/ui/app-*`
9. **Wire the page** → `app/(main)/<route>/page.tsx` composing the feature component

---

## Path Aliases

Use `@/` as the root alias pointing to `src/`:

```ts
import { Course } from "@/entities/course";
import { LoginForm } from "@/modules/authentication/ui/LoginForm";
import { AppButton } from "@/shared/components/ui/app-button";
import { cn } from "@/shared/lib/utils";
```
