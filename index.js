const express = require('express');
const dotenv = require('dotenv').config();
const contactRouter=require('./router/contactRouter')
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
const port = process.env.PORT;
const cors=require('cors');
app.use(cors());
// app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join()));
// app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use('/contacts',contactRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
