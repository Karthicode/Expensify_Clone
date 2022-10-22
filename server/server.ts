import app from "./api/app";

require("dotenv").config();

const port = process.env.PORT;

app.listen(port, () => console.log(`backend server listening on port ${port}`));
