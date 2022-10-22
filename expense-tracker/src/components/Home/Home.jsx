import React, { useEffect, useState } from "react";
import { groupedUserData } from "../../apicalls/user-apicalls";
import { actions } from "../../store/actions";
import { useDataFromStore } from "../../store/state/StateProvider";
import MiniDrawer from "../MUIComponents/MiniDrawer";

export const Home = () => {
  const [{ user }, dispatch] = useDataFromStore();

  console.log(user);

  return (
    <>
      <MiniDrawer />
    </>
  );
};
