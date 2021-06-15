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

#### Order Cards
![Order cards](https://res.cloudinary.com/cheffie/image/upload/v1623774746/Screenshot_2021-06-15_122042_zmzx2q.png)

The items ordered by customers get displayed as cards for the chef. Cards contain each item ordered, the course they should be served in, the user who ordered them, any user notes, and the time they were ordered. The chef can delete orders as they see fit.

#### Shopping List 
![Shopping list](https://res.cloudinary.com/cheffie/image/upload/v1623774895/shopping_list_kj1xun.png)

The shopping list automatically gets a count of all ordered items and lists the ingredients that the chef has entered. The chef has the freedom to choose how they enter their ingredients and only the chef is able to see them. Every chef's recipie book looks different and doing it this way ensure they will have all the information they need to provide the best dishes.

#### Add Item Form
![Shopping list](https://res.cloudinary.com/cheffie/image/upload/v1623775121/additem_u6fca3.png)

Simple form to add item. Communicates with an item schema and controller to create menu items. Items can be uploaded with or without an image, other fields are required.

### As a chefs customer


<!-- Restaurant quality food delivered right to your door -->
