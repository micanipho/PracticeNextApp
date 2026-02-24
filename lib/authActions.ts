'use server';

import { db } from "./db";
import { comparePassword, hashPassword } from "./utils";
import { createUserSession, deleteUserSession, getUserSession } from "./session";
import { IAuthSignIn, IAuthSignUp, IAuthUser } from "@/providers/authProvider/context";


const { users } = db;

export async function signInAction(payload: IAuthSignIn) {
    try {
        const user = users.findUnique({ email: payload.email });

        if (!user) {
            return { error: true, errorMessage: "User not found" };
        }

        if (!comparePassword(payload.password, user.password, user.salt)) {
            return { error: true, errorMessage: "Invalid password" };
        }

        const token = `token_${Date.now()}`;
        const authUser: IAuthUser = { ...user, token };

        await createUserSession(authUser);

        // Remove sensitive fields before returning to client
        const { password, salt, ...safeUser } = authUser;
        return { error: false, user: safeUser, token };
    } catch (error) {
        console.error("Sign in action failed:", error);
        return { error: true, errorMessage: "An error occurred during sign in" };
    }
}

export async function signUpAction(payload: IAuthSignUp) {
    try {
        const existingUser = users.findUnique({ email: payload.email });

        if (existingUser) {
            return { error: true, errorMessage: "User already exists" };
        }

        if (payload.password !== payload.confirmPassword) {
            return { error: true, errorMessage: "Passwords do not match" };
        }

        const { hashedPassword, salt } = hashPassword(payload.password);
        const token = `token_${Date.now()}`;
        
        const newUser = { 
            name: payload.name,
            email: payload.email,
            password: hashedPassword, 
            salt, 
            role: payload.role || 'user', 
            token 
        };

        const savedUser = users.create(newUser);
        await createUserSession(savedUser);

        // Remove sensitive fields
        const { password, salt: _salt, ...safeUser } = savedUser;
        return { error: false, user: safeUser, token };
    } catch (error) {
        console.error("Sign up action failed:", error);
        return { error: true, errorMessage: "An error occurred during sign up" };
    }
}

export async function signOutAction() {
    try {
        await deleteUserSession();
        return { error: false };
    } catch (error) {
        console.error("Sign out action failed:", error);
        return { error: true, errorMessage: "An error occurred during sign out" };
    }
}

export async function getAuthAction() {
    try {
        const session = await getUserSession();
        if (!session) return null;

        const user = users.findUnique({ id: session.userId });
        if (!user) return null;

        const { password, salt, ...safeUser } = user;
        return { ...safeUser, token: session.token };
    } catch (error) {
        console.error("Get auth action failed:", error);
        return null;
    }
}
