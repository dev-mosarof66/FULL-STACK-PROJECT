import "dotenv/config";

import app from "./app.js";
import connectDB from "./db/database.js";

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
  });
});
