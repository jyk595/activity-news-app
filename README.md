# Activity.News

![Image 2021-10-06 at 9 35 52 PM](https://user-images.githubusercontent.com/6384642/136321067-97c72f14-f4f9-4ff9-b164-c3c006fdef32.jpg)

Activity.News is your landing page for the internet. When you need a way to organize all your tabs, thoughts, ideas, and dreams, this is the platform for you. You can save your articles and collect notes on your saved links. 

<a href="https://activity-news-app.herokuapp.com/">View the live app here!</a>

## Get started

After cloning the repo into you system you will need to:

Make sure your system is running the following:
- Ruby 2.7.4
- NodeJS (v14 or higher), and npm
- Heroku CLI
- Postgresql

After clonging the repo, run the following steps in the project directory to get started:

### `bundle install`
Install Ruby gem packages associated with the project.

### `rails db:migrate db:seed`
Migrates all tables and associations that are needed. Also make sure to seed the backend so you have some data to work with.

### `rails s`
Start your Rails server. For a closer look at just the backend, you can open http://localhost:3000

### Create API keys and add a .env.local
This app uses a Mailchimp API that need its own private keys.

### `npm start --prefix client`
Runs the app in the development mode.

### `npm test --prefix client`
Launches the test runner in the interactive watch mode. See the section about running tests for more information. Open http://localhost:4000 to view it in the browser.

## Features

1. User can sign up for an account
2. User can log into an existing account
3. User can add links to their feed
4. User can add notes to an article
5. User can view, edit, and delete notes
6. User can delete articles
7. User can sign up for a newsletter mailing list
