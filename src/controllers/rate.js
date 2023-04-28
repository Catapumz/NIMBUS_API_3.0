const Bloques_vias = require("../models/Bloques_vias");

const rating = async (req, res) => {
  const id = req.params.id;
  const rate = parseInt(req.params.rate);
  const idUser = req.user.id;
  const route = await Bloques_vias.findById(id);

  if (route.rated_by.includes(idUser)) {
    return res.status(400).json({
      mensaje: "Este usuario ya ha rateado la via",
    });
  } else if (!route.rated_by.includes(idUser)) {
    const params = {};
    params.rated_times = route.rated_times + 1;
    params.rating_points = route.rating_points + rate;
    const rating = params.rating_points / params.rated_times;
    params.rating = rating;
    params.rated_by = route.rated_by;
    params.rated_by.push(idUser);

    const itinerarioActualizado = await Bloques_vias.findByIdAndUpdate(
      id,
      params,
      { new: true }
    );
    return res.status(200).json({
      itinerario: itinerarioActualizado,
      mensaje: "Itinerario rateado con exito",
    });
  }
};

module.exports = { rating };
