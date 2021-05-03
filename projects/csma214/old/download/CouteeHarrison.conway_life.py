# install Pygame [2.0.1+] with  : python3 -m pip install pygame
# then, install Pygame Zero with: python3 -m pip install pgzero --no-deps
# docs: https://pygame-zero.readthedocs.io/

import pgzrun, math, time
from numpy import random

WIDTH = 800      # window dimensions
HEIGHT = 800

class Life:
	def __init__(self, cells_per_dimension = 25):
		self.board = []
		self.running = False
		for x in range(cells_per_dimension):              # for each row
			self.board.append([0] * cells_per_dimension)  # add an empty column of cells
		self.w = WIDTH / cells_per_dimension              # size of a cell in px
		self.generation = 0                               # current generation
		self.last_time = 0                                # when the current generation was generated
		self.running = False # whether the simulation is running

	def neighbor_count(self,x,y, board):
		# * Any live cell with two or three live neighbours survives.
		neighbors = 0
		for i in range(-1, 2):
			for j in range(-1, 2):
				cx, cy = x+i, y+j
				if cx > len(board[0])-1:
					cx -= len(board[0])-1
				if cy > len(board[1])-1:
					cy -= len(board[1])-1
				if cx < 0:
					cx += len(board[0])-1 
				if cy < 0:
					cy += len(board[1])-1
				neighbors += board[cx][cy]

		neighbors -= board[x][y]

		return neighbors
		
	def randomize(self):
		self.board = random.randint(0, high=2, size=(len(self.board[0]), len(self.board[1])))

	def generate(self):
		"""Calculate a new generation of cells from the current ones."""
		nextboard = self.board.copy()

		for x in range(len(self.board)):
			for y in range(len(self.board[x])):
				cell = self.board[x][y]
				neighbors = self.neighbor_count(x,y,self.board)
				# 3. I noticed that increasing the required number of neighbors caused more cells to die,
				#    and decreasing the number of neighbors requried caused more cells to live.
				if (cell == 1 and neighbors < 2) or (cell == 1 and neighbors > 3):
					nextboard[x][y] = 0
				elif cell == 0 and neighbors == 3:
					nextboard[x][y] = 1

		self.board = nextboard
		self.generation += 1
		self.last_time = time.time()

	def draw(self):
		"""Draw the current generation to the screen."""
		for x in range(len(self.board)):
			for y in range(len(self.board[x])):
				cell = Rect((x*self.w, y*self.w), (self.w, self.w))
				if self.board[x][y] == 0:
					screen.draw.filled_rect(cell, (255, 255, 255))
				else:
					screen.draw.filled_rect(cell, (0, 0, 0))

	def toggle_cell(self, x, y):
		"""Change a dead cell to a living one and vice versa."""
		if self.board[x][y] == 0:
			self.board[x][y] = 1
		else:
			self.board[x][y] = 0


life = Life(cells_per_dimension=50)

def draw():
	"""Called whenever the screen needs to be repainted."""
	screen.fill((255, 255, 255))
	life.draw()

def update():
	"""Called 60 times a second."""
	if life.running:                         # if we're running
		now = time.time()               # get the current time
		if now - life.last_time > 0.1:  # and the last generation is older than 100ms (10fps)
			life.generate()             # calculate a new generation

def on_mouse_down(pos, button):
	"""Called whenever the mouse button is clicked."""
	life.running = False
	if button is not mouse.RIGHT:
		life.toggle_cell(math.floor(pos[0]/life.w), math.floor(pos[1]/life.w))
	else:
		# right mouse to spawn glider
		glider = [ [0, 0, 1], [1, 0, 1], [0, 1, 1] ]
		cx,cy = math.floor(pos[0]/life.w), math.floor(pos[1]/life.w)
		cx -= 1; cy -= 1 # start from top left
		for x in range(3):
			for y in range(3):
				nx, ny = cx + x, cy + y
				if nx > len(life.board[0])-1:
					nx = x
				if ny > len(life.board[1])-1:
					ny = y

				life.board[nx][ny] = glider[y][x]

				


def on_key_down(key):
	"""Called whenever a key on the keyboard is pressed."""
	if key == keys.SPACE:
		life.generate()                 # Space: single step
	elif key == key.RETURN:
		life.running = not life.running           # Return: start/stop continuous generations
	elif key == keys.G:
		life.randomize()

pgzrun.go()
