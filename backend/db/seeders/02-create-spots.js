'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await Spot.bulkCreate(
            [
                {
                    ownerId: 1,
                    address: '123 Pencil Ln',
                    city: 'New York City',
                    state: 'New York',
                    country: 'United States',
                    lat: 40.7128,
                    lng: -74.006,
                    name: 'Luxury Penthouse',
                    description: '5 Bedroom Penthouse with a view of the city skyline. PARTIES ARE NOT ALLOWED! ',
                    price: 100,
                },
                {
                    ownerId: 2,
                    address: '371 Main St',
                    city: 'Los Angeles',
                    state: 'California',
                    country: 'United States',
                    lat: 34.0522,
                    lng: -118.2437,
                    name: 'Downtown Loft',
                    description:
                        'Fully furnished/ heated pool/ community center / willing to accept parties upon request. Cleaning fee will be required if anything breaks',
                    price: 130,
                },
                {
                    ownerId: 3,
                    address: '1293 West Ave',
                    city: 'Chicago',
                    state: 'Illinois',
                    country: 'United States',
                    lat: 10.7128,
                    lng: -60.006,
                    name: 'Private Loft',
                    description:
                        'We have six individual private rooms and baths with a large common area, full kitchen and art gallery.Centrally located Chicago is a go- to district with a lively night scene, and a wide variety of restaurants, bars and clubs.',
                    price: 200,
                },
            ],
            { validate: true },
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                name: { [Op.in]: ['Spot 1', 'Spot 2', 'Spot 3'] },
            },
            {},
        );
    },
};
