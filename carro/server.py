import asyncio
import time
import socketio

loop = asyncio.get_event_loop()
sio = socketio.AsyncClient()

async def send_ping():
    await sio.emit('videoStream','matheus')

@sio.event
async def Movement(data):
    print(data)
    await sio.sleep(1)
    await send_ping()

@sio.event
async def connect():
    print('connected to server')

async def start_server():
    await sio.connect('http://localhost:9000')
    await sio.wait()


if __name__ == '__main__':
    loop.run_until_complete(start_server())
