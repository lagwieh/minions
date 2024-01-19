const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body
  const totalDollars = Number(idea.numWeeks)*Number(idea.weeklyRevenue);
  console.log("total ",totalDollars )
  try {

    if(totalDollars < 1000000 || !idea.numWeeks || !idea.weeklyRevenue || !Number(idea.numWeeks) || !Number(idea.weeklyRevenue))
    {
      res.status(400).send();
    }else{
      next();
    }
    
  } catch (error) {
    next(error)
  }

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
