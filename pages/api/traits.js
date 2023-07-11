// pages/api/traits.js
import { getTrait } from './getTrait'; // Adjust the file path as needed

export default async function handler(req, res) {
  const traits = await getTrait();
  res.status(200).json(traits);
}
