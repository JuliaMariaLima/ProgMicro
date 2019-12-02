# importação de bibliotecas
from flask import Flask, request, Response
from gpiozero import Motor
from time import sleep
import RPi.GPIO as GPIO
import json

# criação do servidor
app = Flask(__name__)

# criação de componentes
leftWheel = Motor(23, 24)
rightWheel = Motor(20, 21)
ePin = 27
dPin = 22
ecounter = 0
dcounter = 0

GPIO.setmode(GPIO.BCM)

GPIO.setup(ePin, GPIO.IN)
GPIO.setup(dPin, GPIO.IN)

# definição de funcoes
@app.route("/comandos", methods=["GET","POST"])
def getPost():
    data = request.json
    print(request.form)
    
    print(data)
    desencoder(data)
    return Response(status=200)

@app.route("/car/<string:y>")
def carAction(y):
    print(y)
    return y

def desencoder(data):
    print(" >>>>> entrou <<<<<<")

    ciclos = data['ciclos']
    print("ciclos ", ciclos)
    velocidade = 1#data['velocidade']
    ## trocar isso daquiiii
    print("velocidade " + str(velocidade))
    for ciclo in ciclos:
        print(ciclo)
        movimentos = ciclo['movimentos']
        print("movimentos ", movimentos)
        vezes = ciclo['vezes']
        print("vezes ", vezes)

        for i in range(0, vezes):
            for movimento in movimentos:
                tipo = movimento["tipo"]
                duracao = movimento["duracao"]
                print(tipo)
                if (tipo == "frente"):
                    print("entrou frente")
                    moveForward(velocidade)
                elif (tipo == "tras"):
                    moveBackward(velocidade)
                elif (tipo == "direita"):
                    turnRight()
                elif (tipo == "esquerda"):
                    turnLeft()
                elif (tipo == "parar"):
                    stop()
                delay(duracao)

def eEventRising(pin):
    global ecounter
    ecounter += 1
    print("E COUNTER " + str(ecounter))
    
def dEventRising(pin):
    global dcounter
    dcounter += 1
    print("D COUNTER " + str(dcounter))

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


GPIO.add_event_detect(ePin, GPIO.RISING, callback = eEventRising)
GPIO.add_event_detect(dPin, GPIO.FALLING, callback = dEventRising)
##moveForward(1)
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
