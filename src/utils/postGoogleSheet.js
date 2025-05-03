import { fetchGeoData } from "../utils/analytics"; // Ensure the correct relative path

export const postGoogleSheet = async (data) => {
  try {
    console.log("Sending data to Google Sheets:", data);

    // Fetch geoData
    const geoData = await fetchGeoData();
    const { city, country_name: country } = geoData;

    // Include geoData in the payload
    const payload = { ...data, city, country };

    const response = await fetch("https://lasprendashablan.tejer.red/api/saveToGoogleSheet.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
