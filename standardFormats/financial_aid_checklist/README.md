## Financial Aid Checklist Data Shape

This is the data shape for `Financial Aid Checklist`, expected by the Flat File Financial Aid Checklist Widget Recipe.

| Column | Type | Required | Notes |
|-------|------|----------|-------------|
| aid_year | string | yes | Must be YYYY-YYYY format (e.g., 2024-2025). |
| complete | boolean | yes | Whether the item is complete |
| title | string | yes | Checklist item description |
| url | string | no | Optional, makes the item title a clickable link. If blank/missing, the widget renders the title as plain text. |
