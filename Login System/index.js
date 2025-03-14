import expres from "express";
import dotenv from "dotenv";
import basicAuth from "express-basic-auth";

const app = express();

app.use(
  basicAuth({
    users: { username: "", passowrd: "" },
    challange: true,
    unauthorizedResponse:
      "Unauthorized access.Please provide valid credentials",
  })
);

app.get("/secure-data", (req, res) => {
  res.send("This is a secure data");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
