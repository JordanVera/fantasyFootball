const CoinqvestClient = require('coinqvest-merchant-sdk');
const dotenv = require('dotenv');
const chalk = require('chalk');
const User = require('../models/userModel');

require('crypto');

dotenv.config();

const updateUserBullets = async (userId, quantity) => {
  const query = { customerId: userId };
  const mongooseUser = await User.findOne(query);
  const update = { bullets: (mongooseUser.bullets += parseInt(quantity, 10)) };

  await User.findOneAndUpdate(query, update, { new: true });
};

function bulletsRepo() {
  const client = new CoinqvestClient(process.env.PUBLIC, process.env.PRIVATE);

  async function testAuth(req, res) {
    const response = await client.get('/auth-test', null);

    return res.json({ status: response.status, data: response.data, client });
  }

  // This controller gets used in userController in postRegister controller
  // when a user signs up it creates a customer in COIMQVEST api
  async function createCustomer(customerObj) {
    try {
      const response = await client.post('/customer', customerObj);

      console.log(response.status);
      console.log(response.data);

      if (response.status !== 200) {
        console.log('Could not create customer. Inspect above log entry.');
        throw new Error('Could not create customer');
      }

      const { customerId } = response.data;
      return customerId;
    } catch (error) {
      console.error('Error creating customer:', error.message);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async function buyBullet(req, res, next) {
    // console.log('req.user');
    // console.log(req.user);

    const chargeObj = {
      charge: {
        customerId: req.user.customerId,
        currency: 'USD',
        lineItems: [
          {
            description: 'NFL Last Longer Entry',
            netAmount: process.env.BUYIN,
            quantity: req.body.bulletCount,
          },
        ],
      },
      // webhook: `${process.env.WEBHOOK}/bullets/hook`,
      links: {
        returnUrl: `http://127.0.0.1:5173/dashboard`,
        cancelUrl: `http://127.0.0.1:5173/dashboard`,
      },
      pageSettings: {
        displaySellerInfo: false,
        shopName: 'NFL Last Longer',
      },
      settlementCurrency: 'USD',
    };

    try {
      const response = await client.post('/checkout/hosted', chargeObj);

      console.log(response.status);
      console.log(response.data);

      if (response.status !== 200) {
        console.log('Could not create checkout.');
        return;
      }

      // the checkout was created
      // response.data now contains an object as specified in the success response here: https://www.coinqvest.com/en/api-docs#post-checkout
      const { checkoutId } = response.data; // store this persistently in your database
      const { url } = response.data; // redirect your customer to this URL to complete the payment

      return res.json({ data: response.data });
    } catch (error) {
      console.log(error);

      res.json({ error });
    }
  }

  function hook(req, res, next) {
    console.log(chalk.greenBright('COINQVEST WEBHOOK REQ.BODY'));
    console.log(req.body);

    switch (req.body.eventType) {
      case 'CHECKOUT_COMPLETED':
        const { payload } = req.body.data.checkout;
        const { customerId } = payload.charge;
        const { quantity } = payload.charge.lineItems[0];

        updateUserBullets(customerId, quantity);
        break;
      case 'UNDERPAID_ACCEPTED':
        const customerIdX = req.body.data.checkout.payload.charge.customerId;
        const quantityX =
          req.body.data.checkout.payload.charge.lineItems[0].quantity;

        updateUserBullets(customerIdX, quantityX);
        break;
      case 'REFUND_COMPLETED':
        console.log(chalk.greenBright('REFUND_COMPLETED'));

        break;
      case 'CHECKOUT_UNDERPAID':
        console.log(chalk.redBright('CHECKOUT_UNDERPAID'));

        break;
    }

    return res.sendStatus(200);
  }

  return { testAuth, createCustomer, buyBullet, hook };
}

module.exports = bulletsRepo();
