# JVL cart

an E-commerce Website built with MERN stack.

## Instructions

after cloning, run this command in the root folder
```bash
npm install
```
navigate to "frontend" folder, run these commands 
```bash
npm install
npm run build
```
wait for application build
after that open the backend/config/config.env
and update the MongoDB connection string
```bash
...
DB_LOCAL_URI=mongodb://localhost:27017/jvlcart
```

navigate back to "root" folder and run this command for loading demo data
```bash
npm run seeder
```

run this below command to run the app in production mode
```bash
npm run prod
```


## Test
open the http://localhost:8000 and test the 

## Postman Collection
https://www.postman.com/jvlcode/workspace/nodejs-ecommerce/collection/19530322-997cf450-820a-4852-bc1f-a93c9072d6ec?action=share&creator=19530322


## License

[MIT](https://choosealicense.com/licenses/mit/)


## aws haproxy.cfg content
defaults
  mode http
  timeout client 10s
  timeout connect 5s
  timeout server 10s 
  timeout http-request 10s

frontend myfrontend
  bind *:80
  default_backend myservers

backend myservers
  server server1 127.0.0.1:8000
