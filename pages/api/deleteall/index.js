import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = req.query;

  // const response =
  await db.collection("coming_flights").deleteMany(data);
  await db.collection("going_flights").deleteMany(data);

  res.json({ msg: "All posts has been deleted" });
}
