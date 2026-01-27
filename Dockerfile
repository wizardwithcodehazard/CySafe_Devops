# Stage 1: Build the React Application
# We use Node to build the artifacts
FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Environment (Ubuntu + Nginx)
# We use Ubuntu as the base OS
FROM ubuntu:22.04

# Install Nginx on Ubuntu
# -y means "yes to all prompts", -qq means "quiet"
RUN apt-get update -qq && \
    apt-get install -y -qq nginx && \
    rm -rf /var/lib/apt/lists/*

# Clean the default Nginx folder
RUN rm -rf /var/www/html/*

# Copy the built React app from Stage 1 to Nginx folder
COPY --from=build-stage /app/dist /var/www/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]