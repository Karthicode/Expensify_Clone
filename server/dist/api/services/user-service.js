"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = exports.findUserData = exports.findAllUsers = exports.deleteAllUsers = exports.deleteUserById = exports.findUserById = exports.updateUser = exports.addUser = void 0;
const index_1 = require("../models/index");
/**
 * @param {*} newData
 * @returns {Promise<User>}
 */
//invoked for adding a new item to the list
const addUser = (newData) => {
    const existingUser = index_1.User.exists(newData).exec();
    return existingUser.then((user) => {
        if (!user) {
            const newUser = new index_1.User(newData);
            return newUser.save();
        }
        else {
            return new Promise((resolve, reject) => {
                return resolve({
                    message: "user already exists",
                });
            });
        }
    });
};
exports.addUser = addUser;
//update the user details
const updateUser = (newData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = index_1.User.findByIdAndUpdate(id, newData, { new: true }).exec();
    return user.then((user) => {
        if (user) {
            return user;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
});
exports.updateUser = updateUser;
//finds and existing user record
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = index_1.User.findById(id).exec();
    return user.then((user) => {
        if (user) {
            return user;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
});
exports.findUserById = findUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    index_1.Expense.deleteMany({ user_id: id }).exec();
    index_1.Report.deleteMany({ user_id: id }).exec();
    const user = index_1.User.findByIdAndDelete(id).exec();
    return user.then((user) => {
        if (user) {
            return user;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
});
exports.deleteUserById = deleteUserById;
const deleteAllUsers = () => {
    index_1.Expense.deleteMany().exec();
    index_1.Report.deleteMany().exec();
    const users = index_1.User.deleteMany().exec();
    return users.then((users) => {
        if (users.acknowledged) {
            return users;
        }
        else {
            return {
                message: "no records found",
            };
        }
    });
};
exports.deleteAllUsers = deleteAllUsers;
const findAllUsers = () => {
    const users = index_1.User.find().exec();
    return users.then((users) => {
        if (users.length > 0) {
            return users;
        }
        else {
            return {
                message: "no records found",
            };
        }
    });
};
exports.findAllUsers = findAllUsers;
const findUserData = (email) => {
    return index_1.User.findOne({ email: email })
        .exec()
        .then((user) => {
        return index_1.Expense.find({ user_id: user === null || user === void 0 ? void 0 : user.id })
            .exec()
            .then((expenses) => {
            return index_1.Report.find({ user_id: user === null || user === void 0 ? void 0 : user.id })
                .exec()
                .then((reports) => {
                return index_1.Expense.aggregate([
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
                    console.log(groupedExpenses.includes(user === null || user === void 0 ? void 0 : user.id));
                    return {
                        user,
                        expenses: expenses,
                        reports: reports,
                        dashboard: groupedExpenses.filter((expense) => expense.user_id === (user === null || user === void 0 ? void 0 : user.id)),
                    };
                });
            });
        });
    });
};
exports.findUserData = findUserData;
const getDashboardData = (user_id, expense_id) => {
    return index_1.Expense.aggregate([
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
exports.getDashboardData = getDashboardData;
