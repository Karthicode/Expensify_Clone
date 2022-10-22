import { Expense, Report, User } from "../models/index";

/**
 * @param {*} newData
 * @returns {Promise<User>}
 */

//invoked for adding a new item to the list
export const addUser = (newData: object) => {
  const existingUser = User.exists(newData).exec();
  return existingUser.then((user) => {
    if (!user) {
      const newUser = new User(newData);
      return newUser.save();
    } else {
      return new Promise((resolve, reject) => {
        return resolve({
          message: "user already exists",
        });
      });
    }
  });
};

//update the user details
export const updateUser = async (newData: object, id: string) => {
  const user = User.findByIdAndUpdate(id, newData, { new: true }).exec();
  return user.then((user) => {
    if (user) {
      return user;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

//finds and existing user record
export const findUserById = async (id: string) => {
  const user = User.findById(id).exec();
  return user.then((user) => {
    if (user) {
      return user;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

export const deleteUserById = async (id: string) => {
  Expense.deleteMany({ user_id: id }).exec();
  Report.deleteMany({ user_id: id }).exec();

  const user = User.findByIdAndDelete(id).exec();
  return user.then((user) => {
    if (user) {
      return user;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

export const deleteAllUsers = () => {
  Expense.deleteMany().exec();
  Report.deleteMany().exec();
  const users = User.deleteMany().exec();
  return users.then((users) => {
    if (users.acknowledged) {
      return users;
    } else {
      return {
        message: "no records found",
      };
    }
  });
};

export const findAllUsers = () => {
  const users = User.find().exec();
  return users.then((users) => {
    if (users.length > 0) {
      return users;
    } else {
      return {
        message: "no records found",
      };
    }
  });
};

export const findUserData = (email: any) => {
  return User.findOne({ email: email })
    .exec()
    .then((user) => {
      return Expense.find({ user_id: user?.id })
        .exec()
        .then((expenses) => {
          return Report.find({ user_id: user?.id })
            .exec()
            .then((reports) => {
              return Expense.aggregate([
                // {
                //   $match: {
                //     user_id: user?.id,
                //   },
                // },
                {
                  $group: {
                    _id: {
                      category: "$category",
                      user_id: "$user_id",
                    },
                    count: {
                      $sum: 1,
                    },
                  },
                },
                {
                  $project: {
                    category: "$category",
                  },
                },
              ])
                .exec()
                .then((groupedExpenses) => {
                  console.log(groupedExpenses.includes(user?.id));

                  return {
                    user,
                    expenses: expenses,
                    reports: reports,
                    dashboard: groupedExpenses.filter(
                      (expense) => expense.user_id === user?.id
                    ),
                  };
                });
            });
        });
    });
};

export const getDashboardData = (user_id: any, expense_id: any) => {
  return Expense.aggregate([
    {
      $match: {
        user_id: user_id,
      },
    },
    {
      $group: {
        _id: {
          category: "$category",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        category: "$category",
        user_id: "$user_id",
        expense_id: "$expense_id",
      },
    },
  ])
    .exec()
    .then((data) => data);
};
