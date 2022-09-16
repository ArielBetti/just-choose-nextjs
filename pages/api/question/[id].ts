import dbConnect from "../../../lib/dbConnect";
import QuestionModel from "../../../models/Question";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Question = QuestionModel as any;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const question = await Question.findById(id);
        if (!question) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, question });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const findQuestion = await Question.findById(id);

        const question = await Question.findByIdAndUpdate(
          id,
          { answers: findQuestion.answers ? findQuestion.answers + 1 : 1 },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!question) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, question });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedQuestion = await Question.deleteOne({ _id: id });
        if (!deletedQuestion) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
