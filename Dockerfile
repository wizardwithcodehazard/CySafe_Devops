# Stage 1: Build the React Application
FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Environment (Ubuntu + Nginx)
FROM ubuntu:22.04

# Install Nginx
RUN apt-get update -qq && \
    apt-get install -y -qq nginx && \
    rm -rf /var/lib/apt/lists/*

# Clean the default Nginx folder
RUN rm -rf /var/www/html/*

# --- NEW STEP: Apply our Custom Nginx Config ---
# We overwrite the default Ubuntu Nginx site configuration
COPY nginx.conf /etc/nginx/sites-available/default

# Copy the built React app from Stage 1
COPY --from=build-stage /app/dist /var/www/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]