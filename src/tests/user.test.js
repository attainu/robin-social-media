import User from "../routes/user.js";
import Post from "../routes/post.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from "supertest";

//------------For User-------------------//
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Amitabh Bachan',
    email: 'amitabh@gmail.com',
    username:'amitabhbachan',
    password: 'a12345',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'deepambahre@gmail.com')
    }]
}

    test('Should signup a new user', () => {
         request(User).post('/register').send({
            name: 'Radha Singh',
            email: 'radha@gmail.com',
            password: 'r12345'
        }).expect(201)
    })

    test('Should login existing user', () => {
        request(User).post('/login').send({
            username: userOne.username,
            password: userOne.password
        }).expect(200)
   })


//------------For Post-------------------//

   test('Should Add a new post', () => {
    request(Post).post('/AddPost').send({
        description: 'I am Jest tester'
   }).expect(201)
})