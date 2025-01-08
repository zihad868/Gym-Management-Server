import mongoose from 'mongoose';

const TraineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String },
});

const Trainee = mongoose.model('Trainee', TraineeSchema);

export default Trainee;
