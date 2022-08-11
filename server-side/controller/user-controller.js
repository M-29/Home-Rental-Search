import schema from "../model/userSchema.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; import statusCodes from "../constTextKeys/constantKeys.js";
import textKeys from "../textKeys/textKeys.js";
dotenv.config({ path: "config.env" });
export const getAllUser = (req, res) => {
    schema.User.find((err, user) => {
        if (err) {
            res.send("Data not stored");
        }
        else {
            res.send(user);
        }
    })
}
const generateJwtToken = (id, email) => {
    return (jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME }));
}
export const register = (req, res) => {
    const { name, email, password } = req.body;
    if (!email && !password && !name) {
        return res.status(statusCodes.NOT_FOUND).send({ message: textKeys.userTextKeys.enterAllDetails });
    }
    if (!email && !password) {
        return res.status(statusCodes.NOT_FOUND).send({ message: textKeys.userTextKeys.emailAndPasswordIsRequired });
    }
    if (!email) {
        return res.status(statusCodes.NOT_FOUND).send({ message: textKeys.userTextKeys.emailRequired });
    }
    if (email && !password) {
        return res.status(statusCodes.NOT_FOUND).send({ message: textKeys.userTextKeys.passwordRequired });
    }
    if (!name) {
        return res.status(statusCodes.NOT_FOUND).send({ message: textKeys.userTextKeys.userNameRequired });
    }

    if (email && password && name) {
        schema.User.findOne({ email: email }, (err, user) => {
            if (user) {
                res.status(statusCodes.BAD_REQUEST).send({ message: textKeys.userTextKeys.existAlready });

            }
            else {
                const user = new schema.User({
                    name,
                    email,
                    password
                })
                user.save(err => {
                    if (err) {
                        res.status(statusCodes.BAD_REQUEST).send(err)
                    }
                    else {
                        res.status(statusCodes.CREATED).send();
                    }
                })
            }
        })
    }

}
export const login = (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(statusCodes.UNAUTHORIZED).send({ message: textKeys.userTextKeys.emailAndPasswordIsRequired });
    }
    if (!email) {
        return res.status(statusCodes.UNAUTHORIZED).send({ message: textKeys.userTextKeys.emailRequired });
    }
    if (email && !password) {
        return res.status(statusCodes.UNAUTHORIZED).send({ message: textKeys.userTextKeys.passwordRequired });
    }
    if (email && password) {
        schema.User.findOne({ email: email }, (err, user) => {
            if (user) {
                if (password === user.password) {
                    const token = generateJwtToken(user._id, user.email);
                    res.status(statusCodes.OK).send({ message: textKeys.userTextKeys.loginSuccessfully, name: user.name,email:user.email,id:user._id, token });
                }
                else {
                    res.status(statusCodes.UNAUTHORIZED).send({ message: textKeys.userTextKeys.invalidPassword });
                }
            } else {
                res.status(statusCodes.NOT_FOUND).send({ message: textKeys.userTextKeys.invalidUser });
            }

        })
    }
}