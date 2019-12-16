# importação de bibliotecas
from flask import Flask, request, Response
from gpiozero import Motor, DistanceSensor
from time import sleep
import RPi.GPIO as GPIO
import json
import threading
from cv2 import *

# criação do servidor
app = Flask(__name__)

# definição de rotas do servidor
@app.route("/comandos", methods=["GET","POST"])
def getPost():
    data = request.json
    print(request.form)
    
    print(data)
    decode_dados(data)
    return Response(status=200)

@app.route("/car/<string:y>")
def carAction(y):
    print(y)
    return y

# cores
color_bounds = {
    "vermelho": [(0, 70, 50), (10, 255, 255), (0, 0, 255)],
    "laranja": [(5, 50, 50), (15, 255, 255), (0, 127, 255)],
    "amarelo": [(20, 100, 100), (30, 255, 255), (0, 255, 255)],
    "verde": [(65, 60, 60), (80, 255, 255), (0, 255, 0)],
    "azul": [(110, 50, 50), (130, 255, 255), (255, 0, 0)]
}
cor = "verde"

tem_cor_escolhida = False
posicao_cor = ''

# excução da câmera
def exec_camera():
    global posicao_cor
    global tem_cor_escolhida
    # recebe video stream
    stream = VideoCapture(0)
    while True:
        try:
            # Image
            _, image = stream.read()
            
            # Black and white image
            image_bnw = cvtColor(image, COLOR_BGR2GRAY)
            image_bnw = cvtColor(image_bnw, COLOR_GRAY2BGR)
            
            # HSV image
            image_hsv = cvtColor(image, COLOR_BGR2HSV)
            
            # Mask
            mask = inRange(image_hsv, color_bounds[cor][0], color_bounds[cor][1])
            
            # Contours
            contours,_ = findContours(mask, RETR_TREE, CHAIN_APPROX_SIMPLE)
            
            # Max dimensions
            max_area = 0
            max_x = 0
            max_y = 0
            max_l = 0
            max_h = 0
            
            # Find max dimensions
            for contour in contours:
                x, y, l, h = boundingRect(contour)
                area = l * h
                if area > max_area and area > 5000:
                    max_x = x
                    max_y = y
                    max_l = l
                    max_h = h
            
            # Draw largest color rectangle
            rectangle(image,
                      pt1=(max_x,max_y),
                      pt2=(max_x+max_l,max_y+max_h),
                      color=color_bounds[cor][2],
                      thickness=2)
            
            # Decide where to go
            mid_x = int(max_x + (max_l / 2))
            image_mid_x = len(image[0])
            #circle(image, (mid_x, 400), 10, color=(255,255,0), thickness=2)
            tem_cor_escolhida = True
            if mid_x > image_mid_x * 2 / 3:
                posicao_cor = 'direita'
            elif mid_x < image_mid_x / 3 and mid_x != 0:
                posicao_cor = 'esquerda'
            elif mid_x > image_mid_x / 3 and mid_x < image_mid_x * 2 / 3:
                posicao_cor = 'frente'
            else:
                posica_cor = ''
                tem_cor_escolhida = False
                
            # Show video stream
            imshow("Car sight", image)
            
            if waitKey(1) & 0xFF == ord('q'):
                stream.release()
                destroyAllWindows()
                break
        except:
            pass

# thread da câmera
thread_camera = threading.Thread(target=exec_camera)
thread_camera.start()

# criação de componentes

# roda esquerda
leftWheel = Motor(23, 24)

# roda direita
rightWheel = Motor(20, 21)

# conta-giro
dPin = 26

#sensor de distancia
distanceSensor = DistanceSensor(trigger = 17, echo = 27)
distanceSensor.max_distance = 10
lastDistance = 0.5

# atualização de variáveis
def dEventRising(pin):
    global dcounter
    dcounter += 1
    #print("D COUNTER " + str(dcounter))

dcounter = 0
distancia_percorrida = 0

GPIO.setmode(GPIO.BCM)

GPIO.setup(dPin, GPIO.IN)

GPIO.add_event_detect(dPin, GPIO.FALLING, callback = dEventRising)

# decodificação de comandos
def decode_dados(dados):
    global cor
    global dcounter
    if 'cor' in dados:
        cor = dados['cor']
    comandos = dados['comandos']
    dcounter = 0
    decode_comandos(comandos)
    dcounter = 0
    
def decode_comandos(comandos):
    for comando in comandos:
        tipo = comando['tipo']
        if tipo == 'frente':
            decode_frente(comando)
        elif tipo == 'tras':
            decode_tras(comando)
        elif tipo == 'esquerda':
            decode_esquerda(comando)
        elif tipo == 'direita':
            decode_direita(comando)
        elif tipo == 'parar':
            decode_parar(comando)
        elif tipo == 'se':
            decode_se(comando)
        elif tipo == 'por':
            decode_por(comando)
        elif tipo == 'enquanto':
            decode_enquanto(comando)
        else:
            print('Comando incorreto.')
            
def decode_frente(comando):
    distancia = comando['distancia']
    velocidade = comando['velocidade']
    print('andar', distancia, velocidade, 'frente')
    andar(distancia, velocidade, 'frente')

def decode_tras(comando):
    distancia = comando['distancia']
    velocidade = comando['velocidade']
    print('andar', distancia, velocidade, 'tras')
    andar(distancia, velocidade, 'tras')

def decode_esquerda(comando):
    angulo = comando['angulo']
    velocidade = 1
    print('girar', angulo, velocidade, 'esquerda')
    girar(angulo, velocidade, 'esquerda')
    
def decode_direita(comando):
    angulo = comando['angulo']
    velocidade = 1
    print('girar', angulo, velocidade, 'direita')
    girar(angulo, velocidade, 'direita')

def decode_andar(comando):
    distancia = comando['distancia']
    velocidade = comando['velocidade']
    sentido = comando['sentido']
    print('andar', distancia, velocidade, sentido)
    andar(distancia, velocidade, sentido)
    
def decode_girar(comando):
    angulo = comando['angulo']
    velocidade = comando['velocidade']
    sentido = comando['sentido']
    print('girar', angulo, velocidade, sentido)
    girar(angulo, velocidade, sentido)
    
def decode_parar(comando):
    tempo = comando['tempo']
    print('parar', tempo)
    parar(tempo)

def decode_condicoes(condicoes):
    booleano = True
    
    for condicao in condicoes:
        booleano = booleano and decode_condicao(condicao)
    
    return booleano

def decode_condicao(comando):
    global lastDistance
    variavel = comando['variavel']
    valor = comando['valor']
    operador = comando['operador']
    
    if variavel == 'posicao_cor':
        variavel = posicao_cor
    elif variavel == 'distancia':
        variavel = distanceSensor.distance# * 100
        if variavel < 0.05:
            variavel = lastDistance
        else:
            lastDistance = variavel
        print("distancia: ", variavel)
        sleep(0.01)
    elif variavel == 'tem_cor_escolhida':
        variavel = tem_cor_escolhida
    elif variavel == 'distancia_percorrida':
        variavel = distancia_percorrida
    else:
        return False
    
    if operador == 'igual':
        return variavel == valor
    elif operador == 'diferente':
        return variavel != valor
    elif operador == 'maior que':
        return variavel > valor
    elif operador == 'menor que':
        return variavel < valor
    elif operador == 'maior igual':
        return variavel >= valor
    elif operador == 'menor igual':
        return variavel <= valor
    else:
        return False

def decode_se(comando):
    condicoes = comando['condicao']
    satisfeita = comando['satisfeita']
    insatisfeita = comando['insatisfeita']
    if decode_condicoes(condicoes):
        decode_comandos(satisfeita)
    else:
        decode_comandos(insatisfeita)

def decode_por(comando):
    vezes = comando['vezes']
    comandos = comando['comandos']
    for _ in range(0, vezes):
        decode_comandos(comandos)
        
def decode_enquanto(comando):
    condicoes = comando['condicao']
    comandos = comando['comandos']
    while decode_condicoes(condicoes):
        decode_comandos(comandos)
        

# controle do carro
def andar(distancia, velocidade, sentido):
    global distancia_percorrida
    
    counterGiro = dcounter
    if sentido == 'frente':
        moveForward(velocidade)
    elif sentido == 'tras':
        moveBackward(velocidade)
    else:
        print('Comando incorreto.')
        return
    while(dcounter - counterGiro <= distancia * 100):
        distancia_percorrida = dcounter * 0.01
        continue
    #sleep(distancia)
    stop()
    return

def girar(angulo, velocidade, sentido):
    counterGiro = dcounter
    if sentido == 'direita':
        turnRight()
    elif sentido == 'esquerda':
        turnLeft()
    else:
        print('Comando incorreto.')
        return
    while(dcounter - counterGiro <= angulo):
        continue
    #sleep(angulo)
    stop()
    return

def parar(tempo):
    stop()
    if tempo > 0:
        sleep(tempo)
    return

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
    leftWheel.backward()
    rightWheel.forward()
    
def turnRight():
    leftWheel.forward()
    rightWheel.backward()
    
comandos = [
    {
        'tipo': 'parar',
        'tempo': 7
    },
    {
        'tipo': 'se',
        'condicao': {
            'variavel': 'posicao_cor',
            'valor': 'esquerda',
            'operador': 'igual'
        },
        'satisfeita': [
            {
                'tipo': 'girar',
                'angulo': 2,
                'velocidade': 1,
                'sentido': 'esquerda'
            },
            {
                'tipo': 'parar',
                'tempo': 3
            }
        ],
        'insatisfeita': []
    },
    {
        'tipo': 'por',
        'vezes': 4,
        'comandos': [
            {
                'tipo': 'andar',
                'distancia': 1,
                'velocidade': 1,
                'sentido': 'frente'
            },
            {
                'tipo': 'girar',
                'angulo': 1,
                'velocidade': 1,
                'sentido': 'direita'
            },
            {
                'tipo': 'parar',
                'tempo': 1
            }
        ]
    },
    {
        'tipo': 'se',
        'condicao': {
            'variavel': 'distancia',
            'valor': 20,
            'operador': 'menor'
        },
        'satisfeita': [
            {
                'tipo': 'girar',
                'angulo': 2,
                'velocidade': 1,
                'sentido': 'esquerda'
            },
            {
                'tipo': 'parar',
                'tempo': 3
            }
        ],
        'insatisfeita': [
            {
                'tipo': 'parar',
                'tempo': 3
            }    
        ]
    }
]

##while True:
##    print(distanceSensor.distance)
##    sleep(0.5)

#decode_comandos(comandos)

# execução do servidor
app.run(port=5000,debug=False)