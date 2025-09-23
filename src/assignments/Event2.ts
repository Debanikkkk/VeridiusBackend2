import { EventEmitter } from "stream";

const emitter=new EventEmitter()

 emitter.on('start', ()=>{
    console.log('the process has statrted...')
})

emitter.on('process', ()=>{
    console.log('the process is processing...')
})
emitter.on('end', ()=>{
    console.log('the process has ended...')
})


setTimeout(()=>{
emitter.emit('start')
setTimeout(()=>{
    emitter.emit('process')
    setTimeout(()=>{
        emitter.emit('end')
    }, 1000)
}, 1000)
},1000)