import amqp from "amqplib";

async function sendEmail() {
    try{
       const connection = await amqp.connect("amqp://127.0.0.1");
       const channel = await connection.createChannel();
       const exchange = "mail_exchange";
       const routingKeyPremium = "Premium";
       const routingKeyNormal = "Normal";
       // const routingKey = "KEY";

       const message = {
        to : "prod12@gmail.com",
        from : "dp@gmail.com",
        sub : "Test rabbitMQ",
        body : "Implemented"
       }

       
      // await channel.assertQueue("mail_queue", {durable: false});

       await channel.assertExchange(exchange,"direct",{durable: false});

       await channel.assertQueue("Premium_user_queue", {durable : false});
       await channel.assertQueue("Normal_user_queue",{durable : false});

       await channel.bindQueue("Premium_user_queue",exchange,routingKeyPremium);
       await channel.bindQueue("Normal_user_queue",exchange,routingKeyNormal); 
      // await channel.bindQueue("mail_queue",exchange,routingKey);

       channel.publish(exchange,routingKeyPremium,Buffer.from(JSON.stringify(message)));
       // channel.publish(exchange,routingKeyNormal,Buffer.from(JSON.stringify(message)));
       // channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)));

       console.log("Email Sent: ",message);

       setTimeout(() => {
        connection.close();
       }, 500);
    }
    catch(err){
        console.log(err)
    }
};

sendEmail();