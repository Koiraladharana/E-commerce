import Favorite from '../models/favoriteModel.js';

//GET all favorites of logged in member
export const getFavorites = async (req, res) => {
    try{
        const favorites = await Favorite.find({ userId: req.user._id });
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

//POST favorite movie
export const addFavorite = async (req, res) => {
    try{
        const { movieId, title, poster_path, rating } = req.body;

        const alreadyAdded = await Favorite.findOne({ userId: req.user._id, movieId });
        if(alreadyAdded){
            return res.status(400).json({ message: 'Movie already added' });
        }

        const favorite = await Favorite.create({
            userId: req.user._id,
            movieId,
            title,
            poster_path,
            rating
        });
        res.status(201).json(favorite);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

//DELETE/ REMOVED from favorite

export const removeFavorite = async ( req, res ) => {
    try{
        await Favorite.findOneAndDelete({ 
            userId: req.user._id,
            movieId: Number(req.params.movieId)
        });
        res.json({ message: 'Removed from favorites'})
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}