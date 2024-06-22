# Bootstrap

1. Switch to Node.js version specified in `.nvmrc` file

2. Install `pnpm`

3. Run `pnpm prepare`

4. Create `.env` file from `.env.example`

5. Fill `.env` file with your variables

6. Run `pnpm prepare && pnpm db-setup`

7. Run `pnpm dev` to launch app in development mode

8. Run `pnpm build && pnpm start` to launch app in production mode

## Addition commands

`pnpm lint` - run eslint analyzer

`pnpm prettier` - run prettier analyzer

`pnpm prettify` - apply prettier style for codebase

`pnpm analyze-code` - same as `pnpm lint && pnpm prettier`

`pnpm shad` - for installing UI components. Example `pnpm shad add button --path=./src/app/components/atoms`. Reference: https://ui.shadcn.com/
