from lib import *
from serviceMaker import *
services_path = "./services/"
routes_path = "./routes/"

entities = load('entities.json')

for item in entities:
    name = plural(item) + ".js"
    name = os.path.join(services_path,name)
    makeScript(name,serviceMaker(item))
    