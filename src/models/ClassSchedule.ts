import mongoose from 'mongoose';

const classScheduleSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    maxTrainees: { type: Number, default: 10 },
    trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' }],
  },
  { timestamps: true }
);

classScheduleSchema.pre('save', async function (next) {
  const daySchedules = await mongoose.model('ClassSchedule').find({ date: this.date });
  if (daySchedules.length >= 5) {
    next(new Error('Cannot schedule more than 5 classes on the same day.'));
  } else {
    next();
  }
});

const ClassSchedule = mongoose.model('ClassSchedule', classScheduleSchema);
export default ClassSchedule;
