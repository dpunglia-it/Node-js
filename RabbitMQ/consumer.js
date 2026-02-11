import amqp from "amqplib";

async function receiveMail(){
  try{
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();

    await channel.assertQueue("mail_queue",{durable:false});

    channel.consume("mail_queue", (message) => {
        if(message!=null)
        {
            console.log("Mail Recieved: ", JSON.parse(message.content));
            channel.ack(message);
        }
    })
  } 
  catch(err){
    console.log(err);
  } 
};

receiveMail();