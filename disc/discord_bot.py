
import requests
import os
from json import dumps
import discord
from discord.ext import commands,tasks
import time
import asyncio
import time
import random
import urllib.parse
from discord.ext.commands import Bot, has_permissions, CheckFailure
from discord import Spotify
from bs4 import BeautifulSoup as bs
import urllib.request
import requests
import re

bot = commands.Bot(command_prefix = "!")
def search_song(song):

	#print("searching song: "+song)
	song = urllib.parse.quote(song)
	html = urllib.request.urlopen("https://www.youtube.com/results?search_query="+song)
	video_ids = re.findall(r"watch\?v=(\S{11})", html.read().decode())
	#print(video_ids)
	try:
		return video_ids[0]
	except Exception as e:
		return "7achwa"


def send_request(user,song_id):
	data= {"id": user,"song": song_id}
	url = "https://mtogether.herokuapp.com/create"
	s = requests.post(url,data=data)


@bot.event
async def on_ready():
	#testing.start(ctx)
	print("Bot is ready!")







@bot.event
async def on_member_update(before, after):
	if "tracked_bish" in [x.name for x in before.roles] or "tracked_bish" in [x.name for x in after.roles]:
		spo_after_act=""
		spo_before_act=""
		for act in before.activities:
			if isinstance(act,Spotify):
				spo_before_act = act
		for acti in after.activities:
			if isinstance(acti,Spotify):
				spo_after_act = acti

		if spo_before_act != spo_after_act:  # to only run on statu
			full_song_name = spo_after_act.artist+ " " + spo_after_act.title
			print(full_song_name)
			song_id = search_song(full_song_name)
			send_request(str(before.id),song_id)



@bot.command(pass_context = True)
@has_permissions(administrator=True)
async def give_role(ctx):
	try:
		author = ctx.message.author
		guild = ctx.guild
		await guild.create_role(name="tracked_bish")
		role = discord.utils.get(ctx.guild.roles, name="tracked_bish")
		await author.add_roles(role)
		await ctx.send("role has been fucking given!")
	except Exception as e:
		await ctx.send("Yo wtf nigga where my role at!")



bot.run('NzUzOTY3MzAxMjkxNjcxNjMy.X1t4xA.UQrCiw21B_vRsVy8iZjiU9GgCbY')
