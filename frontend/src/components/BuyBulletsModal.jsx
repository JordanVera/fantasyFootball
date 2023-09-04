import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { BACKEND_URL } from '../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { buyBullets } from '../features/auth/authSlice';

const BuyBulletsModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { user, users } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   console.log('user');
  //   console.log(user);
  // }, []);

  const options = [];
  for (let i = 1; i <= 20; i++) {
    options.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();

    dispatch(buyBullets({ data, user }));
    console.log(data.bulletCount);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Buy Bullets
        </Typography>
        <Button
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          ×
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          ***This is a cryptocurrency pool, each entry (or bullet) is $60. After
          you submit the form you will be redirected to a checkout page, where
          you can select multiple coins to checkout with.***
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          {/* <img
            className="crypto-logo-sm"
            src="/images/bitcoinLogo.png"
            alt="bitcoinLogo"
          />
          <img
            className="crypto-logo-sm"
            src="/images/ethereumLogo.png"
            alt="ethereumLogo"
          />
          <img
            className="crypto-logo-sm"
            src="/images/litecoinLogo.png"
            alt="litecoinLogo"
          />
          <img
            className="crypto-logo-sm"
            src="/images/rippleLogo.png"
            alt="rippleLogo"
          />
          <img
            className="crypto-logo-sm"
            src="/images/stellarLumensLogo.png"
            alt="stellarLumensLogo"
          /> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ width: '100%', mb: 2 }}>
            <InputLabel>How many bullets do you want?</InputLabel>
            <Select name="bulletCount" {...register(`bulletCount`)}>
              {options}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Save changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BuyBulletsModal;
