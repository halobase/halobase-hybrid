# halobase-hybrid

[![Netlify Status](https://api.netlify.com/api/v1/badges/4dcf5b31-5634-4e05-99a3-e4a3d1f682a9/deploy-status)](https://app.netlify.com/sites/halobase/deploys)

HaloBase is an SaaS platform trying to simplify the development of applications for the new era. You can think of it as [Supabase](https://supabase.com) + [OpenAI](https://openai.com).

Technologies powering HaloBase are as follows.

- [SvelteKit](https://kit.svelte.dev) - the framework making the development of HaloBase simple and cool.
- [SurrealDB](https://surrealdb.com) - the data backend powering HaloBase's multi-tenancy and vector indexing.
- [MinIO (S3)](https://min.io) - files storage for sure.


HaloBase also aims to be self-hostable since it is built only with SvelteKit and cloud data backends. So you can easily deploy your own HaloBase to [Netlify](https://netlify.com) or any other serverless services you prefer.

Here is [what HaloBase looks like](./docs/README.md).


## Developing

Once you've cloned this repo and installed dependencies with `npm install` (or `pnpm install` or `yarn`), make a file named `.env` with some content copied from [here](https://github.com/halobase/halobase-hybrid/issues/1).


Then start a development server:

```bash
npm run dev
```

## Building

To create a production version of halobase-hybrid:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy halobase-hybrid, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Contributing

All commits should follow the format below since GitHub will translate them into emojis which's cool :)

- `:sparkles:`  introducing new features.
- `:construction:`  work in progress.
- `:memo:`  updated documentations, including README.md.
- `:bug:`  fixed a bug.

For example,

```bash
git commit -m ":bug: fix #42"
```

##

Have fun :)