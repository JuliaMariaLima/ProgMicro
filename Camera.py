from cv2 import *

# Receive video stream
stream = VideoCapture(0)

color_bounds = {
    "red": [(0, 70, 50), (10, 255, 255), (0, 0, 255)],
    "orange": [(5, 50, 50), (15, 255, 255), (0, 127, 255)],
    "yellow": [(20, 100, 100), (30, 255, 255), (0, 255, 255)],
    "green": [(65, 60, 60), (80, 255, 255), (0, 255, 0)],
    "blue": [(110, 50, 50), (130, 255, 255), (255, 0, 0)]
}
color = "green"

while True:
    # Image
    _, image = stream.read()
    
    # Black and white image
    image_bnw = cvtColor(image, COLOR_BGR2GRAY)
    image_bnw = cvtColor(image_bnw, COLOR_GRAY2BGR)
    
    # HSV image
    image_hsv = cvtColor(image, COLOR_BGR2HSV)
    
    # Mask
    mask = inRange(image_hsv, color_bounds[color][0], color_bounds[color][1])
    
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
              color=color_bounds[color][2],
              thickness=2)
    
    # Decide where to go
    mid_x = int(max_x + (max_l / 2))
    image_mid_x = len(image[0])
    circle(image, (mid_x, 400), 10, color=(255,255,0), thickness=2)
    if mid_x > image_mid_x * 2 / 3:
        putText(image, "Move right!", (10,30), color=(255,255,255),
thickness=2, fontFace=FONT_HERSHEY_SIMPLEX, fontScale=1)
    elif mid_x < image_mid_x / 3 and mid_x != 0:
        putText(image, "Move left!", (10,30), color=(255,255,255),
thickness=2, fontFace=FONT_HERSHEY_SIMPLEX, fontScale=1)
    elif mid_x > image_mid_x / 3 and mid_x < image_mid_x * 2 / 3:
        putText(image, "Move forward!", (10,30), color=(255,255,255),
thickness=2, fontFace=FONT_HERSHEY_SIMPLEX, fontScale=1)
        
    # Show video stream
    imshow("Car sight", image)
    
    if waitKey(1) & 0xFF == ord('q'):
        break

stream.release()
destroyAllWindows()
