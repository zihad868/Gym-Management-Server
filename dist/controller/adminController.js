"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassSchedule = exports.loginAdmin = exports.registerAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingAdmin = yield Admin_1.default.findOne({ email });
        if (existingAdmin) {
            res.status(400).send('Admin already exists');
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newAdmin = new Admin_1.default({ name, email, password: hashedPassword });
        yield newAdmin.save();
        res.status(201).send('Admin registered successfully');
    }
    catch (error) {
        res.status(500).send('Error registering admin');
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield Admin_1.default.findOne({ email });
        if (!admin) {
            res.status(404).send('Admin not found');
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            res.status(400).send('Invalid credentials');
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                admin: { username: admin.name, email: admin.email }
            }
        });
    }
    catch (error) {
        res.status(500).send('Error logging in');
    }
});
exports.loginAdmin = loginAdmin;
const ClassSchedule_1 = __importDefault(require("../models/ClassSchedule"));
const Trainer_1 = __importDefault(require("../models/Trainer"));
const createClassSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, startTime, endTime, trainerEmail } = req.body;
    try {
        // Check if the trainer exists
        const trainer = yield Trainer_1.default.findOne({ email: trainerEmail });
        if (!trainer) {
            res.status(404).json({ message: 'Trainer not found' });
            return;
        }
        // Check if there are already 5 classes scheduled for the day
        const existingSchedules = yield ClassSchedule_1.default.find({ date });
        if (existingSchedules.length >= 5) {
            res.status(400).json({ message: 'Cannot schedule more than 5 classes in a day' });
            return;
        }
        // Create a new class schedule
        const newClassSchedule = new ClassSchedule_1.default({
            name,
            date,
            startTime,
            endTime,
            trainer: trainerEmail,
        });
        yield newClassSchedule.save();
        res.status(201).json({
            message: 'Class schedule created successfully',
            classSchedule: newClassSchedule,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.createClassSchedule = createClassSchedule;
