const incomeSchema = require("../model/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = incomeSchema({
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
    await income.save();
    res.status(200).json({ message: "income data saved" });
  } catch (error) {
    res.status(500).json({ message: "server Error from adding data " });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    //validations
    const incomes = await incomeSchema.find().sort({ createdAt: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "server Error " });
  }

  //   console.log(incomes);
};

exports.deleteIncomes = async (req, res) => {
  const { id } = req.params;
  incomeSchema
    .findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "income deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "server Error" });
    });
};
