export default (sequelize, DataTypes) => {
	const category = sequelize.define('category', {
			id : {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'category',
			timestamps: false,
			paranoid: true,
			indexes: [
				{
					name: 'PK__category__3214EC0702DC6380',
					unique: true,
					fields: [{ name: 'Id' }],
				},
			],
		},
	);

	return category;
};
