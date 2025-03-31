'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await SpotImage.bulkCreate(
            [
                {
                    spotId: 1,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/newyork1.jpg',
                    preview: true,
                },
                {
                    spotId: 1,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/newyork2.jpg',
                    preview: false,
                },
                {
                    spotId: 1,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/newyork3.jpg',
                    preview: false,
                },
                {
                    spotId: 1,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/newyork4.jpeg',
                    preview: false,
                },
                {
                    spotId: 1,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/newyork5.jpeg',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/losangles1.jpg',
                    preview: true,
                },
                {
                    spotId: 2,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/losangles2.jpg',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/losangles3.jpg',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/losangeles4.jpeg',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/losangeles5.jpeg',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/chicago1111.webp',
                    preview: true,
                },
                {
                    spotId: 3,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/exrta1.jpeg',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/chiago2.jpg',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/chicago4.jpeg',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travellyimages.s3.us-east-2.amazonaws.com/extra.jpeg',
                    preview: false,
                },
            ],
            { validate: true },
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'SpotImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                spotId: { [Op.in]: [1, 2, 3] },
            },
            {},
        );
    },
};
