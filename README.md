# new-cheffie

// models singular
// routes controllers one time
// html structure from the server side data sent (order.itemIds)

const item = await Items.findById({ \_id: req.params.id });
await Items.remove(item);
console.log(`Item ${item} removed`);
res.redirect("back");
