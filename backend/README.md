<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

----------
# Getting started

## Installation

Please check the [official laravel installation guide](https://laravel.com/docs/5.4/installation#installation) for server requirements before you start.

Clone the repository

    git clone https://github.com/Obaida00/laravel-next-native-boilerplate.git

Switch to the repo folder

    cd laravel-next-native-boilerplate

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000

**TL;DR command list**

    git clone https://github.com/Obaida00/laravel-next-native-boilerplate.git
    cd laravel-next-native-boilerplate
    composer install
    cp .env.example .env
    php artisan key:generate
    
**Make sure you set the correct database connection information before running the migrations** [Environment variables](#environment-variables)

    php artisan migrate
    php artisan serve

## Database seeding

**Populate the database with seed data with relationships. This can help you to quickly start testing the api or couple a frontend and start using it with ready content.**

Run the database seeder and you're done

    php artisan db:seed

***Note*** : It's recommended to have a clean database before seeding. You can refresh your migrations at any point to clean the database by running the following command

    php artisan migrate:refresh

The api can be accessed at [http://localhost:8000/api](http://localhost:8000/api).

## OAuth2.0 setup

> This is only required if you want to use the social login feature.

- Create a new project in the social app you want to utilize (available now are Google and Github) from the [GitHub Developer Console](https://github.com/settings/developers) or [Google Developer Console](https://console.developers.google.com/)
- Set the redirect url to `http://localhost:8000/api/social/callback` for both providers
- Set the client id and secret in the `.env` file

    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GOOGLE_REDIRECT=http://localhost:8000/api/social/callback
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    GITHUB_REDIRECT=http://localhost:8000/api/social/callback


## API Specification

This application adheres to the api specifications set by the [Scramble](https://github.com/dedoc/scramble) team. This helps mix and match any backend with any other frontend without conflicts.

> Full API spec can be found [here](http://localhost:8000/api/docs) when running the local server

----------
## Environment variables

- `.env` - Environment variables can be set in this file

***Note*** : You can quickly set the database information and other variables in this file and have the application fully working.

----------
# Testing API

Run the laravel development server

    php artisan serve

The api can now be accessed at

    http://localhost:8000/api

Request headers

| **Required** 	| **Key**              	| **Value**            	|
|----------	|------------------	|------------------	|
| Yes      	| Content-Type     	| application/json 	|
| Optional 	| Authorization    	| Bearer {token}  	|

Refer the [api specification](#api-specification) for more info.