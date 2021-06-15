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
![Add item](https://res.cloudinary.com/cheffie/image/upload/v1623775121/additem_u6fca3.png)

Simple form to add item. Communicates with an model (item schema) and controller to create menu items. Items can be uploaded with or without an image, other fields are required.

### As a chefs customer

#### Menu
![Menu](https://res.cloudinary.com/cheffie/image/upload/v1623775447/menu_gvp1bz.png)

This page is available to chefs and customers, and only the chef has the delete button and the ability to delete items
All items can be uploaded with or without images, the items are sorted by the course that they have been set to. At the time of writing the courses are: Starter, Main, Side-dish and Dessert. If the chef was to have a full menu and add a starter it would appear with the rest of the starters for example.

#### Confirming your order
![Confirm](https://res.cloudinary.com/cheffie/image/upload/v1623775691/confirm_o36eer.png)

After toggling the selected items, which highlights them on the menu, and hitting submit the user is brought to a confirmation page, where they can add notes. Hitting "Looks good" here will create an order object by communicating with a controller and a model (order schema). This stores the item ids from the database in an array in an orders object. Later when parsing the data for the chef those item ids are searched for and replaced with the items they represent, creating a relation between database collections.

After placing an order the user can view all current orders they have and delete any they would like. 

### Additions on the way
I will be updating the schema for the menu items and adding an isActive property that the chef can toggle. Currently the chef must delete the item from the database so it won't be shown on the menu, which is effective but inefficient. If they want to reuse a menu item they will have to renter it fully, however some user error is removed with the current implementation.

CSS needs an overhaul, or possible refactoring into react.

Possible Reset button which would remove all menu items and orders, which would be useful to start a new week, but possibly bad if the chef changes their mind, or doesn't complete an order. 

## Thanks for reading
[LinkedIn](https://www.linkedin.com/in/michaelizaguirrewebdev/)!


<!-- Restaurant quality food delivered right to your door -->
