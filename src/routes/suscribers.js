const { SuscriberService } = require('../services/suscribers');
const { strings } = require('../utils/lang/es');

const suscribersRouter = router => {
  const suscriberService = new SuscriberService();
  // eslint-disable-next-line no-unused-vars
  router.get('/suscribers', async (req, res, next) => {
    const storeSuscribers = await suscriberService.getSuscribers();
    res.status(200).json(storeSuscribers);
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/suscribers/:suscriberId', async (req, res, next) => {
    const { suscriberId } = req.params;
    const storeSuscriber = await suscriberService.getSuscriber(suscriberId);
    res.status(200).json(storeSuscriber);
  });

  // eslint-disable-next-line no-unused-vars
  router.post('/suscribers', async (req, res, next) => {
    const { body: suscriber } = req;
    const storeSuscriber = await suscriberService.createSuscriber(suscriber);
    res.status(201).json({
      suscriberId: storeSuscriber,
      message: strings.suscriber.created
    });
  });

  // eslint-disable-next-line no-unused-vars
  router.put('/suscribers/:suscriberId', async (req, res, next) => {
    const { body: suscriber } = req;
    const { suscriberId } = req.params;
    const updatedSuscriber = await suscriberService.updateSuscriber(
      suscriberId,
      suscriber
    );
    res
      .status(200)
      .json({ payload: updatedSuscriber, message: strings.suscriber.updated });
  });

  // eslint-disable-next-line no-unused-vars
  router.delete('/suscribers/:suscriberId', async (req, res, next) => {
    const { suscriberId } = req.params;
    const deletedSuscriber = await suscriberService.deleteSuscriber(
      suscriberId
    );
    res.status(200).json({
      payload: deletedSuscriber || suscriberId,
      message: strings.suscriber.deleted
    });
  });
};

module.exports = suscribersRouter;
