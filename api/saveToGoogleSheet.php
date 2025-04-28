<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow POST and OPTIONS methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow specific headers

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Get raw POST data
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (!$inputData) {
        throw new Exception("Invalid input data");
    }

    // Add metadata
    $id = uniqid();
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

    // Use geoData from input
    $city = $inputData['city'] ?? 'Unknown';
    $country = $inputData['country'] ?? 'Unknown';

    // Remove geoData from input to avoid duplication
    unset($inputData['city'], $inputData['country']);

    // Prepare data for CSV
    $csvData = array_merge([
        'id' => $id,
        'timestamp' => $timestamp,
        'ip' => $ip,
        'city' => $city,
        'country' => $country,
        'user_agent' => $userAgent
    ], $inputData);

    // Define CSV file path
    $csvFile = __DIR__ . '/data.csv';

    // Check if file exists to add headers
    $fileExists = file_exists($csvFile);

    // Open file for appending
    $file = fopen($csvFile, 'a');
    if (!$file) {
        throw new Exception("Failed to open CSV file");
    }

    // Write headers if file is new
    if (!$fileExists) {
        fputcsv($file, array_keys($csvData));
    }

    // Write data to CSV
    fputcsv($file, $csvData);
    fclose($file);

    // Respond with success
    echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
