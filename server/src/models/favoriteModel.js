import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: { 
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    poster_path: { type: String },
    rating: { type: Number}
}, { timestamps: true });

export default mongoose.model('favorite', favoriteSchema);