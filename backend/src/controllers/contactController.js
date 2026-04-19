const prisma = require("../config/prismaClient");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await prisma.contact.create({
      data: { name, email, message },
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};