// // const faker = require('faker');
// const userSeeds = require('./userSeed.json');
// const thoughtSeeds = require('./thoughtSeed.json');
// const db = require('../config/connection');
// const { Thought, User } = require('../models');

// db.once('open', async () => {
//   try {
//     await Thought.deleteMany({});
//     await User.deleteMany({});

//     await User.create(userSeeds);

//     for (let i = 0; i < thoughtSeeds.length; i++) {
//       const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: thoughtAuthor },
//         {
//           $addToSet: {
//             thoughts: _id,
//           },
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   console.log('all done!');
//   process.exit(0);
// });

const db = require('../config/connection');
const { Retailer } = require('../models');

db.once('open', async () => {
  await Retailer.deleteMany();

  const retailers = await Retailer.insertMany([
    { name: 'Walmart', image: 'walmart.jpg' }, // potentially have an image as well
    { name: 'Zellers', image: 'zellers.jpg' },
    { name: 'Best Buy', image: 'best_buy.jpg' },
    { name: 'The Bay', image: 'the_bay.jpg' },
    { name: 'Food Basics', image: 'food_basics.jpg' },
    { name: 'NoFrills', image: 'nofrills.jpg' },
    { name: 'Freshco', image: 'freshco.jpg' },
  ]);

  console.log('retailers seeded');


  process.exit();
});