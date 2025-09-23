import { EventEmitter } from "stream";

const emitter=new EventEmitter()

emitter.on('greet', (message)=>{
    console.log(message)
})

emitter.emit('greet', 'hello this is events')



