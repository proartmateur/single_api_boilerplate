from lib import *
from serviceMaker import *
from routeMaker import *
services_path = "./services/"
routes_path = "./routes/"

entities = load('entities.json')

for item in entities:
    name = plural(item) + ".js"
    name = os.path.join(services_path,name)
    makeScript(name,serviceMaker(item))
    name = plural(item) + ".js"
    name = os.path.join(routes_path,name)
    makeScript(name,routeMaker(item))