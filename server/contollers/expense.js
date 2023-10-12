const expenseSchema = require("../model/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = expenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ error: "Amount must be a positive number" });
    }

    // savingt his instance in the database
    await expense.save();
    res.status(200).json({ message: "expense data saved" });
  } catch (error) {
    res.status(500).json({ message: "server Error from adding data " });
  }

  console.log(expense);
};

exports.getExpenses = async (req, res) => {
  try {
    //validations
    const expenses = await expenseSchema.find().sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "server Error " });
  }

  //   console.log(expenses);
};

exports.deleteExpenses = async (req, res) => {
  const { id } = req.params;
  expenseSchema
    .findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "expense deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "server Error" });
    });
};
