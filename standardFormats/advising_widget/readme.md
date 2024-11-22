## Important!

Files only need to be provisioned for the Advising Widget if opting for **Appointments** in the recipe.

They are **not required** if Appointments are not selected.

## File Formatting Notes and Recommendations

- The `datetime` value **must** be ISO-8601 compliant (eg. `YYYY-MM-DDTHH:MM:SSZ`).

- The file name should start with `advising_data` (eg. `advising_data_240210.json`).

- The `alternate_id` key can be any one of the four Pathify primary identities (`email`, `sso_id` or `guid`).
