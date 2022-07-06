module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      surname: String,
      name: String,
      phone: String,
      personal_email: String,
      password: String,
      repassword: String,
      avatar: String,
      policy: String
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Client = mongoose.model("client", schema);
  return Client;
};