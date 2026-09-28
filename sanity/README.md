# Main Story Newsroom

The newsroom is embedded at `/studio`.

## Required environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Optional private tokens are reserved for future server-side preview/write workflows.

## Content types

- Articles
- Authors
- Categories
- Topics
- Breaking News
- Live Stories
- Homepage Settings
- Site Settings

The public website currently continues to use mock data until a real Sanity project is connected. This prevents the working homepage from breaking while the newsroom is being configured.
