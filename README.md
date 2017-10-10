# GA_WDI_project_2

## Name: TV Time 

## Technologies Used:

**JavaScript:**
Javascript was utilized as the language to perform front end DOM manipulation for edit/delete events from the database.
It was also utlizied to fill out the controllers and models using node.js and NPM packages like express, mustache-express, and 
body parser. 

**HTMl:**
HTML was utliized for the view pages of the MVC model. This in conjunction with the npm package mustache-express allowed 
for the rendering of data from the SQL database and ajax calls to the API.

**CSS:**
CSS was utilized in order to style the views. Some CSS selectors such as :hover were also utilized to add styling based on 
mouse location in the window.

**SQL:**
SQL was utilized in order to create and communicate with the local database. The database created contained a table for the users and a table for the the show data that each user wanted to saved. They were joined based on the user_id primary key. SQL was also used in the models in conjunction with the npm package pg-promise in order to save data to the database, edit data in the database, and delete data in the database.

## User Stories: 

**Avid Consumer:**
As an avid consumer of television I want to be able to access a resource that will show me the air date and time of my favorite shows so that I can better manage my schedule and make sure I never miss an episode! 

**Casual Consumer:**
As a casual TV viewer I want a resource that will allow me to quickly view information about shows I have seen in the past with relevant data about when that show is on and other useful information about the show. There are just too many shows today for me to keep track of! 

**Forgetful Consumer:**
As a forgetful TV consumer I want to be able to add and edit notes about my favorite shows so I can remember things about them like the plot is, whether or not I like the show, and which characters are doing what! 

## Approach: 

Before any coding was done, the project was completely white boarded and wireframed (examples below). In the whiteboarding I tried to look at the API call I would make using postman and determine what pieces of data from the JSON returned I would need to work with. From there I was able to conceptually build out my SQL database schema based on the information I knew I wanted to store. Once I had a good idea of what data I needed, and where I wanted to put it, I began the process of actually coding the app. 

This started by first building out the entire MVC file structure with all files I believed necessary (although a few were added or deleted along the way), and then seeding my SQL database based on my schema. 

Once I had completed the file structure I began by implementing user authentication. I just wanted to get the app working so a user could log in and that would take them to a profile page. Nothing with the API or database just yet, as I figured that would all be layered on once authentication was working. 

Once the authentication worked I started in on building out my shows controller and model to return and render search results on the search page. This also involved working with the sarch view and applying the appropriate mustache tags there. 

After I had successfully rendered search results and was getting the correct data from the API call I began to work on saving, editing, and deleting items from my database. This took a good amount of re-work including multiple schema changes, but evenutally after enough console.logs I was able to get the data in and out of my database as I intended. 

Upon completion of adding all desired base functionality I started to style the pages, as I styled I came across certain bugs that needed to be fixed and I added additional npm packages to convert the dates/times of next episodes returned from the TV Maze API into a 12-hour DD-MM-YYYY format I desired. 

## Wireframes:
 
![img_1217](https://git.generalassemb.ly/storage/user/7638/files/d77a19ec-a875-11e7-94bf-3c7566992fce)

![img_1218](https://git.generalassemb.ly/storage/user/7638/files/d7f99cda-a875-11e7-9160-62bd54271d78)

## API:
Link: http://www.tvmaze.com/api

This is the TVMaze API. It is really cool and returns data in a JSON that contains information about the airdate/times, images, cast, IMDB rating, number of episodes, etc for thousands of shows. 

## "New" NPMs: 

convert-time:  https://www.npmjs.com/package/convert-time
This was used to convert time from API JSON from 24-hour clock to 12-hour clock.

date-format-lite:  https://www.npmjs.com/package/date-format-lite
This was used to convert dates from API JSON from YYYY-DD-MM format to MM-DD-YYYY format.

## Challenges:  
- Getting user authorization to work correctly given limited experience
- Project management - ensuring goals were met on-time
- Storing data from the API in a database so that users see all their saved shows when the login
- Implementing a search bar that returns all the results based on keyword

## Unsolved problems:  
- How to get all search results returned from the API call to render vs. just the top result. 
- How to create a view page that showed the top shows that were on tv that day and then allow the user to save the shows from that page. 
- Not saving every show that was searched for. Only when the show was clicked. 



