import React, { useState } from 'react';
import { Box, Button, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { AES, enc } from "crypto-js";

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setPlainText('');
    setEncryptKey('');
    setEncryptedText('');
    setDecryptKey('');
    setDecryptedText('');
    setTabValue(newValue);
  };

  const handleEncrypt = () => {
    // Encryption logic here
    if (plainText && encryptKey) {
      const encrypted = AES.encrypt(plainText, encryptKey);
      setEncryptedText(encrypted.toString());
    }
  };

  const handleDecrypt = () => {
    // Decryption logic here
    if (encryptedText && encryptKey) {
      const bytes = AES.decrypt(encryptedText, encryptKey);
      const decrypted = bytes.toString(enc.Utf8);
      setDecryptedText(decrypted);
    }
  };

  return (
    <GradientBackground>
      <Typography variant="h2" align="center" gutterBottom>
          Encryption & Decryption
      </Typography>
      <br/>
      <br/>
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
          <TextField multiline rows={4} fullWidth value={encryptedText} label="Encrypted Text" />
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
          <TextField multiline rows={4} fullWidth value={decryptedText} label="Plain Text" />
        </Box>
      </TabPanel>
    </GradientBackground>
  );
}

export default App;
