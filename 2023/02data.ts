export {}
export const input =
`Game 1: 7 green, 14 red, 5 blue; 8 red, 4 green; 6 green, 18 red, 9 blue
Game 2: 3 blue, 15 red, 5 green; 1 blue, 14 red, 5 green; 11 red; 4 green, 1 blue, 3 red; 4 green, 1 blue; 10 red, 1 green
Game 3: 11 green, 3 red; 4 green, 15 blue; 14 blue, 2 red, 10 green; 1 red, 3 green, 10 blue
Game 4: 1 green, 6 red, 11 blue; 3 blue, 12 red; 1 green, 14 red, 8 blue; 3 blue, 7 red; 8 blue, 5 red; 7 red, 1 green
Game 5: 14 green, 3 red, 3 blue; 2 red, 1 green, 1 blue; 8 green, 3 blue, 1 red; 15 green, 8 blue, 1 red
Game 6: 4 blue, 8 green, 5 red; 9 green, 10 blue, 7 red; 11 blue, 10 red, 7 green; 8 red, 6 blue, 9 green
Game 7: 5 green, 11 blue, 9 red; 2 green, 6 red, 12 blue; 8 red, 4 blue, 3 green; 7 green, 8 red, 9 blue; 8 green, 5 red
Game 8: 7 red, 12 green; 9 blue, 15 red, 8 green; 3 blue, 11 green, 6 red; 8 blue, 12 red, 5 green
Game 9: 8 blue, 6 red, 7 green; 2 blue, 3 red, 10 green; 10 blue, 6 red, 7 green; 11 red, 7 blue, 5 green; 10 red, 11 green
Game 10: 5 red, 14 green; 2 red, 6 blue, 15 green; 3 red, 4 blue, 7 green; 6 red, 1 green, 4 blue
Game 11: 4 blue, 11 green, 6 red; 12 red, 1 blue, 5 green; 7 red, 1 blue; 11 red, 2 green, 3 blue; 2 blue, 6 red, 7 green
Game 12: 1 green, 8 red, 3 blue; 3 green, 2 red; 2 blue, 5 red, 1 green
Game 13: 2 green; 8 green, 1 blue, 12 red; 1 blue, 14 green, 2 red; 1 blue, 6 red, 6 green; 7 green, 10 red
Game 14: 9 green, 4 red, 1 blue; 5 red, 2 green; 17 green, 1 red; 6 red, 10 green; 4 green, 3 red, 1 blue
Game 15: 7 green, 13 blue, 4 red; 1 blue, 7 green, 9 red; 13 blue, 13 red, 7 green; 8 red, 9 blue; 9 red, 14 blue; 2 green, 7 red, 9 blue
Game 16: 6 green, 18 blue, 6 red; 5 green, 2 blue, 2 red; 6 green, 2 red, 17 blue; 2 red, 2 green, 8 blue; 2 red, 10 blue
Game 17: 17 red, 8 green; 4 blue, 10 green, 3 red; 8 red, 5 green, 3 blue; 12 green, 3 red
Game 18: 6 red, 1 green, 14 blue; 1 red, 10 blue, 1 green; 1 red, 17 blue, 1 green; 5 red, 1 blue; 5 red, 18 blue; 2 red, 3 blue
Game 19: 5 blue, 12 red; 6 blue, 3 red, 6 green; 8 blue, 6 red, 6 green; 8 green, 8 blue, 2 red; 4 green, 6 red, 6 blue; 1 green, 3 red, 13 blue
Game 20: 7 green, 2 blue; 4 blue, 12 red, 2 green; 7 red, 2 green, 6 blue
Game 21: 8 green, 1 red; 1 red, 9 green; 1 red, 6 green, 4 blue; 1 red, 3 green, 5 blue; 2 red, 6 green
Game 22: 11 green, 12 red, 5 blue; 5 blue, 9 red, 11 green; 8 green, 4 red, 5 blue; 7 green, 1 blue, 1 red
Game 23: 11 blue, 9 red, 5 green; 3 green, 3 blue; 11 blue, 9 red, 1 green; 2 red, 7 green; 4 green, 3 blue, 1 red; 5 green, 4 blue
Game 24: 1 green, 4 blue, 9 red; 1 green, 2 blue, 11 red; 1 green, 13 red; 1 green, 2 blue, 3 red
Game 25: 1 red, 7 green, 4 blue; 2 red, 1 green, 3 blue; 10 blue, 1 red; 7 blue, 2 red, 6 green; 7 green, 15 blue, 2 red; 14 green, 13 blue
Game 26: 5 red, 2 blue; 9 red, 2 green, 12 blue; 15 red, 1 green, 5 blue; 1 green, 16 blue, 17 red
Game 27: 2 green, 4 red; 4 red, 1 green; 1 blue, 3 red; 2 red
Game 28: 3 green; 8 green, 9 red; 9 red, 3 blue, 10 green; 16 green, 4 blue, 4 red
Game 29: 3 green, 1 red, 7 blue; 5 blue, 5 green, 2 red; 5 blue, 6 green, 2 red; 2 green, 2 red, 4 blue; 1 green, 3 red, 8 blue
Game 30: 7 red, 3 green, 7 blue; 3 green, 10 red; 5 red, 5 blue, 1 green; 9 blue, 2 green, 7 red; 1 red, 10 blue; 10 blue, 2 red, 4 green
Game 31: 9 green, 1 red; 9 blue, 6 red, 9 green; 17 blue, 4 green, 10 red; 19 blue, 11 green
Game 32: 1 red, 1 blue, 6 green; 10 blue, 4 green; 1 red, 5 blue; 9 blue, 3 green
Game 33: 4 red; 3 red; 2 red, 1 green, 1 blue; 1 green; 1 blue, 1 red
Game 34: 2 green, 9 blue, 1 red; 5 blue, 7 green, 1 red; 2 green, 1 red, 16 blue; 1 blue, 5 green, 6 red
Game 35: 11 red, 10 blue; 2 blue, 12 green, 12 red; 3 green, 6 red, 6 blue; 14 blue, 10 green, 1 red
Game 36: 2 blue, 3 red, 15 green; 2 blue, 6 green, 2 red; 14 blue, 4 red, 7 green; 13 blue, 12 green, 2 red
Game 37: 6 green, 14 blue, 7 red; 7 blue, 2 red, 6 green; 1 blue, 2 green, 6 red
Game 38: 2 green, 15 red, 2 blue; 14 red, 1 blue; 14 red, 2 green, 12 blue
Game 39: 5 green, 1 blue, 10 red; 4 red, 3 blue, 7 green; 2 red, 2 green, 4 blue; 10 blue, 5 green
Game 40: 7 red, 10 green, 2 blue; 7 green, 3 red, 2 blue; 10 red, 9 blue, 7 green; 3 green, 5 blue, 10 red
Game 41: 5 blue, 2 green, 11 red; 2 green, 18 red, 3 blue; 8 green, 10 red, 1 blue; 16 red, 13 green; 17 green, 2 blue, 17 red; 1 green, 1 blue, 9 red
Game 42: 5 red, 2 green, 1 blue; 6 red, 2 blue; 3 red, 1 blue; 9 red, 5 blue; 1 green, 8 red, 1 blue
Game 43: 1 red, 2 green; 12 red, 4 green, 5 blue; 4 blue, 9 red; 4 green, 10 red, 2 blue
Game 44: 2 blue, 9 green, 3 red; 6 red, 4 blue, 4 green; 3 red, 4 blue; 5 red, 2 green, 1 blue; 4 blue, 1 green; 8 green, 1 red, 4 blue
Game 45: 7 blue, 1 red; 2 red, 4 green, 9 blue; 3 red, 15 blue; 4 red, 4 green, 12 blue; 1 red, 18 blue
Game 46: 4 red, 14 blue, 11 green; 5 blue, 6 red, 17 green; 10 red, 8 green, 17 blue; 7 red, 10 blue, 19 green
Game 47: 7 blue, 3 red; 7 blue, 1 green, 2 red; 2 red, 6 blue; 1 green, 9 blue, 2 red; 3 red; 2 green, 1 blue
Game 48: 12 red, 6 blue, 6 green; 9 green, 19 red, 1 blue; 2 blue, 12 green, 8 red
Game 49: 1 green, 11 red, 11 blue; 10 red, 10 blue, 11 green; 4 red, 19 green, 6 blue; 11 blue, 19 green, 13 red; 9 green, 9 blue
Game 50: 1 blue, 12 green, 4 red; 1 blue, 18 green, 1 red; 1 blue, 12 green, 3 red; 1 blue, 4 green
Game 51: 10 red, 5 blue, 1 green; 10 red, 4 blue; 6 red, 8 blue
Game 52: 1 blue; 5 green, 9 red; 2 blue, 1 green, 11 red; 2 blue, 13 red, 5 green; 6 green, 1 blue, 9 red
Game 53: 8 blue, 15 red; 2 green, 4 red, 12 blue; 6 blue, 1 green, 15 red; 20 red, 12 blue; 6 red, 1 green, 2 blue
Game 54: 5 red, 16 blue; 5 green, 3 red, 17 blue; 5 red, 3 blue, 5 green; 4 green, 6 blue, 9 red; 2 blue, 6 green, 2 red
Game 55: 1 blue, 1 red; 1 green, 1 red, 3 blue; 4 blue, 1 green, 1 red; 5 blue; 2 blue
Game 56: 4 red, 4 blue; 7 blue, 11 red; 1 red, 2 green, 9 blue; 4 blue, 16 red, 2 green; 1 red; 2 green, 5 blue, 1 red
Game 57: 1 green, 8 blue; 1 red; 10 blue, 5 green; 3 blue, 4 green; 11 blue, 1 red; 4 blue, 3 green, 1 red
Game 58: 8 green, 5 blue; 9 blue, 8 red, 5 green; 6 red, 6 blue, 9 green; 1 green, 5 blue, 2 red; 3 red, 3 green, 2 blue; 2 green, 1 red, 1 blue
Game 59: 15 red, 4 blue, 8 green; 12 red, 6 green; 3 red
Game 60: 14 blue, 11 red; 12 blue, 6 red; 11 blue, 6 red; 5 red, 13 blue; 15 blue; 1 green, 1 blue, 16 red
Game 61: 5 red, 1 green; 4 red, 9 green; 1 blue, 6 green, 14 red
Game 62: 19 red, 1 green; 1 blue, 3 red; 15 red, 1 blue; 1 blue, 3 red; 5 red, 1 green, 1 blue
Game 63: 1 red, 3 green, 10 blue; 2 green, 1 red, 14 blue; 1 green, 5 blue, 1 red; 6 blue, 4 green, 1 red
Game 64: 5 red, 2 green; 5 green, 2 red, 2 blue; 3 red, 3 blue, 1 green; 3 blue, 3 green, 3 red; 1 green, 3 red
Game 65: 13 red, 2 green, 3 blue; 1 red, 2 blue, 1 green; 1 blue; 2 green, 1 red
Game 66: 7 red, 12 blue, 6 green; 2 red, 5 green, 11 blue; 3 green, 2 blue, 2 red; 9 blue, 1 red, 2 green
Game 67: 4 red, 3 green, 7 blue; 8 blue, 3 red; 2 red; 9 blue, 5 red, 2 green
Game 68: 12 blue; 10 green, 5 blue; 8 blue; 9 blue, 7 red, 18 green; 5 red, 12 blue, 8 green; 8 green, 13 red, 10 blue
Game 69: 1 green, 1 red; 2 red, 1 green, 3 blue; 1 red, 1 green, 4 blue; 1 green, 8 red
Game 70: 12 green, 1 blue, 4 red; 8 green, 1 red; 1 blue, 8 green; 2 green, 3 red; 5 green, 4 red; 2 blue, 12 green, 1 red
Game 71: 10 blue, 4 red, 14 green; 6 green, 7 red, 8 blue; 1 red, 1 blue, 13 green; 10 red, 6 blue, 3 green; 8 blue, 7 green, 4 red
Game 72: 1 green; 1 blue, 12 green, 14 red; 3 blue, 7 green, 8 red; 12 red, 18 green; 13 green, 11 red, 1 blue; 2 blue, 6 green, 6 red
Game 73: 17 red, 3 green, 15 blue; 15 blue, 2 red; 15 red, 7 blue, 4 green; 9 blue, 1 green, 18 red
Game 74: 10 red, 2 blue; 1 blue, 7 red; 5 blue, 2 green, 2 red; 3 blue, 15 red, 3 green; 4 blue, 3 green, 13 red
Game 75: 6 blue, 10 red; 2 green, 2 blue, 10 red; 10 green, 1 blue, 10 red; 4 blue, 6 red, 11 green
Game 76: 10 blue, 1 red, 2 green; 6 blue, 2 green, 10 red; 3 red, 15 green, 1 blue
Game 77: 5 green, 1 red; 2 blue, 1 green; 13 green, 2 red, 5 blue; 12 green, 1 blue, 2 red; 3 blue, 2 green, 2 red
Game 78: 1 green, 16 red; 6 red, 1 blue, 1 green; 13 red; 12 red, 3 green; 1 blue, 7 red
Game 79: 3 green, 7 blue; 1 red, 8 blue, 5 green; 1 red, 6 green, 7 blue; 11 green, 1 red, 7 blue; 1 blue
Game 80: 3 green, 13 red, 8 blue; 17 red, 9 blue; 7 blue, 1 green, 2 red; 8 red, 6 blue, 3 green; 1 red, 2 blue; 2 green, 4 blue, 10 red
Game 81: 3 red, 1 green, 7 blue; 2 green, 2 blue, 3 red; 3 red, 1 blue, 7 green; 6 green, 12 blue
Game 82: 11 red, 3 green, 2 blue; 3 red, 1 green, 1 blue; 16 red, 1 green
Game 83: 8 green, 3 blue, 2 red; 1 blue, 13 green, 6 red; 4 blue, 5 red, 1 green; 12 green, 4 red, 12 blue; 17 green, 7 blue, 3 red
Game 84: 2 blue, 13 red, 5 green; 3 green, 3 blue, 19 red; 2 red, 11 green, 5 blue; 3 green, 3 blue, 15 red; 7 green, 4 blue, 11 red; 1 red, 10 green
Game 85: 1 red, 3 blue, 4 green; 2 red, 11 green, 2 blue; 2 blue, 7 green, 1 red
Game 86: 3 blue, 4 green, 8 red; 4 green, 2 red; 9 red, 4 blue, 1 green; 18 red, 1 blue
Game 87: 3 red, 14 blue, 1 green; 10 blue, 1 green; 1 green, 4 red, 14 blue; 8 blue, 7 green, 4 red; 2 green, 7 red, 7 blue; 2 green, 10 blue
Game 88: 12 green, 6 red; 6 red, 3 blue, 2 green; 4 red, 4 blue, 9 green; 3 red, 4 green, 8 blue; 1 blue, 3 red
Game 89: 3 green, 3 red, 2 blue; 3 red, 2 green, 1 blue; 6 green, 4 blue, 12 red; 13 red, 14 blue, 1 green; 5 red; 10 red, 8 blue, 7 green
Game 90: 7 green, 10 blue; 6 green, 1 red, 2 blue; 6 blue; 5 green, 9 blue, 1 red; 10 blue, 1 red, 6 green
Game 91: 6 red, 2 blue; 3 blue, 3 red, 1 green; 19 blue, 7 red
Game 92: 9 green, 3 blue; 1 red, 5 green; 13 green, 3 blue, 2 red; 1 red, 3 blue, 7 green
Game 93: 11 red, 3 green, 11 blue; 7 green, 3 red, 10 blue; 11 green, 4 blue, 8 red; 14 green, 8 blue
Game 94: 7 blue; 1 green, 11 blue, 2 red; 1 green, 1 red, 19 blue; 7 green, 2 red, 10 blue
Game 95: 15 blue, 1 red, 9 green; 5 green, 1 red, 4 blue; 6 green, 17 blue; 9 blue, 11 green; 10 blue, 9 green; 9 blue, 7 green
Game 96: 7 red, 13 blue; 6 blue, 15 red, 3 green; 1 green, 1 red, 1 blue; 9 red, 2 green, 8 blue; 5 green, 8 red, 1 blue; 6 blue, 3 green, 13 red
Game 97: 19 blue, 10 red, 4 green; 8 red, 17 blue; 8 blue
Game 98: 2 blue, 2 red, 4 green; 5 green, 3 blue, 2 red; 5 green, 15 blue; 15 blue, 5 green, 1 red
Game 99: 1 blue, 2 green, 8 red; 1 blue, 7 red, 1 green; 11 red, 2 green; 1 red, 1 blue
Game 100: 8 green; 2 red, 20 green; 12 green, 1 red, 1 blue; 4 red, 1 blue; 1 blue, 6 red`