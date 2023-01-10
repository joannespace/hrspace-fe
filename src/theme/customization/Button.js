function Button(theme) {
  return {
    MuiButtonText: {
      styleOverrides: {
        root: {
          position: "relative",
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
  };
}

export default Button;
