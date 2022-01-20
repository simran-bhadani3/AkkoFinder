# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# add app
COPY . ./

EXPOSE 8080
# start app
CMD ["npm", "start"]

# trigger workflow
