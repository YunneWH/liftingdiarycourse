# UI Coding Standards

## Component Library

**shadcn/ui is the only permitted component library for this project.**

- All UI must be built exclusively with shadcn/ui components.
- Do NOT create custom components. Use shadcn/ui primitives and compose them as needed.
- If a pattern is not covered by shadcn/ui, compose existing shadcn/ui components together rather than building from scratch.
- Refer to https://ui.shadcn.com/docs/components for the full list of available components.

## Date Formatting

All dates must be formatted using **date-fns**.

Use the following ordinal format:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

Format string (date-fns):

```ts
import { format } from "date-fns";

format(date, "do MMM yyyy");
// Output: "1st Sep 2025"
```

Do NOT use `Intl.DateTimeFormat`, `toLocaleDateString`, or manual string concatenation for date display.
