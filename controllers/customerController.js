const Customer = require('../models/customerModel');
const { catchAsync } = require('../middleware/catchAsync');
const AppError = require('../middleware/AppError');

exports.getAllCustomers = catchAsync(async (req, res) => {
  const customers = await Customer.find().sort('name');
  return res.status(200).json({
    status: 'success',
    data: {
      customers,
    },
  });
});

exports.createCustomer = catchAsync(async (req, res) => {
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
});

exports.getCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return next(new AppError('No customer found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
});
//comment
exports.deleteCustomer = catchAsync(async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return next(new AppError('No customer found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
});

exports.patchCustomer = catchAsync(async (req, res) => {
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
    return next(new AppError('No customer found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
});
