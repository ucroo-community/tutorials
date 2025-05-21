File Formatting Notes and Recommendations
-----------------------------------------

-	The `datetime` value **must** be ISO-8601 compliant (eg. `YYYY-MM-DDTHH:MM:SSZ`).

-	The file name should start and end with whatever is configured in the recipe. Current defaults are a filename of `holds_and_restrictions_data` and of type `JSON`.

-	The user identifier (`alternate_id` in the example file) key can be any one of the four Pathify primary identities. Which, alongside `alternate_id`, also includes `email`, `sso_id` and `guid`.
