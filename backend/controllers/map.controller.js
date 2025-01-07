const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddress(address);
    res.status(200).json(coordinates);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { origin, destination } = req.query;
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try{}
    catch(err){
        res.status(404).json({ message: err.message });
    }
}

module.exports.getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try{
        const { input } = req.query;
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions);
  }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }