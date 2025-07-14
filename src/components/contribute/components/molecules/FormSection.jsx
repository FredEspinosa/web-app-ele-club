// src/components/forms/molecules/FormSection.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function FormSection({ title, children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      padding="24px 16px"
      sx={{
        width: "100%",
        borderRadius: 4,
        bgcolor: "#fff",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
