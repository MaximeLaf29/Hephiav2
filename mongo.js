const mongoose = require("mongoose")

module.exports = async (URL) => {
  mongoose.set("strictQuery", true)
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return mongoose
}
