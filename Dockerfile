# Use Node.js 14 image, ensure it's the correct version for your app
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/node-wisdom-app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code into the container
COPY . .

# Expose the app's port
EXPOSE 8000

# Set an explicit entry point for the application
CMD ["node", "app.js"]
