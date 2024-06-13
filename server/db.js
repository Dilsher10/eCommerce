const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nexentisU:DmK5UiBrDHQ8rUuq@nexentis-cluster.0z4xmv6.mongodb.net/nexentisDB?retryWrites=true&w=majority')
.then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
    console.log(err);
})