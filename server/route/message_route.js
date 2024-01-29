const express = require('express')
const messageController = require('../controller/message_controller.js')
const route = express.Router()
route.post('/send', messageController.sendMessage)
route.get('/find/:chatID',messageController.getMessageByChatID )
route.get('/find/:chatID/:senderID',messageController.getMessageByBoth)
module.exports = route