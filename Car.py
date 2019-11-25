# importação de bibliotecas
from flask import Flask, request, Response
from gpiozero import Motor
from time import sleep

# criação do servidor
app = Flask(__name__)

@app.route("/seunome", methods=["GET","POST"])
def juju():
    data = request.json
    print(request.form)
    print(data)
    return Response(status=200)

@app.route("/car/<string:y>")
def carAction(y):
    print(y)
    return y

# criação de componentes
leftWheel = Motor(23, 24)
rightWheel = Motor(20, 21)

# definição de funcoes
def stop():
    leftWheel.stop()
    rightWheel.stop()

def moveForward(speed):
    leftWheel.forward(speed)
    rightWheel.forward(speed)
    
def moveBackward(speed):
    leftWheel.backward(speed)
    rightWheel.backward(speed)
    
def turnLeft():
    leftWheel.stop()
    rightWheel.forward()
    
def turnRight():
    leftWheel.forward()
    rightWheel.stop()

# loop infinito
##while True:
##    moveForward(0.5)
##    sleep(5)
##    turnRight()
##    sleep(5)
##    moveBackward(1)
##    sleep(5)
##    turnLeft()
##    sleep(5)
    
app.run(port=5000,debug=False)