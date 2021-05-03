import pygame
import numpy as np
from sys import platform

enable_sound = (platform == "win32")

if not enable_sound:
    print("Sound disabled.")
else:
    import winsound # this will throw on platforms other than windows

data_count = 23
data = []
data_max = 200

for i in range(data_count):
    data.append(np.random.randint(1,data_max+1))

# setup
pygame.init()
screen = pygame.display.set_mode([500,500])

data_sorted = []

x_offset = 30
y_offset = screen.get_height() - 15
gap = 20

print(data)

clock = pygame.time.Clock()
step = 0
frame_count = 0
done = False
fps = 10

draw = True
while draw:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            draw = False

    clock.tick(fps)

    screen.fill((0,0,0))

    # bubble
    for ipass in range(len(data)):
        for i in range(len(data)-1-ipass):
            if step == frame_count:
                if data[i] > data[i+1]:
                    tmp = data[i]
                    tmp_i = i

                    if enable_sound:
                        winsound.Beep(int(np.interp(tmp, [0,data_max], [5000,8000])), 100) # this func blocks the thread :(

                    data[i] = data[i+1]
                    data[i+1] = tmp
                    step += 1
            elif step < frame_count and done is False:
                done = True
                tmp_i = -1
                print("Sorted",data)
            

    for i,pt in enumerate(data):
        pygame.draw.rect(screen,(0,255,0) if i == tmp_i else (255,0,0),(gap*i+x_offset,y_offset-pt,10,pt))

    pygame.display.flip()

    frame_count += 1
