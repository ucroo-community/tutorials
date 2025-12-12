# Flow Bundle CI/CD Best Practices

This repository demonstrates best practices for automating Flow bundle deployment using GitHub Actions with automatic multi-bundle discovery and upload.

In the associated bundles, we use staging as an example. As noted in the `upload-all-bundles.yml` file, you must review carefully to make sure naming conventions match your schools' conventions.

## Disclaimer

These best practices are provided as guidance and examples. While we aim to provide secure and reliable patterns, the ultimate responsibility for your deployment environment, security, and operational practices is your own. Please review, test, and adapt these workflows according to your organization's specific requirements and security policies.

## Prerequisites

1. Access to https://github.com/ucroo/ihub-developer-scripts
2. Flow access token for your target environment
3. GitHub repository with Actions enabled

## Repository Structure

```
├── .github/workflows/
│   └── upload-all-bundles.yml   # Multi-bundle upload workflow
├── bundles/                     # Directory containing all bundles
│   ├── sports-widget/           # Example bundle
│   │   ├── v1_US_prestosports_US_scores_US_widget_US_2_US_0_US_0.json
│   │   ├── resource-attachments/
│   │   └── statefulBehaviour-attachments/
│   ├── example-bundle/          # Simple example for reference
│   │   └── bundle.json
│   └── ...                      # Additional bundles
```

## GitHub Actions Workflow

### Multi-Bundle Upload (`upload-all-bundles.yml`)

Automatically discovers and uploads all bundles in the `bundles/` directory.

- **Trigger**: Automatic on push to `main` branch + manual dispatch
- **Target**: All bundles in `bundles/` directory
- **Bundle Discovery**: Scans subdirectories and extracts bundle IDs from JSON files
- **Use case**: Automated deployment of all bundles

## Configuration

### Required GitHub Secrets

Configure these as **repository secrets** in GitHub (Settings → Secrets and variables → Actions):

| Secret       | Description               | Required    |
| ------------ | ------------------------- | ----------- |
| `FLOW_TOKEN` | Flow access token         | ✅ Required |
| `FLOW_HOST`  | Flow host URL             | Optional    |
| `API_HOST`   | API host URL              | Optional    |
| `CURL_ARGS`  | Additional curl arguments | Optional    |

### Environment Configuration

The workflow uses environment variables that can be customized:

```yaml
env:
  SCHOOL_ALIAS: myschool # Your school's identifier (e.g., myschool, harvard, ucla)
  BUNDLES_DIR: bundles # Directory containing bundles
```

## Setting Up Your Bundles

1. Create a `bundles/` directory in your repository
2. Create subdirectories for each bundle:
   ```
   bundles/
   ├── sports-widget/
   │   ├── bundle.json
   │   ├── resource-attachments/
   │   └── statefulBehaviour-attachments/
   ├── news-feed/
   │   └── bundle.json
   └── user-dashboard/
       └── bundle.json
   ```
3. Download your initial bundles from Flow using `downloadBundle.sh`
4. Commit the bundle files to version control
5. The workflow will automatically discover and upload all bundles on push to main

## Bundle Naming and ID Resolution

The workflow automatically extracts bundle IDs from JSON files using:

```bash
bundle_name=$(jq -r '.[0].id // empty' "$json_file")
```

This ensures compatibility with the `uploadBundle.sh` script regardless of filename conventions.

## Error Handling

The workflow includes error handling that:

- Fails the job on HTTP 400+ responses
- Checks `uploadBundleResponse.txt` for error indicators
- Provides clear error messages in GitHub Actions logs

## Best Practices

### School Environment Management

- Use different school aliases for testing vs production (e.g., `myschool-staging`, `myschool`)
- Keep school-specific secrets separate
- Test with a staging school alias before promoting to production

### Bundle Organization

- One bundle per directory in the `bundles/` folder
- Include all assets (resources, attachments) in bundle directories
- Use meaningful directory names that reflect bundle purpose

### Version Control

- Commit all bundle files including attachments
- Use meaningful commit messages for bundle changes
- Tag releases for production deployments

### Security

- Never commit access tokens or credentials
- Use GitHub repository secrets for sensitive data
- Limit access to production deployment workflows

## Troubleshooting

### Common Issues

**"Bad Message 400: Ambiguous URI empty segment"**

- Check `FLOW_HOST` secret - ensure no trailing slash
- Verify host URL format

**"No available flow token"**

- Verify `FLOW_TOKEN` secret exists and is valid
- Check token expiration

**Bundle not found**

- Ensure JSON file exists in bundle directory
- Verify bundle ID in JSON matches expected format
- Check file permissions

### Debugging

Enable debug output by adding to your workflow:

```yaml
- name: Debug bundle info
  run: |
    echo "Bundle file: $json_file"
    echo "Bundle ID: $bundle_name"
    jq '.[0].id' "$json_file"
```
