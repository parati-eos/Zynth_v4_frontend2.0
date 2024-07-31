import React, { useState } from 'react';
import axios from 'axios';

const PaymentGateway = () => {
  const amount = 100;
  const productinfo = 'Test Product';
  const firstname = 'adarsha';
  const email = 'adarsha.halder02@gmail.com';
  const phone = '1234567890';

  const [hash, setHash] = useState('');
  const [txnid, setTxnid] = useState('');
  const [key, setKey] = useState('');
  const [surl, setSurl] = useState('');
  const [furl, setFurl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const generateHash = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate-payu-hash', {
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
      setMessage('Hash generated successfully. You can now make the payment.');
    } catch (error) {
      setError('Failed to generate hash. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/verify-payment', {
        status: 'success',
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        hash,
      });
      setMessage(response.data.verified ? 'Payment verified successfully.' : 'Payment verification failed.');
    } catch (error) {
      setError('Failed to verify payment. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateHash} disabled={loading}>
        {loading ? 'Generating Hash...' : 'Generate Hash'}
      </button>
      <button onClick={verifyPayment} disabled={loading || !hash}>
        {loading ? 'Verifying Payment...' : 'Verify Payment'}
      </button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
