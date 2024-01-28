import category from "../model/category.js";
export const createCategory = async (req, res) => {
  const newCat = new category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    return res.status(400).json(error);
  }
};

