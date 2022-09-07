import pygame, sys
from math import *

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption('Fourier Series')


dark = [50, 80, 100]
o_x, o_y = 200, 300
origin = [o_x, o_y]

t1, t2, t3, t4, t5, t6, t7 = 0, 0, 0, 0, 0, 0, 0

clock = pygame.time.Clock()
points = []

def makeCircle(center, radius, f):
	x = center[0] + radius * cos(0.04 * f)
	y = center[1] + radius * sin(0.04 * f)
	pygame.draw.circle(screen, 'white', center, radius, width = 1)
	return [x, y]

while True:
	screen.fill(dark)

	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			pygame.quit()
			sys.exit()

	# Circle #1
	o1 = makeCircle(origin, 105, t1)
	o2 = makeCircle(o1, 75, t2)
	o3 = makeCircle(o2, 50, t3)
	o4 = makeCircle(o3, 30, t4)
	o5 = makeCircle(o4, 15, t5)
	o6 = makeCircle(o5, 7.5, t6)

	t1 += 0.5
	t2 += 1.5
	t3 += 2.5
	t4 += 3.5
	t5 += 4.5
	t6 += 5.5
	t7 += 6.5

	pygame.draw.circle(screen, 'white', origin, 3)
	pygame.draw.circle(screen, 'white', o1, 3)
	pygame.draw.circle(screen, 'white', o2, 3)
	pygame.draw.circle(screen, 'white', o3, 3)
	pygame.draw.circle(screen, 'white', o4, 3)
	pygame.draw.circle(screen, 'white', o4, 3)
	pygame.draw.circle(screen, 'white', o5, 3)
	pygame.draw.circle(screen, 'white', o6, 3)

	points.insert(0, [500 - t1, o6[1]])
	for x, y in points:
		x += t1
		pygame.draw.circle(screen, 'orange', [x, y], 1)

	if len(points) > 300:
		points.pop()
	pygame.draw.line(screen, 'white', o6, [points[0][0] + t1, points[0][1]])

	clock.tick(30)
	pygame.display.update()
