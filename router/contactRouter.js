const express=require('express')
const contactRouter=express.Router();
const {getContacts,deleteContact,createContact,getOneContacts,updateContact,getAllContacts}=require('../controller/controller')

contactRouter.route('/').get(getContacts);
contactRouter.route('/all').get(getAllContacts);
contactRouter.route('/:id').get(getOneContacts);
contactRouter.route('/:id').delete(deleteContact);
contactRouter.route('/:id').put(updateContact);
contactRouter.route('/').post(createContact);

module.exports=contactRouter;