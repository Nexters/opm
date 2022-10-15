FROM node:14.17.2

ENV NODE_ENV development

#add turborepo
RUN yarn global add turbo

# Set working directory
WORKDIR /app

# Install app dependencies
COPY  ["yarn.lock", "package.json", "./"]

# Copy source files
COPY . .

# Install app dependencies
RUN yarn install

EXPOSE 3000 8080

CMD ["yarn", "start"]