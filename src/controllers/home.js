
export const home = (req,res) => {
    let currentUser = req.user;
    if (!currentUser) {
      return res.status(409).json({
        message: `user not found...`
      });
    }
    res.status(200).json({
      user: currentUser
    }).redirect('home');
};