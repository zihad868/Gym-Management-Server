import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: {
        type: String,
        enum: ['admin', 'trainer', 'trainee'],
        default: 'trainee'
    }
})


const User = mongoose.model('user', userSchema);

export default User;