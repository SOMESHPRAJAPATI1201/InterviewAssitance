# -------- Stage 1: Builder --------
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies (for compiling wheels)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first for better caching
COPY requirement.txt .

# Create a venv and install dependencies
RUN python -m venv /opt/venv \
    && /opt/venv/bin/pip install --upgrade pip \
    && /opt/venv/bin/pip install --no-cache-dir -r requirement.txt


# -------- Stage 2: Runtime --------
FROM python:3.11-slim

# Set path to use venv packages
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

# Install only minimal runtime OS packages (ffmpeg optional)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy venv from builder (contains dependencies only)
COPY --from=builder /opt/venv /opt/venv

# Copy application code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
