import mongoose from 'mongoose';

const ClassScheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  maxTrainees: { type: Number, default: 10 },
  trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' }],
});

const ClassSchedule = mongoose.model('ClassSchedule', ClassScheduleSchema);

export default ClassSchedule;
