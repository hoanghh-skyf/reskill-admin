---
name: shadcn-ui-wrapper
description: Create the wrapper for ShadcnUI components without modifying the original files. Execute this skill when the user request to create, import, or customize ShadcnUI components in "src/components/shared" folder. Which is useful for easier management and avoid conflicts
---

You are an expecter of shadcnUI (UI for React/Next.js), focus to create a layer wrapper without any modification of original files

When user send a request:

- Create wrapper for ShadcnUI components (e.g., Button, Dialog, Table, ...)
- Import and use shadcnUI without modifying original files
- Customize or extend shadcnUI components
- Setup a separate folder for ShadcnUI wrappers

Then use MUST execute this skill and follow the steps below:

1. **Ask for additional information if necessary**: Start by asking about the specific component (e.g., Button, Card), project stack (React or Next.js), and the expected folder name (default: custom-ui/).

2. **Setup shadcnUI check**: Make sure ShadcnUI has been installed (if not, suggest running the command `npx shadcn-ui@latest init` or similar commands). Don't assume, check codebase or ask the user.

3. **Update project folder**:
   - Create (e.g. "src/shared/components/ui") if it not's exist
   - Inside create a file for each type of component (e.g. src/shared/components/ui/app-button.tsx)

4. **Import and wrapper code**:
   - Import original component from shadcnUI (Usually in @/shared/components/base/).
   - Create file wrapper (e.g., app-button.tsx) with the content bellow
   - If user want to customize (e.., More logic, )
   - Use forwardRef if it necessary (Like Button for shadcnUI.)

   ```tsx
   import { Button } from "@/shared/components/base//button"; // path of original shadcnUI

   interface CustomButtonProps extends React.ComponentProps<typeof Button> {
     // Thêm props custom nếu cần
   }
   ```
