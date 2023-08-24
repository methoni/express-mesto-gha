const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный _id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
// .catch((err) => {
//   if (err.name === 'CastError') {
//     res.status(400).send({ message: 'Передан некорректный _id' });
//   } else {
//     res
//       .status(404)
//       .send({ message: 'Пользователь по указанному _id не найден' });
//   }
// });
// };

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка' });
        }
      });
  } else {
    res
      .status(404)
      .send({ message: 'Пользователь по указанному _id не найден' });
  }
};
// .catch((err) => {
//   if (err.name === 'ValidationError') {
//     res.status(400).send({ message: err.message });
//   } else {
//     res
//       .status(404)
//       .send({ message: 'Пользователь по указанному _id не найден' });
//   }
// });
// } else {
// res.status(500).send({ message: 'На сервере произошла ошибка' });
// }
// };

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(500).send({ message: 'На сервере произошла ошибка' });
        }
      });
  } else {
    res
      .status(404)
      .send({ message: 'Пользователь по указанному _id не найден' });
  }
};

// .catch((err) => {
//   if (err.name === 'ValidationError') {
//     res.status(400).send({ message: err.message });
//   } else {
//     res
//       .status(404)
//       .send({ message: 'Пользователь по указанному _id не найден' });
//   }
// });
// } else {
// res.status(500).send({ message: 'На сервере произошла ошибка' });
// }
// };
