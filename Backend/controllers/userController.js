import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const { userId, isAccountVerified } = req.body;

        if(!isAccountVerified) return res.json({success: false, message: 'No such user'});
        
        const user = await userModel.findById(userId);

        if(!user) return res.json({ success: false, message: 'User not Found' });

        res.json({ 
            success: true,
            userData: {
                name: user.name
            }
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}