# Cheffie- Bringing restaurant quality food right to you door.

Check it out live on Heroku [Cheffie](https://cheffie.herokuapp.com/)!

### Demo Accounts
- username: cust@cust.com
- password: 12345678

This is a customer account most functionality is designed for the chef which I will show in the walkthrough section below. 

During the pandemic I while learning programming, I worked as a private chef. In that time I was sharing menus for the family I worked for over google docs.
I wanted to create a UI for a chef to upload their menu with photos and  ingredients list for their customer to choose from. Once a customer places an order the chef
will get an updated shopping list consisting of all ordered menu items with a current count and the ingredients that the chef has provided.
If I had this web application when I was working it would of made my life much easier which was the driving force behind this project.

## Tech Stack
MongoDB with mongoose

Express

Node.js

HTML5 CSS3 Bootstrap and EJS

Authentication with Passport

Multer for file uploads and Cloudinary for storage

## Walkthrough of the app.
### As a chef
The chef can find all of the things they need on the chef dashboard, which only displays to the user if they have the isAdmin property on their DataBase user object.
#### Order cards
![Order cards](<blockquote class="imgur-embed-pub" lang="en" data-id="a/4OfLKLt" data-context="false" ><a href="//imgur.com/a/4OfLKLt"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>)
The items ordered by customers get displayed as cards for the chef. Cards contain each item ordered, the course they should be served in, the user who ordered them, any user notes, and the time they where ordered.

####



<!-- Restaurant quality food delivered right to your door -->
