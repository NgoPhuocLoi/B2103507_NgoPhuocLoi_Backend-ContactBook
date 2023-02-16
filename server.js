const app = require("./app");
const config = require("./app.config");

const PORT = config.app.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
