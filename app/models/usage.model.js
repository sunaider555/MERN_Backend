module.exports = mongoose => {
  var schema = mongoose.Schema(
    {      
      title: String,
      content: String,
     
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Usage = mongoose.model("usage", schema);
  return Usage;
};