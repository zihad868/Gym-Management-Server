"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
// Import Route
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
// Configure Dotenv
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
// Routes
// Authentication Routes
app.use('/api/auth', authRoutes_1.default);
// Admin Routes
app.use('/api/auth', adminRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Gym Sever is running");
});
app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});
