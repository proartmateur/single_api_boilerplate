from lib import *

def routeMaker(item):
    className = plural(item.capitalize())
    classNameSingular = item.capitalize()
    itemName = plural(item)

    template = """
const { """+classNameSingular+"""Service } = require('../services/"""+itemName+"""');
const { strings } = require('../utils/lang/es');
"""
    template += """
const """+itemName+"""Router = router => {
  const """+item+"""Service = new """+classNameSingular+"""Service();
  // eslint-disable-next-line no-unused-vars
  router.get('/"""+itemName+"""', async (req, res, next) => {
    const store"""+className+""" = await """+item+"""Service.get"""+className+"""();
    res.status(200).json(store"""+className+""");
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/"""+itemName+"""/:"""+item+"""Id', async (req, res, next) => {
    const { """+item+"""Id } = req.params;
    const store"""+classNameSingular+""" = await """+item+"""Service.get"""+classNameSingular+"""("""+item+"""Id);
    res.status(200).json(store"""+classNameSingular+""");
  });

  // eslint-disable-next-line no-unused-vars
  router.post('/"""+itemName+"""', async (req, res, next) => {
    const { body: """+item+""" } = req;
    const store"""+classNameSingular+""" = await """+item+"""Service.create"""+classNameSingular+"""("""+item+""");
    res.status(201).json({ """+item+"""Id: store"""+classNameSingular+""", message: strings."""+item+""".created });
  });

  // eslint-disable-next-line no-unused-vars
  router.put('/"""+itemName+"""/:"""+item+"""Id', async (req, res, next) => {
    const { body: """+item+""" } = req;
    const { """+item+"""Id } = req.params;
    const updated"""+classNameSingular+""" = await """+item+"""Service.update"""+classNameSingular+"""(
      """+item+"""Id,
      """+item+"""
    );
    res
      .status(200)
      .json({ payload: updated"""+classNameSingular+""", message: strings."""+item+""".updated });
  });

  // eslint-disable-next-line no-unused-vars
  router.delete('/"""+itemName+"""/:"""+item+"""Id', async (req, res, next) => {
    const { """+item+"""Id } = req.params;
    const deleted"""+classNameSingular+""" = await """+item+"""Service.delete"""+classNameSingular+"""("""+item+"""Id);
    res.status(200).json({
      payload: deleted"""+classNameSingular+""" || """+item+"""Id,
      message: strings."""+item+""".deleted
    });
  });
};

module.exports = """+itemName+"""Router;
"""

    return template

