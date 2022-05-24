const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const imageSchema = new Schema(
  {
    owner: { 
      type: Schema.Types.ObjectId,
    ref: 'User'
  },
    
    title: String, 
    imgURL: String
  },
  {
    timestamps: true,
  }
)

const Image = model("Image", imageSchema);

module.exports = Image;
