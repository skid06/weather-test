# Weather Test App

Weather Test App built with Laravel as backend and React as frontend and interacting with Accuweather API.

## Steps to follow:

1. Install [docker app](https://www.docker.com/) into your computer and register if not yet registered.
2. Install [composer](https://getcomposer.org/) into your computer.
3. Clone this [git repository.](https://github.com/skid06/weather-test)
4. Copy .env.example to .env file. Fill in the environment variables.
5. Go to the project directory and run the command using terminal:

-   composer install

6. Run the command below in the terminal to generate the key for the application:

-   php artisan key:generate

7. Install laravel sail by running the command:

-   php artisan sail:install

8. Choose or type "mysql"
9. In the project directory, run the command below in the terminal.

-   alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'

10. To make sure this is always available, you may add this to your shell configuration file in your home directory, such as ~/.zshrc or ~/.bashrc, open a terminal and type the following command.

-   nano ~/.zshrc

11. And then add the command below at the end of the file

-   alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'

12. Go to .env file then add APP_PORT=3000, FORWARD_DB_PORT=3307, VITE_PORT=6173 - Make sure you don't use these values on your
    local server. If you're already using these values, just change the Port values accordingly.
13. In the project directory, run the command below in the terminal:

-   sail up

14. In the project directory, run the command below in the terminal:

-   sail artisan migrate

15. In the project directory, run the command below in the terminal:

-   sail npm install

16. In the project directory, run the command below in the terminal

-   sail npm run dev

17. In the project directory, run the command below in the terminal

-   sail artisan serve

18. Open a browser window and type "http://localhost:3000" you should change the port to the value you set for APP_PORT i.e APP_PORT=5000 then acccess the site with http://localhost:5000
