const Listing=require("../models/listing.js");
const initData=require("./data.js");
const mongoose=require("mongoose");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to DB.");
}).catch((err)=>{
    console.log(err);
});

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "680b53f0598351c1ba9cdc5c",
      image: {
          url: obj.image.url,
          filename: obj.image.filename
      }
  }));

  await Listing.insertMany(initData.data);
  console.log("Data inserted successfully.");
}


initDB();
