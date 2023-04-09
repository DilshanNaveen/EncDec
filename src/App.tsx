import React, { useState } from 'react';
import { Box, Button, Container, Tab, Tabs, TextField, Typography, Snackbar, Alert as MuiAlert, IconButton, InputAdornment } from '@mui/material';
import styled from '@emotion/styled';
import { AES, enc } from "crypto-js";
import FileCopyIcon from '@mui/icons-material/FileCopy';

const GradientBackground = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [plainText, setPlainText] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [alert, setAlert] = useState<any>({ open: false, message: '', severity: 'error' });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setPlainText('');
    setEncryptKey('');
    setEncryptedText('');
    setDecryptKey('');
    setDecryptedText('');
    setTabValue(newValue);
  };

  const showAlert = (message: string, severity: 'error' | 'success') => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleEncrypt = () => {
    // Encryption logic here
    if (!plainText) {
      showAlert('Please enter plain text to encrypt.', 'error');
      return;
    }
    if (!encryptKey) {
      showAlert('Please enter a key for encryption.', 'error');
      return;
    }

    const encrypted = AES.encrypt(plainText, encryptKey);
    setEncryptedText(encrypted.toString());
  };

  const handleDecrypt = () => {
    // Decryption logic here
    if (!encryptedText) {
      showAlert('Please enter encrypted text to decrypt.', 'error');
      return;
    }
    if (!decryptKey) {
      showAlert('Please enter a key for decryption.', 'error');
      return;
    }

    const bytes = AES.decrypt(encryptedText, decryptKey);
    const decrypted = bytes.toString(enc.Utf8);
    setDecryptedText(decrypted);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setAlert({
        open: true,
        message: 'Text copied to clipboard!',
        severity: 'success',
      });
    } catch (err) {
      setAlert({
        open: true,
        message: 'Failed to copy the text!',
        severity: 'error',
      });
    }
  };

  return (
    <GradientBackground>
      <Typography variant="h2" align="center" gutterBottom>
        Encryption & Decryption
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        This web app allows you to securely encrypt and decrypt text using the AES encryption algorithm. Enter the plain text and a secret key to encrypt the text. To decrypt the encrypted text, provide the same secret key used for encryption.
      </Typography>
      <br />
      <br />
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Encrypt plain text" />
        <Tab label="Decrypt text with key" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box mt={1}>
          <Typography variant="h6">Plain Text</Typography>
        </Box>
        <Box mt={1}>
          <TextField multiline label="Plain Text" rows={4} fullWidth value={plainText} onChange={(e) => setPlainText(e.target.value)} />
        </Box>
        <Box mt={2}>
          <TextField type='password' label="Key" value={encryptKey} onChange={(e) => setEncryptKey(e.target.value)} />
          <Button onClick={handleEncrypt}>Encrypt</Button>
        </Box>
        <Box mt={1}>
          <Typography variant="h6">Encrypted Text</Typography>
        </Box>
        <Box mt={1}>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={encryptedText}
            label="Encrypted Text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleCopy(encryptedText)}>
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>

      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box mt={1}>
          <Typography variant="h6">Encrypted Text</Typography>
        </Box>
        <Box mt={1}>
          <TextField multiline rows={4} label="Encrypted Text" fullWidth value={encryptedText} onChange={(e) => setEncryptedText(e.target.value)} />
        </Box>
        <Box mt={2}>
          <TextField type='password' label="Key" value={decryptKey} onChange={(e) => setDecryptKey(e.target.value)} />
          <Button onClick={handleDecrypt}>Decrypt</Button>
        </Box>
        <Box mt={1}>
          <Typography variant="h6">Decrypted Text</Typography>
        </Box>
        <Box mt={1}>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={decryptedText}
            label="Plain Text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleCopy(decryptedText)}>
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </TabPanel>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert onClose={handleCloseAlert} severity={alert.severity} elevation={6} variant="filled">
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </GradientBackground>
  );
}

export default App;

