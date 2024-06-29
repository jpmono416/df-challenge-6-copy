import jwt from "jsonwebtoken";

import Config from "../config/Config.js";
import User from "../models/User.model.js";
import Roles from "../enums/Roles.js";

/**
 * UserService class to handle user-related operations.
 */
export default class UserService {
    /**
     * Creates a new user and generates a JWT token.
     * @param {Object} newUser - The new user object to be created.
     * @returns {Object} The created user and their JWT token.
     * @throws {Error} If the user cannot be created.
     */
    static createUser = async (newUser) => {
        try {
            // Load configuration to ensure environment variables are available
            Config.load();
            const { JWT_SECRET } = process.env;
            
            //? The frontend sends a boolean value for wantsToVolunteer, which is converted to a role. This is to hide the role from the user.
            UserService.processRequestRoles(newUser);
            
            const user = new User(newUser);
            await user.save();

            // Generate a JWT token for the new user
            const token = jwt.sign({ userId: user._id, roles: user.roles }, JWT_SECRET, {
                expiresIn: "24h",
            });

            // Remove the password before returning
            user.password = undefined;

            return { user, token };
        } catch (error) {
            throw new Error("Invalid user: " + error.message);
        }
    };

    /**
     * Retrieves a user by their email.
     * @param {string} email - The email of the user to retrieve.
     * @returns {Promise<Object>} The user object if found, otherwise null.
     */
    static getUserByEmail = async (email) => {
        try {
            return await User.findOne({ email: email });
        } catch (error) {
            throw new Error("Invalid user: " + error.message);
        }
    };

    /**
     * Logs in a user by verifying their email and password.
     * @param {string} email - The email of the user attempting to log in.
     * @param {string} password - The password of the user attempting to log in.
     * @returns {Promise<Object|undefined>} The logged-in user and their JWT token if successful, otherwise undefined.
     */
    static loginUser = async (email, password) => {
        try {
            const user = await UserService.getUserByEmail(email);
            // Verify the password matches
            if (user?.password !== password) return;

            // Load configuration and generate a JWT token
            Config.load();
            const { JWT_SECRET } = process.env;
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
                expiresIn: "24h",
            });
            return { user, token };
        } catch (error) {
            // Log or handle error as needed
            console.error("Login failed:", error);
            throw new Error("Login failed: " + error.message);
        }
    };

    // Roles
    static addRole = async (email, role) => {
        try {
            const user = await UserService.getUserByEmail(email);
            if (!user) return;

            user.roles.push(role);
            await user.save();
            return user;
        } catch (error) {
            console.error("Adding role failed:", error);
            throw new Error("Adding role failed: " + error.message);
        }
    };

    static getRoles = async () => {
        return User.schema.path("roles").enumValues;
    };

    static removeRole = async (email, role) => {
        try {
            const user = await UserService.getUserByEmail(email);
            if (!user) return;

            user.roles = user.roles.filter((r) => r !== role);
            await user.save();
            return user;
        } catch (error) {
            console.error("Removing role failed:", error);
            throw new Error("Removing role failed: " + error.message);
        }
    };

    static processRequestRoles = async (newUser) => {
        newUser.roles = [Roles.USER];
        
        if (newUser.wantsToVolunteer === true) {
            newUser.roles.push(Roles.VOLUNTEER);
            newUser.wantsToVolunteer = undefined; // Remove the field from the user object (not in model)
        }
    };

    /**
     * Changes the password for a user.
     * @param {string} email - The email of the user to change the password for.
     * @param {string} newPassword - The new password to set for the user.
     * @returns {Promise<Object|undefined>} The updated user if successful, otherwise undefined.
     */
    static changePassword = async (email, newPassword) => {
        try {
            const user = await UserService.getUserByEmail(email);
            if (!user) return;

            user.password = newPassword;
            await user.save();
            return user;
        } catch (error) {
            console.error("Changing password failed:", error);
            throw new Error("Changing password failed: " + error.message);
        }
    };
}
