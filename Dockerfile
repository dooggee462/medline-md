# ───────────────────────────────────────────────
# Medline.md — imagine Docker pentru Next.js (standalone)
# Multi-stage: instalare → build → runtime minim
# ───────────────────────────────────────────────
FROM node:22-alpine AS base

# --- Dependențe ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Runtime (imagine finală, mică) ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Utilizator non-root pentru securitate
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copiem doar ce e necesar pentru runtime
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Folder de date persistent (articole din panou + poze încărcate)
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data
ENV DATA_DIR=/app/data

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
