const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort('name');
    return res.status(200).json({
      status: 'success',
      data: {
        customers,
      },
    });
  } catch (error) {
    console.error('Error fetching customers from the database', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createCustomer = async (req, res) => {
  try {
    let customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    });
    customer = await customer.save();
    return res.status(200).json({
      status: 'success',
      data: {
        customer,
      },
    });
  } catch (err) {
    console.error('Error creating customer', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
};

exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
};

exports.patchCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isgold,
        phone: req.body.phone,
      },
      { new: true }
    );
    if (!customer)
      return res
        .status(404)
        .send('The customer with the given id was not found!');
    return res.status(200).json({
      status: 'success',
      data: {
        customer,
      },
    });
  } catch (err) {
    console.error('Error updating customer', err);
  }
};
