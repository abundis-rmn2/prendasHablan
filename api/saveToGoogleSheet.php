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

    // Define the fixed structure for the CSV
    $csvColumns = [
        'id', 'timestamp', 'ip', 'city', 'country', 'user_agent',
        'name', 'location', 'relationship', 'other_relationship', 'age',
        'last_seen', 'has_job_offer', 'job_offer_type', 'contact_medium',
        'recognized_clothing', 'clothing_owner', 'recognition_reason',
        'contacted_authorities', 'authority_details', 'willing_to_share',
        'contact_info', 'search_file', 'consent'
    ];

    // Use geoData from input
    $city = $inputData['city'] ?? 'Unknown';
    $country = $inputData['country'] ?? 'Unknown';

    // Remove geoData from input to avoid duplication
    unset($inputData['city'], $inputData['country']);

    // Sanitize input data and ensure all keys are present
    $sanitizedData = [];
    foreach ($csvColumns as $column) {
        if ($column === 'id') {
            $sanitizedData[$column] = $id;
        } elseif ($column === 'timestamp') {
            $sanitizedData[$column] = $timestamp;
        } elseif ($column === 'ip') {
            $sanitizedData[$column] = $ip;
        } elseif ($column === 'city') {
            $sanitizedData[$column] = $city;
        } elseif ($column === 'country') {
            $sanitizedData[$column] = $country;
        } elseif ($column === 'user_agent') {
            $sanitizedData[$column] = $userAgent;
        } else {
            $value = $inputData[$column] ?? '-'; // Use '-' for missing keys
            if (is_array($value)) {
                $value = implode(", ", $value); // Convert arrays to comma-separated strings
            }
            $sanitizedData[$column] = $value === '' || $value === null ? '-' : $value;
        }
    }

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
        fputcsv($file, $csvColumns);
    }

    // Write data to CSV
    fputcsv($file, $sanitizedData);
    fclose($file);

    // Respond with success
    echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
