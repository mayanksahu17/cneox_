# Use an official Node runtime as the parent image for the build stage
FROM node:20-slim AS build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Use an official lightweight NGINX image for the runtime stage
FROM nginx:1.17-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
# Copy the build files from the build stage to the NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the service
EXPOSE 80

# Start nginx with the default command, which uses the default configuration
CMD ["nginx", "-g", "daemon off;"]
