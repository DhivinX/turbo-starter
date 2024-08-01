rm -r node_modules
rm -r .turbo
rm -r **/**/node_modules
rm -r **/**/dist
rm -r **/**/.nuxt
rm -r **/**/.output
rm -r **/**/.turbo
rm -r **/**/.astro
rm -r .pnpm-store
rm .pnpm-lock.yaml

pnpm store prune
