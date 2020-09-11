
import requests
import os
from json import dumps
import discord
from discord.ext import commands
import time
import asyncio
import random
from discord import Spotify


bot = commands.Bot(command_prefix = "!")

@bot.event
async def on_ready():
    print("Bot is ready!")




@bot.command()
async def spotify(ctx, user: discord.Member=None):
	#user = user or ctx.author
	while True:
		print(user)
		for activity in user.activities:
			#print("it worked")
			if isinstance(activity, Spotify):
				#send(activity.title,activity.artist)
				#<----TODO--->
				#await ctx.send(f"{user} is listening to {activity.title} by {activity.artist}")


bot.run('NzUzOTY3MzAxMjkxNjcxNjMy.X1t4xA.rhf5kKpsGhsyk34VXKayJdDxK20')
