import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Por favor digite sua pergunta"],
    maxlength: [70, "Name cannot be more than 60 characters"],
  },
  answers: {
    type: Number,
  },
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
