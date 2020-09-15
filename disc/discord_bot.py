
import requests
import os
from json import dumps
import discord
from discord.ext import commands
import time
import asyncio
import time
import random
from discord import Spotify


bot = commands.Bot(command_prefix = "!")


#def get_new()
'''
def check_if_new(prevs,prevst,s,st):
	if asl == prev:
		check_if_new(prev,get_new())
	else:
		send_req(asl)
def do_shit(s,art,prev_s,prev_art):
	curr_s= s
	curr_art=art
	if (s != prev_s) or (art != prev_art):
		print(s,art)
	else:
		pass
'''
	#print(s,art)



@bot.event
async def on_ready():
    print("Bot is ready!")






@bot.command()
async def spotify(ctx, user: discord.Member=None):
	#user = user or ctx.author
	#curr_t = "t"
	#curr_art = "t"
	count = 0
	while (count < 5):
		#print("================================")
		#print("CURRENT: " ,curr_t,curr_art)
		#print("================================")
		#time.sleep(5)
		#print(user)
		for activity in user.activities:
			#print("it worked")
			if isinstance(activity, Spotify):
				#print(activity.title,activity.artist)
				#time.sleep(0.2)
				#await ctx.send(f"{user} is listening to {activity.title} by {activity.artist}")
				
				#await ctx.send("a")
				print(activity.title,activity.artist)
				count+=1


bot.run('NzUzOTY3MzAxMjkxNjcxNjMy.X1t4xA.kUp4qfFoB7j0kleGh_ouJlv8VR0')
