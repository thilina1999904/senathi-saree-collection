import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
           type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    },
    profilePicture: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4Rp6yBdFr5GKaXf2cK8EpZ5dIYb6i6FLgw&s"
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;

