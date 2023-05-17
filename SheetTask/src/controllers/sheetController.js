export const addUser = async (req, res, next) => {
  try {
    const { data, unique } = req.body;
    if (!data || !unique)
      return res.status(400).send({ message: "Some Body Params are missing" });
    if (data.length === 1) return res.send({ message: "Valid Data" });
    for (let i = 0; i < unique.length; i++) {
      const result = checkUniqueProperty(unique[i], data);
      if (result) return res.status(200).send({ message: result });
    }
    return res.send({ message: "Valid Data" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: error.message });
  }
};

const checkUniqueProperty = (property, data) => {
  const resultData = [];
  for (let i = 0; i < data.length; i++) {
    const checkUser = data[i];
    const isUnique = resultData.find((user) => {
      if (
        user[property] === checkUser[property] &&
        user["sheetName"] === checkUser["sheetName"]
      )
        return user;
    });
    console.log("isUnique", isUnique);
    if (isUnique) return "Not Valid";
    resultData.push(checkUser);
  }
};
