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
import { useAccount } from "wagmi";

import {
  preSaleToken,
  preSaleContractToken,
} from "./ConectivityAssets/enviorment";
import Toastify from "./Components/Tostify";
import Loading from "./Components/Loading";
import { CustomTextFeild } from "./Components/CustomTextFeild";

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
  const { address, isConnecting, isDisconnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [allowance, setAllowance] = useState(0);
  console.log("allowance", allowance);
  const [approveToken, setApproveToken] = useState(0);
  const [balance, setBalance] = useState(0);
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
      if (allowance >= amount && amount <= balance) {
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
      } else {
        if (allowance < amount) {
          showToast("Please Approve Token", "error");
        } else if (balance < amount) {
          showToast("Your Ammount is more then Contract balance", "error");
        }
      }
    } catch (err) {
      setLoading(false);

      console.log("buyToken Error", err);
      showToast(err.message, "error");
    }
  }, [allowance, amount, balance]);
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
      console.log("error bnb to token", error);
    }
  }, [amount]);
  const balanceOf = useCallback(async () => {
    try {
      const data = await readContract({
        address: preSaleToken,
        abi: preSaleTokenAbi,
        functionName: "balanceOf",
        args: [address],
      });
      const balance = Number(formatUnits(data.toString(), 18));
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  }, [address]);
  const decimal = useCallback(async () => {
    try {
      const decimals = await readContract({
        address: preSaleToken,
        abi: preSaleTokenAbi,
        functionName: "decimals",
      });
      // const balance = Number(formatUnits(data.toString(), 18));
      // console.log("decimals: " + decimals);
    } catch (error) {
      console.log("Error decimal", error);
    }
  }, []);
  const allownances = useCallback(async () => {
    try {
      const data = await readContract({
        address: preSaleToken,
        abi: preSaleTokenAbi,
        functionName: "allowance",
        args: [address, preSaleContractToken],
      });
      // console.log("data ....", data);
      const res = Number(formatUnits(data.toString(), 18));
      console.log("response", res);
      setAllowance(res);
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  const aproveToken = useCallback(async () => {
    try {
      // if (allowance <= 0) {
      setLoading(true);
      const amountInParse = parseUnits(approveToken.toString());
      const aprove = await writeContract({
        address: preSaleToken,
        abi: preSaleTokenAbi,
        functionName: "approve",
        args: [preSaleContractToken, amountInParse],
      });
      setLoading(false);
      const receipt = await waitForTransaction({ hash });
      showToast(" Token Approved SuccessFull", "success");
      console.log("aproval", aprove);
      // }
    } catch (error) {
      console.log(error);
    }
  }, [approveToken]);

  useEffect(() => {
    balanceOf();
    decimal();
    bnbToToken();
    allownances();
  }, [
    allowance,
    allownances,
    amount,
    aproveToken,
    balanceOf,
    bnbToToken,
    decimal,
  ]);

  return (
    <>
      <Loading isLoading={loading} />
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Navbar />
      <Box
        sx={{
          width: "100%",
          background: "  rgba(66,66,66,1) 35%,",
          p: { xs: 0, md: 5 },
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
                background: "#2F3142",
                borderRadius: "10px",
                py: 5,
                my: 10,
              }}
            >
              <Box
                sx={{
                  py: 5,
                  width: "100%",
                }}
              >
                <Typography
                  mb={2}
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: { xs: "1rem", md: "2rem" },
                  }}
                >
                  You have Total MTC : {balance}
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
                      alignItems: "start",
                      gap: "0px 20px",
                      width: { xs: "100%", md: "60%" },
                      flexDirection: "column",
                      p: 1,
                    }}
                  >
                    <Typography my={1}>Enter Approve Token</Typography>
                    <CustomTextFeild
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Enter Token For Approve"
                      value={approveToken}
                      onChange={(e) => setApproveToken(e.target.value)}
                    />
                    {/* <Box sx={{ width: "30%" }}>
                      <Button2 onClick={aproveToken}>Aprove</Button2>
                    </Box> */}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: "0px 20px",
                  width: { xs: "100%", md: "60%" },
                  p: 1,
                  flexDirection: "column",
                }}
              >
                <Typography my={1}>Enter Amount</Typography>
                <CustomTextFeild
                  id="outlined-basic"
                  variant="outlined"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter BNB"
                />
                {/* <Box width="150px">
                  <Button2 onClick={bnbToToken}>Convert</Button2>
                </Box> */}
              </Box>
              <Typography mt={5} sx={{ font: "bold" }}>
                BNB TO MiteyCoin : {miteyCoin}
              </Typography>
            </Box>
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
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Button1 onClick={() => setAmount(0)}>reset</Button1>
          <Button2 onClick={buyToken}>BUY MTC</Button2>
        </Box>
      </Box>
    </>
  );
};
