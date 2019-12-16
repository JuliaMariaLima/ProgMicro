# importação interna
from stream import VideoCamera

import threading
import eventlet
import socketio
import time

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

num = 0

def number(num):
    if num is 100:
        num = 0
    num = num + 1;
    return num;

def send_ping(camera):
    global num
    num = number(num)
    print(str(num))
    frame = camera.get_frame(num)
    sio.emit('FromAPI', '/tmp/images/image'+str(num)+'.jpg')

@sio.event
def connect(sid, environ):
    print('connect ', sid)
    send_ping(VideoCamera())
    # sio.emit('FromAPI', '/tmp/image1.jpg')

@sio.event
def my_message(sid,data):
    print('message received with ', data)
    send_ping(VideoCamera())

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('localhost', 9000)), app)
