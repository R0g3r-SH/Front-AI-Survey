# Use Node.js 18
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app will run on
EXPOSE 3001

# Run the app with --host flag
CMD ["yarn", "start", "--host", "0.0.0.0"]
