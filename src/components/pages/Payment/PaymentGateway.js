import React, { useState } from "react";
import axios from "axios";

const PaymentGateway = () => {
  const amount = 100;
  const productinfo = "Test Product";
  const firstname = "John Doe";
  const email = "john.doe@example.com";
  const phone = "1234567890";

  const [hash, setHash] = useState("");
  const [txnid, setTxnid] = useState("");
  const [key, setKey] = useState("");
  const [surl, setSurl] = useState("");
  const [furl, setFurl] = useState("");

  const generateHash = async () => {
    try {
      const response = await axios.post("/api/generate-payu-hash", {
        amount,
        productinfo,
        firstname,
        email,
        phone,
      });
      setHash(response.data.hash);
      setTxnid(response.data.txnid);
      setKey(response.data.key);
      setSurl(response.data.surl);
      setFurl(response.data.furl);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyPayment = async () => {
    try {
      const response = await axios.post("/api/verify-payment", {
        status: "success",
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        hash,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div>
        <button onClick={generateHash}>Generate Hash</button>
        <button onClick={verifyPayment}>Verify Payment</button>
        {hash && key && txnid && surl && furl && (
          <form action="https://secure.payu.in/_payment" method="post">
            <input type="hidden" name="key" value={key} />
            <input type="hidden" name="txnid" value={txnid} />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="productinfo" value={productinfo} />
            <input type="hidden" name="firstname" value={firstname} />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="surl" value={surl} />
            <input type="hidden" name="furl" value={furl} />
            <input type="hidden" name="hash" value={hash} />
            <button type="submit">Make Payment</button>
          </form>
        )}
      </div>
    
  );
};

export default PaymentGateway;