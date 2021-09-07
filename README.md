
## Install instructions

- Clone the repo from https://github.com/arsanchez/auctions

- CD into the project root folder using the terminal

- Rename the file '.env.example' to '.env'

- Set your db name in the DB_DATABASE property, the default is "auctions"

- Run 

  ```bash
  composer install
  ```

- Run 

  ```bash
  npm install && npm run development
  ```

  

- Run the migrations 

  ```bash
  php artisan migrate
  ```

  

- Run the DB seeder 

  ```bash
  php artisan db:seed
  ```

  

- Serve the application 

  ```bash
  php artisan serve
  ```

  

- Go to localhost:8000 and log with one of these user:pass pairs 

  user1:pass1 user2:pass2

  
