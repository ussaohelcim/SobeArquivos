const multer = require('multer')
const fs = require('fs')
const path = require('path')
const porta = 80
const app = require('express')()

app.get('/', (req,res) =>{
	res.sendFile( path.join(__dirname,'/index.html') )
})
let storage = multer.diskStorage({
	destination: (req,file,cb) =>{
		cb(null,"uploads")
	},
	filename: (req,file,cb) =>{
		cb(null,file.originalname)
	}
})
let upload = multer({
	storage:storage
}).single("arquivo")

app.post('/fileupload', (req,res,next) =>{
	upload(req,res, (err) =>{
		console.log(`${req.file.originalname} esta sendo upado com ${req.file.size} bytes`)

		if(err) res.send(err)
		else res.send("upado")

		console.log("salvo")
	})
})

app.listen(porta)