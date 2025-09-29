# ─── Stage 1: Build ─────────────────────────────
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY . .

# Optional: build frontend
# RUN npm run build

# ─── Stage 2: Production / Dev Preview ──────────
FROM node:20 AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy everything from build stage
COPY --from=build /app ./

EXPOSE 5173

# Use dev server (only for development; in production, use `vite preview`)
CMD ["npm", "run", "dev"]
