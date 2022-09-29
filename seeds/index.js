const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
//    useCreateIndex: true,
    useUnifiedTopology: true  
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0 ; i < 300 ; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const priceRand = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:"62fd38290cfa4880e3dc16a4",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                    {
                      url: 'https://res.cloudinary.com/dxfgmmkfy/image/upload/v1660874175/YelpCamp/jynyhcxkuvghieanci2q.jpg',
                      filename: 'YelpCamp/jynyhcxkuvghieanci2q',
                    },
                    {
                      url: 'https://res.cloudinary.com/dxfgmmkfy/image/upload/v1660874177/YelpCamp/sc2ssoquqbamlgn4ktg4.jpg',
                      filename: 'YelpCamp/sc2ssoquqbamlgn4ktg4',
                    }
                  ],
            description: "Choose me!",
            price: priceRand
        })
        await camp.save();
    }

}

seedDB().then( () => {
    mongoose.connection.close();
})
