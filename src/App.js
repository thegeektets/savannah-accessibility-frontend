import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Styled input for file upload
const Input = styled("input")({
  display: "none",
});

// Component to display issues with suggested fixes
function IssueList({ issues }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Accessibility Issues
      </Typography>
      <List>
        {issues.map((issue, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                  label={issue.issue}
                  color="error"
                  size="small"
                  variant="outlined"
                />
                <Typography variant="body1">{issue.fix}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                <strong>Element:</strong> {issue.element}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
}

function App() {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("htmlFile", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        HTML Accessibility Analyzer
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload an HTML file to analyze its accessibility and get suggested fixes.
      </Typography>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">
          <Input
            id="file-upload"
            type="file"
            accept=".html"
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          disabled={!file || uploading}
        >
          Analyze
        </Button>
      </form>
      {uploading && <LinearProgress sx={{ mt: 2 }} />}
      {analysisResult && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Compliance Score:{" "}
              <Box
                component="span"
                sx={{
                  color:
                    analysisResult.score >= 80
                      ? "success.main"
                      : analysisResult.score >= 50
                      ? "warning.main"
                      : "error.main",
                }}
              >
                {analysisResult.score}%
              </Box>
            </Typography>
            <IssueList issues={analysisResult.issues} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;