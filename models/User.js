const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User model
class User extends Model { }

// define table columns and configuration
User.init(
    {
        //table column definitions go here
        id: {
            // use the special sequelize datatype object provided what type of data it is
            type: DataTypes.INTEGER,

            // this is the equivalent of sql's `NOT NULL` option
            allowNull: false,

            //instruct that this is the primary key
            primaryKey: true,

            //turn on auto increment
            autoIncrement: true
        },

        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,

            //if allownull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
    //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        //Table config option go here (https://sequelize.org/v5/manual/models-definition.html#configuration)

        //pass in our imported sequelize connection (the direct connection to our database) sequelize,
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields 
        timestamps: false,

        //don't pluralize name of database table
        freezeTableName: true,

        //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,

        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;