import os, json, sys

def load(file):
    with open(file, 'r') as fi:
        data = fi.read()
    return json.loads(data)

def makeScript(name,content):
    with open(name, 'w') as fi:
        data = fi.write(content)
    return data

def plural(word):
    return word + "s"
