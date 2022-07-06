module.exports = mongoose => {
  var schema = mongoose.Schema(
    {      
      // type: Int32,
      type: Number,   //0: Personal Service, 1: Company Service
      logo_url : String,
      company_id: Number,
      image_url: String,
      title: String,
      content: String,
      free_content: String,
      category_id: Number    
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Service = mongoose.model("service", schema);
  return Service;
};