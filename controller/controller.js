const asyncHandler = require("express-async-handler");
const connection = require('../config/dbConnection');
const upload = require('../middleWare/multer');
const multer = require('multer');
// Sample route

// Perform a database query
const getContacts = asyncHandler(async (req, res) => {
    const currentPage = req.query.page || 1;
    const searchQuery = req.query.search || '';
    const skip = (currentPage - 1) * (req.query.limit || 5);
    console.log(currentPage)
    await connection.query(`SELECT * FROM contactlist  WHERE firstName LIKE '%${searchQuery}%' LIMIT ${skip},${req.query.limit||5}`, (queryErr, results) => {
        if (queryErr) {
            console.error('Error executing query: ' + queryErr.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the query results as a response
        res.json(results);
    })
})
const getAllContacts = asyncHandler(async (req, res) => {
    await connection.query(`SELECT * FROM contactlist `, (queryErr, results) => {
        if (queryErr) {
            console.error('Error executing query: ' + queryErr.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the query results as a response
        res.json(results);
    })
})


const getOneContacts = asyncHandler(async (req, res) => {
    console.log("req.params.id==", req.params.id);
    await connection.query(`SELECT * FROM contactlist WHERE id='${req.params.id}'`, (queryErr, results) => {
        if (queryErr) {
            console.error('Error executing query: ' + queryErr.stack);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Send the query results as a response
        res.json(results);
    })
})


const deleteContact = asyncHandler(async (req, res) => {
    await connection.query(`DELETE  FROM contactlist WHERE  id='${req.params.id}'`, (queryErr, results) => {
        if (queryErr) {
            console.error('Error executing query: ' + queryErr.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    })
})

const createContact = asyncHandler(async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ message: "img upload error" });
        }else{
            console.log("requst body:", req.body);
    const { email, phonenumber, firstName, lastName } = req.body;
    const imagepath = req.file ? req.file.path : null;
    if (
        !phonenumber ||
        !firstName ||
        !lastName ||
        !email ||!imagepath
        ) {
        res.status(400);
        throw new Error("All fields are mandatory");
      }
    console.log("image path",imagepath);
    await connection.query('INSERT INTO contactlist ( email, phonenumber,firstName,lastName,imagepath) VALUES (?, ?, ?,?,?)',
        [email, phonenumber, firstName, lastName, imagepath], (queryErr, results) => {
            if (queryErr) {
                console.error('Error executing query: ' + queryErr.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(results);
        });
    }
    })
});


const updateContact = asyncHandler(async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ message: "img upload error" });
        }else{
    console.log("requst body:", req.body);
    const { email, phonenumber, firstName, lastName } = req.body;
    const imagepath = req.file ? req.file.path : null;
    await connection.query(`UPDATE contactlist SET email='${email}',phonenumber='${phonenumber}',firstName='${firstName}',lastName='${lastName}',imagepath='${imagepath}' WHERE id='${req.params.id}'`, (queryErr, results) => {
        if (queryErr) {
            console.error('Error executing query: ' + queryErr.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
}
    })
})
module.exports = { getContacts, deleteContact, createContact, getOneContacts, updateContact,getAllContacts }