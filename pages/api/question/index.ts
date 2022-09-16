import dbConnect from "../../../lib/dbConnect";
import QuestionModel from "../../../models/Question";

export default async function handler(req, res) {
  const { method } = req;

  const Question = QuestionModel as any;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const questions = await Question.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, questions });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const question = await Question.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).send({ success: true, question });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
