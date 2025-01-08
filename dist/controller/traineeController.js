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
exports.loginTrainee = exports.registerTrainee = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Trainee_1 = __importDefault(require("../models/Trainee"));
const registerTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingTrainee = yield Trainee_1.default.findOne({ email });
        if (existingTrainee)
            return res.status(400).send('Trainee already exists');
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newTrainee = new Trainee_1.default({ name, email, password: hashedPassword });
        yield newTrainee.save();
        res.status(201).send('Trainee registered successfully');
    }
    catch (error) {
        res.status(500).send('Error registering trainee');
    }
});
exports.registerTrainee = registerTrainee;
const loginTrainee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const trainee = yield Trainee_1.default.findOne({ email });
        if (!trainee)
            return res.status(404).send('Trainee not found');
        const isMatch = yield bcrypt_1.default.compare(password, trainee.password);
        if (!isMatch)
            return res.status(400).send('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({ id: trainee._id, role: 'trainee' }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).send('Error logging in');
    }
});
exports.loginTrainee = loginTrainee;
