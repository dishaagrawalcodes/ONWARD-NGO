const prisma = require("../config/prismaClient");

exports.createVolunteer = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const volunteer = await prisma.volunteer.create({
      data: { name, email, message },
    });

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};