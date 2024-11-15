# Use a Node.js base image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files to the container
COPY . .

# Build the TSOA Swagger project (if applicable)
RUN npm run build

# Expose the port that your API server will run on
EXPOSE 3010

# Start the application
CMD ["npm", "start"]
