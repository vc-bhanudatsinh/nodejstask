/**
 * @function addUser - API controller to handle the req and res
 * @param {json} req
 * @param {json} res
 * @param {function} next
 * @returns {void}
 */

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
    res.status(500).send({ message: error.message });
  }
};

/**
 *
 * @param {string} property - unique property to check
 * @param {array} data - Array of json data from request
 * @returns {string | void} - returns string if there is invalid data else nothing
 */

const checkUniqueProperty = (property, data) => {
  const resultData = [];
  for (let i = 0; i < data.length; i++) {
    const checkUser = data[i];
    const isDuplicate = resultData.find((user) => {
      if (
        user[property] === checkUser[property] &&
        user["sheetName"] === checkUser["sheetName"]
      )
        return user;
    });
    if (isDuplicate) return "Not Valid";
    resultData.push(checkUser);
  }
};
