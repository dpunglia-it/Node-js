import amqp from "amqplib";

async function receiveMail(){
  try{
    const connection = await amqp.connect("amqp://127.0.0.1");
    const channel = await connection.createChannel();

    await channel.assertQueue("Normal_user_queue",{durable:false});

    channel.consume("Normal_user_queue", (message) => {
        if(message!=null)
        {
            console.log("Mail Recieved for Normal User: ", JSON.parse(message.content));
            channel.ack(message);
        }
    })
  } 
  catch(err){
    console.log(err);
  } 
};

receiveMail();