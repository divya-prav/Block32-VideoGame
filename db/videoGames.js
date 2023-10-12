const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        // Get all the rows from videogames table using sql query
        const { rows: videoGames } = await client.query(`SELECT * FROM videogames`);
        //return all the videogame value
        return videoGames;
        //error handler
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    // Get the particular value from videogame table by passing id
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        // return the value
        return videoGame;
        //error handler
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // To make a post request we need a values of name, description, price, isStock, isPopular,imgUrl 
    // values that we get from the body object
    const {name,description,price,inStock,isPopular,imgUrl} = body;
    try{
        //By using insert query with body values create a new row into the videogames table 
        const {rows : [videoGame]} = await client.query(`

            INSERT INTO videogames(name,description,price,"inStock","isPopular","imgUrl")
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *;
       `,[name, description,price,inStock,isPopular,imgUrl]);
       // return the response
       return videoGame
    }
      // error handler
    catch(error){
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
    const setString = Object.keys(fields).map((key,index) =>`"${key}"=$${index+1}`).join(', ');
    if(setString.length === 0){
        return;
    }
     //To update a particular value we need an id and new data that we get from body object
     //using update query with new values make a update to that particular id
    try{
        const {rows : [videoGame]} = await client.query(`
           UPDATE videogames
           SET ${setString}
           WHERE id=${id}
           RETURNING *;        
        `,Object.values(fields));
      // return response  
        return videoGame;
        //error handler
    }catch (error){
        throw error;
    }



}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // To delete a particular values we need an id that we get from req.params
    // Using delete query delete the particular value
    try{
        const {rows:[videoGame]} = await client.query(`

        DELETE FROM videogames
        WHERE id =$1
        RETURNING *;
        `,[id]);
        // return response
        return videoGame;
    }
    // error handler
    catch(error){
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}