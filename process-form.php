<?php
// Simple PHP script to handle form submission
header('Content-Type: application/json');

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$formData = json_decode(file_get_contents('php://input'), true);

// If form data is not available in JSON format, try POST data
if (!$formData) {
    $formData = $_POST;
}

// Validate required fields
$requiredFields = ['name', 'email', 'message'];
$errors = [];

foreach ($requiredFields as $field) {
    if (empty($formData[$field])) {
        $errors[$field] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($formData['email']) && !filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// In a real application, you would process the form data here
// For example, send an email, save to database, etc.

// For demonstration purposes, we'll just return a success message
// In production, replace this with actual form processing logic

// Simulate processing delay
sleep(1);

// Return success response
echo json_encode([
    'success' => true,
    'message' => 'Thank you for your message! We will get back to you soon.',
    'data' => [
        'name' => $formData['name'],
        'email' => $formData['email'],
        'company' => $formData['company'] ?? '',
        'service' => $formData['service'] ?? '',
        'message' => $formData['message']
    ]
]);
