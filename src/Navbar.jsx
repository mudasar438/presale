import { Box, Button, Typography } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import React, { useState } from "react";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { logo } from "./images";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  // const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  // const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect" : "Connect Custom";

  // async function onOpen() {
  //   setLoading(true);
  //   await open();
  //   setLoading(false);
  // }

  // function onClick() {
  //   if (isConnected) {
  //     disconnect();
  //   } else {
  //     onOpen();
  //   }
  // }
  return (
    // <Box sx={{width:"100%", display:'flex', justifyContent:"space-between",alignItems:"center}}>
    //   // <Typography variant="h5" sx={{ color: "white" }}>
    //   //   Web3Wallet
    //   // </Typography>
    //   // <Web3Button>{loading ? "Loading..." : label}</Web3Button>
    //   {/* <Button variant="contained">Connect Wallet</Button> */}
    // </Box>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        py: 2,
      }}
    >
      <Box>
        <img
          src={logo}
          alt=""
          srcSet=""
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      </Box>
      <Web3Button>{loading ? "Loading..." : label}</Web3Button>
    </Box>
  );
};

export default Navbar;
