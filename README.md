# news-explorer-api

Version 0.0.2

## About project:
This is a REST API for News Explorer project, which enables its users to search for interesting news and save them in a user's personal account area.

Server public IP: 84.201.167.0

Domain: https://api.news4u.xyz and http://api.news4u.xyz

<img src="./images/label.jpg" alt="News Explorer main page with a search engine empty space line" width="100%"/>

## Technologies used:
ES6, OOP, Node.js, Express, MongoDB, celebrate, Joi


## Launch instructions:
- Download this repository __'git clone'__
- Install all required dependancies __'npm i'__
- To test API you will need to install __Postman__


## Main functionality and routes used in API:

__Users__:

- /signup - POST request creates new user (to create a valid req.body please refer to ./models/user.js_)
- /signin - POST request enables the user's authorization and saves a newly generated token to cookie.
- /users/me - GET request sends the user's credentials

__Articles__:

- /articles - POST request creates a new article saving it to the user personal account page (to create a valid req.body please refer to ./models/article.js_). 
- /articles - GET request return a full list of the articles saved by the user.
- /articles/:articleId - DELETE request enables the authorized user to remove the article with the Id, specified in params.
