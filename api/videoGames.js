const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        //By calling getAllVideoGames we got response and send the reponse
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
        //error handler
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    //By calling getVideoGamebyId with particular id as a parameter we got response and send the reponse
    try {
        const {id} = req.params;
        const videoGame = await getVideoGameById(id);
        res.send(videoGame);
        //error handler
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    // By calling createVideoGame with required values we got response and send the response
    try{
        const videoGame = await createVideoGame(req.body);
         res.send(videoGame)
         //error handler
    }catch(error){
        next(error);
    }
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    // By calling updateVideoGame with required values we got response and send the response
    try{
        const videoGame = await updateVideoGame(req.params.id,req.body);
        res.send(videoGame);
        //error handler
    }catch(error){
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    // By calling deleteVideoGame with required id we got response and send the response
   try{
    const videoGame = await deleteVideoGame(req.params.id,req.body);
    res.send(videoGame);
    //error handler
   }catch(error){
    next(error);
   }
});

module.exports = router;
