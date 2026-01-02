import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    role: String,
  },
  { timestamps: true }
);

export default mongoose.models.Employee ||
  mongoose.model('Employee', EmployeeSchema);
