# Use Node for development
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port React uses
EXPOSE 3000

# Default command for development
CMD ["npm", "start"]
