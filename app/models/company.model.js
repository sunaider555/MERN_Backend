module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: Number,     //0:利用企業一覧  1: 掲載元企業一覧
      company_name: String,
      company_email: String,
      personal_email: String,
      phone_num: String
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Company = mongoose.model("company", schema);
  return Company;
};