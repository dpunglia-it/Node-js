const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mydb", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
  port:"5432"
});

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
}); 

(async () => {
  try 
  {
    await sequelize.authenticate();             //Connection
    console.log("DB Connected");

    await sequelize.sync();                     //Create table
    console.log("Table Created");
    
    const user = await User.create({            // Insert data
      name: "Darshit",
      email: "darshit@gmail.com",
    });
    console.log("User inserted:", user.toJSON());
  } 
  catch (err) {
    console.error("Error:", err);
  }
})();
