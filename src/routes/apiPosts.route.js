// Modules
const express = require("express");

// Services
const returnMessageService = require("../services/returnmessage.service");
const arrReqService = require("../services/arrreq.service")

// Models
const ReturnMessage = require("../models/returnMessage.model"); 

// Controllers
const postsController = require("../controllers/posts.controller")

// Work
const router = express.Router()

router.get("/create", async (req, res)=>{
    let arrreq = arrReqService.req(req.query, ["content"])
    if(arrreq !== true){
        returnMessageService(new ReturnMessage("1306", `Missing parameter: ${arrreq}`, 400, 'error'), res)
        return
    }
    returnMessageService((await postsController.create(req.query.content, req)), res)
})

router.get("/feed/:type", async (req, res)=>{
    returnMessageService(await postsController.feed(req.params.type, req, req.query), res)
})

router.get("/:id", async (req, res)=>{
    let p = (await postsController.get(req.params.id, req.socket.remoteAddress))
    console.log(p)
    returnMessageService(p, res);
})


module.exports = router