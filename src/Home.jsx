import { Box, Grid, TextField, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { Button1 } from "./Components/Button1";
import { Button2 } from "./Components/Button2";
import { useCallback, useEffect, useState } from "react";
import { waitForTransaction } from "@wagmi/core";
import { readContract, writeContract } from "wagmi/actions";
import preSaleTokenAbi from "./ConectivityAssets/preSaleTokenAbi.json";
import preSaleContractAbi from "./ConectivityAssets/preSaleContractAbi.json";
import { ethers } from "ethers";
const { parseUnits, formatUnits } = ethers.utils;

import {
  preSaleToken,
  preSaleContractToken,
} from "./ConectivityAssets/enviorment";
import Toastify from "./Components/Tostify";
import Loading from "./Components/Loading";

const array = [
  {
    name: "0.001",
    value: 0.001,
  },
  {
    name: "100",
    value: 100,
  },
  {
    name: "200",
    value: 200,
  },
  {
    name: "300",
    value: 300,
  },
  {
    name: "400 ",
    value: 400,
  },
  {
    name: "500 ",
    value: 500,
  },
];

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };

  const [amount, setAmount] = useState(0);
  const [miteyCoin, setMiteyCoin] = useState(0);

  const buyToken = useCallback(async () => {
    try {
      setLoading(true);
      const amountInParse = parseUnits(amount.toString());
      console.log(amountInParse);
      const { hash } = await writeContract({
        address: preSaleContractToken,
        abi: preSaleContractAbi,
        functionName: "buyToken",
        // args: [amountInParse],
        value: amountInParse,
      });
      setLoading(false);
      const receipt = await waitForTransaction({ hash });
      // eslint-disable-next-line no-undef
      showToast("transaction success", "success");
    } catch (err) {
      setLoading(false);

      console.log("buyToken Error", err);
      showToast(err.message, "error");
    }
  }, [amount]);
  const bnbToToken = useCallback(async () => {
    try {
      const amountInParse = parseUnits(amount.toString());
      const data = await readContract({
        address: preSaleContractToken,
        abi: preSaleContractAbi,
        functionName: "bnbToToken",
        args: [amountInParse],
      });
      const MiteyCoin = Number(formatUnits(data.toString(), 18));
      setMiteyCoin(MiteyCoin);
    } catch (error) {
      console.log(error);
    }
  }, [amount]);
  // const balanceOf = useCallback(async () => {
  //   try {
  //     const data = await readContract({
  //       address: preSaleToken,
  //       abi: preSaleTokenAbi,
  //       functionName: "balanceOf",
  //       args: [address],
  //     });
  //     const balance = Number(formatUnits(data.toString(), 18));
  //     console.log("balance: " + balance);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [address]);

  useEffect(() => {
    // balanceOf();
    bnbToToken();
  }, [amount, bnbToToken]);

  return (
    <>
      <Loading isLoading={loading} />
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Navbar />
      <Box
        sx={{
          width: "100%",
          background: "  rgba(66,66,66,1) 35%,",
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px 0px",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", md: "4rem" },
                fontWeight: "600",
                letterSpacing: "1.5rem",
                textAlign: "center",
              }}
            >
              DEPOSIT
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 20px",
                  width: "60%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Enter BNB"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{
                    width: "100%",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    borderRadius: "5px",
                    "& label.Mui-focused": {
                      color: "#fff",
                    },
                    "& .MuiInputLabel": {
                      root: {
                        color: "#ff0000", // Change this to your desired label color
                      },
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#fff",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                    "&input": {
                      "&::placeholder": {
                        textOverflow: "ellipsis !important",
                        color: "#fff",
                      },
                    },
                    "& input": {
                      color: "white",
                      fontSize: { xs: "12px", md: "14px" },
                    },
                    background: "#000",
                  }}
                />
                {/* <Box width="150px">
                  <Button2 onClick={bnbToToken}>Convert</Button2>
                </Box> */}
              </Box>
              <Typography mt={5} sx={{ font: "bold" }}>
                BNB TO MiteyCoin : {miteyCoin}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.4rem" },
                fontWeight: "400",
                textAlign: "center",
                my: 2,
              }}
            >
              DEPOSIT MIN 500 TRX MAX 300 TRX FREE
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Box
              sx={{
                background: "linear-gradient(to right, #c0392b, #8e44ad)",
                p: "3px",
                width: { xs: "100%", md: "60%" },
              }}
            >
              <Box sx={{ background: "#181818" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "2rem" },
                    fontWeight: "500",
                    textAlign: "center",
                    p: { xs: 1, md: 1 },
                  }}
                >
                  {amount} BNB
                </Typography>
              </Box>
            </Box> */}
          </Grid>
        </Grid>
        <Grid container rowSpacing={3} spacing={2}>
          {array.map((item, i) => {
            return (
              <Grid
                key={i}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button1
                  onClick={() => {
                    setAmount(item.value);
                  }}
                >
                  {item.name} BNB
                </Button1>
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px 20px",
            width: "50%",
          }}
        >
          <Button1 onClick={() => setAmount(0)}>reset</Button1>
          <Button2 onClick={buyToken}>BUY Mitey</Button2>
        </Box>
      </Box>
    </>
  );
};
