# Amazon Clone Project

You're building out an Amazon Clone. The features you're implementing include:

* Ability to show all items for sale
* Ability to add certain items to your shopping cart
* Ability to checkout the items
* Ability to submit the order

---

## What's given to you

You're given a rails backend to start with. The rails backend includes a scaffold for `Items` which includes a name, price, quantity, description and url.

You're also given the `Order` resource. This includes a person (who is making the purchase) and a cost.

To get this working use the following commands

```
bundle install
bundle exec rake db:create db:migrate db:seed
bundle exec rails server
```

---

## Your task

You're building out the frontend for this project on your own. You do not want to use any of the scaffolded Rails views. You want a single page application with Rails acting only as an API.

You do not need to worry about User Authentication.

Start by displaying all of the items cleanly. You should have an angular app that makes an AJAX request to get all of the items. Have the ability to add an item to your shopping cart. You should be able to add multiple items and multiple of each item.

You should not be able to add more items than how many are available. Your page should update how many items are remaining in quantity.

---

You should have a checkout button that takes you to another angular route. In this route, you should show the summary of what they're buying along with the total cost associated. You should ask for their name in a text input field, and allow them to submit the order.

When they submit the order you should create a new `Order` in the backend and update the quantity remaining for each of the items.

---

## Extensions

* Add an Angular View for looking at all past orders
* After someone checks out, you can see a summary of all past orders (cost)
* After you checkout, you should go to a view where you can see all items you've bought ever. (This will require heavy lifting on the backend too).
