import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Grid, Paper, TextField, styled, Container } from "@mui/material";
import { AES, enc } from "crypto-js";


function App() {
  const [content, setContent] = useState<string>();
  const [key, setKey] = useState<string>();
  const [encrypted, setEncrypted] = useState<string>();

  const encrypt = () => {
    if (content && key) {
      const encrypted = AES.encrypt(content, key);
      setEncrypted(encrypted.toString());
    }
  };

  const decrypt = () => {
    if (encrypted && key) {
      const bytes = AES.decrypt(encrypted, key);
      const decrypted = bytes.toString(enc.Utf8);
      setContent(decrypted);
    }
  };

  return (
    <Container style={{ padding: 200 }}>
      <Grid container>
        <Grid xs={3}>
            <TextField
              id="outlined-basic"
              label="Content"
              multiline
              variant="outlined"
              onKeyUp={(e: any) => setContent(e.target.value)}
              fullWidth
              rows={4}
            />
        </Grid>
        <Grid xs={3}>
            <TextField
              id="filled-basic"
              label="Password/Key"
              variant="outlined"
              multiline
              onKeyUp={(e: any) => setKey(e.target.value)}
              fullWidth
              rows={4}
            />
        </Grid>
        <Grid xs={3}>
            <TextField
              id="standard-basic"
              label="Encrypted Text"
              variant="standard"
              multiline
              value={encrypted}
              focused
              fullWidth
              rows={4}
            />
        </Grid>
        <Grid xs={3}>
            <Button variant="contained" onClick={encrypt}>
              Encrypt
            </Button>
        </Grid>

        <Grid xs={3}>
            <TextField
              id="standard-basic"
              label="Encrypted Text"
              variant="standard"
              multiline
              rows={4}
              onKeyUp={(e: any) => setEncrypted(e.target.value)}
            />
        </Grid>
        <Grid xs={3}>
            <TextField
              id="filled-basic"
              label="Password/Key"
              variant="filled"
              multiline
              onKeyUp={(e: any) => setKey(e.target.value)}
              rows={4}
            />
        </Grid>
        <Grid xs={3}>
            <TextField
              id="outlined-basic"
              label="Content"
              variant="outlined"
              value={content}
              focused
              rows={4}
              multiline
            />
        </Grid>
        <Grid xs={3}>
            <Button variant="contained" onClick={decrypt}>
              Decrypt
            </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
