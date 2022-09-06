'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
	  await queryInterface.bulkInsert('category', [{
		  id: 1,
		  name: 'ERP Teknisa',
	  }, {
		  id: 2,
		  name: 'ERP Teknisa',
	  }
	  ], {
			ignoreDuplicates: true,
		});
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('category', null, {});
  }
};
