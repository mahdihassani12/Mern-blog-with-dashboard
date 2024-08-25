import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// adding user to database
const registerUser = async (req, res, next) => {};

// authenticate a user on login
const loginUser = async (req, res, next) => {};

// authenticate a user on validation
const getMe = async (req, res, next) => {};

// Generate jwt
const generateToken = (id) => {};

export { registerUser, loginUser, getMe };
