import amqp from "amqplib";

async function sendEmail() {
    try{
       const connection = await amqp.connect("amqp://127.0.0.1");
       const channel = await connection.createChannel();
       const exchange = "mail_exchange";
       const routingKey = "KEY";

       const message = {
        to : "dev12@gmail.com",
        from : "dp@gmail.com",
        sub : "Test rabbitMQ",
        body : "Implemented"
       }

       await channel.assertExchange(exchange,"direct",{durable: false});
       await channel.assertQueue("mail_queue", {durable: false});

       await channel.bindQueue("mail_queue",exchange,routingKey);
       channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)));

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