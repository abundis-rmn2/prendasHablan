export const postGoogleSheet = async (data) => {
  try {
    console.log("Sending data to Google Sheets:", data);
    const response = await fetch("https://your-serverless-function-url.com/save-to-google-sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data successfully sent to Google Sheets.");
      return { success: true };
    } else {
      console.error("Error sending data to Google Sheets:", response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error("Error during API call to Google Sheets:", error);
    return { success: false, error: error.message };
  }
};
