import { createHash } from 'crypto';

let controller = {} ; 

controller.create = (req, res) => {
    // initialize the player here and send the init pack
    console.log(req.query); 
    // save player details to db here or temporarty map

    let t = new Date().getTime().toString(); 
    let playerId = createHash('md5').update(t).digest("hex");
    res.status(200).json({id: playerId, name: req.query.name, color: req.query.color});

}

export default controller;
