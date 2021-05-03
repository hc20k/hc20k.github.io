# install Pygame Zero with: pip install pgzero
# docs: https://pygame-zero.readthedocs.io/

import pgzrun
import math

WIDTH = 400   # window dimensions
HEIGHT = 400

# Rule 145 looks really cool. It kind of looks like a fleet of spaceships.
# Rule 190 looks nice as well. Especially with the wrap around behavior. It looks a bit like one of those scrolling poles they have at barber's shops.
# I really liked rule 120. It reminds me of what happens when a game's memory is corrupted.

rule = input("Input a rule number: ")

class Cell:
	def __init__(self, x, y, w, status):
		self.x = x
		self.y = y
		self.w = w
		self.color = (0, 0, 0) if status == 0 else (100, 150, 255)
		self.update_rect()

	def update_rect(self):
		self.rect = Rect((self.x, self.y), (self.w, self.w))

class CA:
	def __init__(self, cells=[1], num_cells = 100, rule=90):
		self.cells = [0] * (math.floor((num_cells-len(cells))/2)) + cells + [0] * (math.ceil((num_cells-len(cells))/2))
		# self.ruleset = [0, 1, 0, 1, 1, 0, 1, 0]  # rule 90
		self.ruleset = self.ruleset_from_num(rule)
		self.w = WIDTH / num_cells               # size of a cell in px
		self.generation = 0                      # current generation
		self.draw_cells = []
		self.finished_draw = False

	def ruleset_from_num(self, i):
		i = int(i)
		b8 = format(i,'08b') # convert to 8 bit binary
		b8 = [int(char) for char in b8] # convert to list of ints
		return b8

	def generate(self):
		"""Calculate a new generation of cells from the current ones."""
		nextgen = self.cells.copy()
		for i in range(len(self.cells)):
			same  = self.cells[i]

			# wrap around
			if i+1 < len(self.cells):
				right = self.cells[i+1]
			else:
				right = self.cells[0]

			if i-1 >= 0:
				left = self.cells[i-1]
			else:
				left = self.cells[len(self.cells)-1]
			
			nextgen[i] = self.rules(left, same, right)
		self.cells = nextgen
		self.generation += 1

		for i in range(len(self.cells)):
			self.draw_cells.append(Cell(i*self.w, HEIGHT,self.w,self.cells[i]))
			
	def rules(self, left, same, right):
		"""Lookup a rule by a given neighborhood of cells."""
		rule = left << 2 | same << 1 | right
		return self.ruleset[rule]

	def scroll(self):
		# shift all rects up 1 on y
		for i,cell in enumerate(self.draw_cells):
			cell.y -= cell.w
			cell.update_rect()
			if cell.y < 0:
				self.draw_cells.pop(i)

	def draw(self):
		"""Draw the current generation to the screen."""
		for i,cell in enumerate(self.draw_cells):
			screen.draw.filled_rect(cell.rect, cell.color)

	def draw_ruleset(self):
		"""Draw the ruleset to the screen."""
		for rule in range(8):
			for bit in range(3):
				if rule & (1 << bit):
					screen.draw.filled_rect(Rect((WIDTH-10-rule*50-(1+bit)*10, HEIGHT-30), (10, 10)), (0, 0, 0))
				else:
					screen.draw.rect(Rect((WIDTH-10-rule*50-(1+bit)*10, HEIGHT-30), (10, 10)), (0, 0, 0))
			if self.ruleset[rule] == 0:
				screen.draw.rect(Rect((WIDTH-rule*50-30, HEIGHT-20), (10, 10)), (0, 0, 0))
			else:
				screen.draw.filled_rect(Rect((WIDTH-rule*50-30, HEIGHT-20), (10, 10)), (0, 0, 0)) 

def update():
	ca.scroll()

def draw():
	screen.fill((0, 0, 0))
	ca.draw()
	ca.generate()

ca = CA(rule=rule)

pgzrun.go()
