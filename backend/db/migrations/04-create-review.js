'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'Reviews',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                spotId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Spots',
                    },
                    onDelete: 'CASCADE',
                },
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Users',
                    },
                    onDelete: 'CASCADE',
                },
                review: {
                    type: Sequelize.STRING(1000),
                    allowNull: false,
                    unique: true,
                },
                stars: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
            },
            options,
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Reviews';
        return queryInterface.dropTable(options);
    },
};
