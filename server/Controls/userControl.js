import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import userModal from '../Modals/userModal.js';

//register new user
export const register = async(req, res) => {
try {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await new userModal({
        name,
        email,
        password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(200).json({ message: "Registration successful", user: savedUser });
} catch (error) {
    res.status(500).json({ message : error.message })
}
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModal.findOne({ email : email });
        if(!user) return res.status(400).json({ message : "User doesn't exist"});

        const isMatch = await bcrypt.compare( password, user.password);
        if(!isMatch) return res.status(400).json({ message : "Invalid Credentials"});

        const token = Jwt.sign({ id : user._id}, process.env.JWT_SECRET, {
            expiresIn : 10
        })
        const refreshToken = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Example refresh token expiration time (7 days)
          });
        delete user.password;
        res.status(200).json({ message : "Login successful", token : token, user : user, refreshToken : refreshToken })
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}

export const getUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await userModal.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}