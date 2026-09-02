// template store
import * as fs from 'fs';
import * as path from 'path';
export const strategies = [
    {
        name: 'Node.js (TypeScript)',
        match: (dir) => fs.existsSync(path.join(dir, 'package.json')) && fs.existsSync(path.join(dir, 'tsconfig.json')),
        generate: (dir) => {
            const hasLockFile = fs.existsSync(path.join(dir, 'package-lock.json'));
            const hasMigrations = fs.existsSync(path.join(dir, 'migrations'));
            const installCmd = hasLockFile ? 'npm ci' : 'npm install';
            const prodInstallCmd = hasLockFile ? 'npm ci --omit=dev' : 'npm install --omit=dev';
            const migrationsCopyCmd = hasMigrations ? 'COPY migrations ./migrations' : '';
            return `
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN ${installCmd}
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN ${prodInstallCmd}
COPY --from=builder /app/dist ./dist
${migrationsCopyCmd}
EXPOSE 3000
CMD ["npm", "start"]
      `.trim();
        }
    },
    {
        name: 'Node.js (Standard)',
        match: (dir) => fs.existsSync(path.join(dir, 'package.json')) && !fs.existsSync(path.join(dir, 'tsconfig.json')),
        generate: (dir) => {
            const hasLockFile = fs.existsSync(path.join(dir, 'package-lock.json'));
            const prodInstallCmd = hasLockFile ? 'npm ci --omit=dev' : 'npm install --omit=dev';
            return `
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN ${prodInstallCmd}
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
      `.trim();
        }
    },
    {
        name: 'Python (Pip)',
        match: (dir) => fs.existsSync(path.join(dir, 'requirements.txt')),
        generate: () => `
FROM python:3.10-slim AS builder
WORKDIR /app
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.10-slim
WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
    `.trim()
    },
    {
        name: 'Go (Modules)',
        match: (dir) => fs.existsSync(path.join(dir, 'go.mod')),
        generate: () => `
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
    `.trim()
    }
];
//# sourceMappingURL=buildStrategies.js.map