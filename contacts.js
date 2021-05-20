const path = require("path");
const fs = require("fs");

const shortid = require("shortid");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    await fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;

      const contacts = JSON.parse(data);
      console.table(contacts);
    });
  } catch (error) {
    console.log(error.message);
  }
}
  
async function getContactById(contactId) {
  try {
    await fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;

      const contacts = JSON.parse(data);
      const findElement = contacts.find(
        (el) => el.id.toString() === contactId.toString()
      );
      console.table(findElement);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function changeCurrentArray(filePath, newArray) {
  fs.writeFile(filePath, JSON.stringify(newArray), (error) => {
    if (error) {
      console.log(error.message);
      return;
    }
  });
}
  
async function removeContact(contactId) {
  try {
    await fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;

      const contacts = JSON.parse(data);
      const updateContacts = contacts.filter(el => el.id.toString() !== contactId.toString());

      changeCurrentArray(contactsPath, updateContacts);
      console.table(updateContacts);
    });
  } catch (error) {
    console.log(error.message);
  }
};
  
async function addContact(name, email, phone) {
  try {
    await fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
      if (err) throw err;

      const contacts = JSON.parse(data);
      const contactNew = {id: shortid.generate(), name, email, phone };
      const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t');
      const parsedContactsList = JSON.parse(contactsList);

      changeCurrentArray(contactsPath, parsedContactsList);
      
      console.table(contactNew);
      console.log('Contact successfully added!');
    });
  } catch (error) {
    console.log(error.message);
  };
};

module.exports = {listContacts, getContactById, removeContact, addContact};