const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
});
const customerSchema = new mongoose.Schema({
  name: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});
// Pre middleware functions
/* customerSchema.pre("findOneAndDelete", async () => {
  console.log("pre middleware function");
}); */
// Post middleware functions
customerSchema.post("findOneAndDelete", async (customer) => {
  // console.log("post middleware function");
  console.log("Post middleware", customer);
  if (customer.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
  let cust1 = new Customer({
    name: "Rahul Kumar",
  });
  let order1 = await Order.findOne({ item: "chips" });
  let order2 = await Order.findOne({ item: "chocolate" });

  cust1.orders.push(order1);
  cust1.orders.push(order2);

  let result = await cust1.save();
  console.log(result);
};

// addCustomer();

/* const addOrders = async () => {
  let res = await Order.insertMany([
    { item: "somasa", price: 5 },
    { item: "chips", price: 10 },
    { item: "chocolate", price: 20 },
  ]);
  console.log(res);
}; */

// addOrders();

//populate concept
const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};
// findCustomer();

//add both customer and orders

const addCust = async () => {
  let newCustomer = new Customer({
    name: "Karan Arjun",
  });
  let newOrder = new Order({
    item: "paobhaji",
    price: 200,
  });
  let order2 = await Order.findOne({ item: "pizza" });
  newCustomer.orders.push(newOrder);
  newCustomer.orders.push(order2);

  await newOrder.save();
  await newCustomer.save();
};

// addCust()

//Delete customer and order also with the help of post mongoose middleware
const delCust = async () => {
  let data = await Customer.findByIdAndDelete("6649c1005585764b15586c36");
  console.log("deletedData", data);
};
delCust();
