import express from 'express' ; 
import controller from './user.controller';

let router = express.Router();

router.get('/', controller.create);

export default router ; 