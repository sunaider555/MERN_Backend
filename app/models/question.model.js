module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      email: String,
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
  const Question = mongoose.model("question", schema);
  return Question;
};