import path from "path";

import * as helper from "../utils/helper.js";

export const createEmployee = async (req, res) => {
  try {
    const { empJoiningDate, empDepartment, empEmail, empName, fileName } =
      req.body;
    if (!empDepartment || !empEmail || !empJoiningDate || !empName)
      return res.status(400).send({ message: "Some Body params are missing" });
    const dbData = await helper.getDbData();
    const newEmployee = dbData.find(
      (employee) => employee.empEmail === empEmail
    );
    if (newEmployee)
      return res.status(409).send({ message: "Employee already exists" });
    const empId = await helper.generateId();
    const empProfile = path.join(
      path.resolve() + `/public/profile-pics/${fileName}`
    );
    dbData.push({
      empDepartment,
      empEmail,
      empJoiningDate,
      empName,
      empId,
      empProfile,
    });
    await helper.writeDataInDb(dbData);
    res.status(200).send({ message: "Employee created Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateEmployeeById = async (req, res) => {
  try {
    const {
      empJoiningDate,
      empDepartment,
      empEmail,
      empName,
      fileName,
      newEmpEmail,
    } = req.body;

    if (!empEmail)
      return res.status(400).send({ message: "empEmail not found" });
    if (!empDepartment && !empJoiningDate && !empName && !newEmpEmail)
      return res.status(400).send({ message: "Body params are not valid" });
    const dbData = await helper.getDbData();
    const isEmailExist = dbData.find(
      (employee) => employee.empEmail === empEmail
    );
    if (!isEmailExist)
      return res.status(404).send({ message: "Employee not found" });
    let empProfile;
    if (fileName)
      empProfile = path.join(
        path.resolve() + `/public/profile-pics/${fileName}`
      );
    dbData.find((employee) => {
      if (employee.empEmail === empEmail) {
        employee.empDepartment = empDepartment
          ? empDepartment
          : employee.empDepartment;
        employee.empEmail = newEmpEmail ? newEmpEmail : employee.empEmail;
        employee.empJoiningDate = empJoiningDate
          ? empJoiningDate
          : employee.empJoiningDate;
        employee.empName = empName ? empName : employee.empName;
        employee.empProfile = empProfile ? empProfile : employee.empProfile;
      }
    });
    await helper.writeDataInDb(dbData);
    res.status(200).send({ message: "Employee updated Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { empId } = req.params;
    const dbData = await helper.getDbData();
    const empData = dbData.find((employee) => employee.empId === +empId);
    if (!empData)
      return res.status(409).send({ message: "Employee not found" });
    res.send({ data: empData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getAllEmployee = async (req, res) => {
  try {
    const dbData = await helper.getDbData();
    if (dbData.length === 0)
      return res.status(200).send({ message: "No Employee Found" });
    return res.status(200).send({ data: dbData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteEmployeeById = async (req, res) => {
  try {
    const { empEmail } = req.body;
    let dbData = await helper.getDbData();
    const isEmailExist = dbData.find(
      (employee) => employee.empEmail === empEmail
    );
    if (!isEmailExist)
      return res.status(404).send({ message: "Employee not found" });
    dbData = dbData.filter((employee) => employee.empEmail !== empEmail);
    await helper.writeDataInDb(dbData);
    return res.status(200).send({ message: "Employee Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
