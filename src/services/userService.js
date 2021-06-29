const { response } = require('express');
const funciones = require('../utils/index');
const User = require('../models/User');
const Mentor = require('../models/Mentor');

exports.getAllUsers = async() => {
    try {
        const response = await User.find()
        return response
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
};

exports.saveUser = async(slackId, stack, userEmail) => {
    try {
        let mentor = await funciones.mentorAssignment(stack)
        let user = await new User({ slackUserId: slackId, techStack: stack, groupId: mentor.groupId, email: userEmail, mentorName: mentor.name })
        await user.save()
        await Mentor.findByIdAndUpdate(mentor._id, { $push: { 'user': user } });
        const response = { mentorName: user.mentorName, groupId: user.groupId, email: user.email }
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
};

exports.getOneUser = async(id) => {
    try {
        const response = await User.findById(id)
        return response
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
};