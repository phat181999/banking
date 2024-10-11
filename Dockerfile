# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application using a lightweight image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the built files from the previous build stage
COPY --from=builder /app/dist ./dist

# Copy the node_modules from the build stage
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3000 for the app
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
