import { User } from "../models/index";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
require('dotenv').config();
import { sendEmailService } from "./mailer-service";

export const registerNewUser = async (data: any) => {
    try {
        const { email, password } = data;
        if (password.length < 5) {
            return {
                error: 'Password too small. Should be atleast 6 characters',
            }
        }
        const passwordHashed = await bcrypt.hash(password, 10)
        User.create({
            email,
            password: passwordHashed
        }).then((newUser) => {
            if (newUser) {
                return newUser
            }
            else {
                return {
                    message: "Error creating new user",
                };
            }
        })
    } catch (error: any) {
        return {
            error: "Cannot create new user",
        }
    }


}
export const findUserAndAuthenticate = (data: any) => {

    const { email } = data;
    console.log(data);
    return User.findOne({ email }).exec()
        .then((user) => {
            if (!user) {
                return {
                    error: "User not found",
                }
            }
            else{
                return user;
            }
            
        }).catch((error) => {
            return {
                error:"Cannot find"
            }
        })




}

export const forgotPasswordService = (emailID: any) => {
    const { email } = emailID;
    User.findOne({ email }).exec()
        .then((user) => {
            if (!user) {
                return { error: "User with this email does not exist" };
            }
            else {

                const token = jwt.sign({ _id: user._id }, process.env.RESET_PWD_KEY as string, { expiresIn: '15m' });
                const data = {
                    from: 'noreply@reset.com',
                    to: email,
                    subject: 'Password Reset Link',
                    html: `<h2> Please click on the given link to reset your password. This link expires in 15 mins!</h2>
                 <a href = "${process.env.CLIENT_URL}/resetPassword/${token}">Reset your password here</a>`
                }
                User.updateOne({ resetLink: token }, function (err: any, updated: any) {
                    if (err) {
                        return { error: "Error updating reset Link in DB", };
                    }
                    else {
                        sendEmailService({ options: data }).then((message) => {
                            return message;
                        })
                    }
                })

            }
        }).catch((error) => {
            console.log(error.message);
        })
}

export const resetUserPassword = (data: any) => {

    const { resetLink, newPassword } = data;
    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PWD_KEY as string, function (err: any, decodedData: any) {
            console.log(decodedData);
            if (err) {
                return { error: "email does not exist" };
            }
            User.findOne({ resetLink }, async (error: any, user: any) => {
                if (error || !user) {
                    return { error: "user does not exist with this data" };
                }
                if (newPassword.length < 5) {
                    return {
                        error: 'Password too small. Should be atleast 6 characters'
                    };
                }
                const passwordHashed = await bcrypt.hash(newPassword, 10)
                const newObj = {
                    password: passwordHashed,
                    resetLink: ''
                }
                const userObj = Object.assign(user, newObj);
                userObj.save();
                console.log("success");
                return { message: "Password changed" };
            })
        })

    }
    else {
        return { error: "Error decoding data" };
    }
}