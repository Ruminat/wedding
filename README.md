# Wedding invitation

Свадьба, свадьба! Кольца, кольца!

Live site: https://ruminat.github.io/wedding

## Development

```sh
cp .env.example .env
npm install
npm run dev
```

## Agent documentation

- [Repository agent guide](AGENTS.md)
- [Post-wedding context and quality bar](docs/after-wedding-context.md)
- [Image quality guide](docs/image-quality-guide.md)
- [Visual testing guide](docs/visual-testing.md)

## Environment variables

| Variable | Where | Description |
| --- | --- | --- |
| `VITE_FORM_HANDLE` | `.env` locally, GitHub Actions variable in production | RSVP API URL |

## Personalized invite links

| Parameter | Description |
| --- | --- |
| `who` | Guest name (e.g. `Дорогая Олечка`) |
| `plural` | Plural verb forms |
| `fool` | Tweak button labels |
| `scriptURL` | Override the RSVP API URL |

Example:

```
https://ruminat.github.io/wedding/?who=Дорогие%20Катя%20и%20Денис&plural
```

## Deployment

Every commit to `main` deploys to GitHub Pages.

One-time setup:

1. **Settings → Secrets and variables → Actions → Variables** — add `VITE_FORM_HANDLE`
2. **Settings → Pages** — set source to **GitHub Actions**
